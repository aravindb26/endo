// @ts-check
import { makePromiseKit } from '@endo/promise-kit';
import { makeReadPowers } from '@endo/compartment-mapper/node-powers.js';

import bundleSource from './src/index.js';
import { makeFileReader, makeAtomicFileWriter } from './src/fs.js';

const { Fail, quote: q } = assert;

/**
 * @typedef {(...args: unknown[]) => void} Logger A message logger.
 */

/**
 * @typedef {object} BundleMeta
 * @property {string} bundleFileName
 * @property {string} bundleTime ISO format
 * @property {number} bundleSize
 * @property {{ relative: string, absolute: string }} moduleSource
 * @property {Array<{ relativePath: string, mtime: string, size: number }>} contents
 */

export const jsOpts = {
  encodeBundle: bundle => `export default ${JSON.stringify(bundle)};\n`,
  toBundleName: n => `bundle-${n}.js`,
  toBundleMeta: n => `bundle-${n}-js-meta.json`,
};

/** @typedef {typeof jsOpts} CacheOpts */

export const jsonOpts = {
  encodeBundle: bundle => `${JSON.stringify(bundle)}\n`,
  toBundleName: n => `bundle-${n}.json`,
  toBundleMeta: n => `bundle-${n}-json-meta.json`,
};

export const makeBundleCache = (wr, cwd, readPowers, opts) => {
  const {
    cacheOpts: { encodeBundle, toBundleName, toBundleMeta } = jsOpts,
    log: defaultLog = console.warn,
    ...bundleOptions
  } = opts || {};

  const add = async (rootPath, targetName, log = defaultLog) => {
    const srcRd = cwd.neighbor(rootPath);

    const statsByPath = new Map();

    const loggedRead = async loc => {
      await null;
      if (!loc.match(/\bpackage.json$/)) {
        try {
          const itemRd = cwd.neighbor(new URL(loc).pathname);
          const ref = srcRd.relative(itemRd.absolute());
          /** @type {import('fs').Stats} */
          const stats = await itemRd.stat();
          statsByPath.set(ref, stats);
          // console.log({ loc, mtime, ref });
        } catch (oops) {
          log(oops);
        }
      }
      return readPowers.read(loc);
    };

    await wr.mkdir({ recursive: true });

    const bundleFileName = toBundleName(targetName);
    const bundleWr = wr.neighbor(bundleFileName);
    const metaWr = wr.neighbor(toBundleMeta(targetName));

    const bundle = await bundleSource(rootPath, bundleOptions, {
      ...readPowers,
      read: loggedRead,
    });

    const { moduleFormat } = bundle;
    assert.equal(moduleFormat, 'endoZipBase64');

    const code = encodeBundle(bundle);
    await wr.mkdir({ recursive: true });
    const { mtime: bundleTime, size: bundleSize } =
      await bundleWr.atomicWriteText(code);

    /** @type {BundleMeta} */
    const meta = {
      bundleFileName,
      bundleTime: bundleTime.toISOString(),
      bundleSize,
      moduleSource: {
        relative: bundleWr.readOnly().relative(srcRd.absolute()),
        absolute: srcRd.absolute(),
      },
      contents: [...statsByPath.entries()].map(
        ([relativePath, { mtime, size }]) => ({
          relativePath,
          mtime: mtime.toISOString(),
          size,
        }),
      ),
    };

    await metaWr.atomicWriteText(JSON.stringify(meta, null, 2));
    return meta;
  };

  /**
   * @param {string} targetName
   * @param {Logger} _log
   * @returns {Promise<string | undefined>}
   */
  const loadMetaText = (targetName, _log = defaultLog) =>
    wr
      .readOnly()
      .neighbor(toBundleMeta(targetName))
      .maybeReadText()
      .catch(
        ioError =>
          Fail`${targetName}: cannot read bundle metadata: ${q(ioError)}`,
      );

  /**
   * @param {string} targetName
   * @param {any} rootOpt
   * @param {Logger} [log]
   * @param {BundleMeta} [meta]
   * @returns {Promise<BundleMeta>}
   */
  const validate = async (
    targetName,
    rootOpt,
    log = defaultLog,
    meta = undefined,
  ) => {
    await null;
    if (!meta) {
      const metaJson = await loadMetaText(targetName, log);
      if (metaJson) {
        try {
          meta = JSON.parse(metaJson);
        } catch (error) {
          if (error instanceof SyntaxError) {
            throw SyntaxError(`Cannot parse JSON from ${targetName}, ${error}`);
          }
          throw error;
        }
      }
    }
    if (!meta) {
      throw Fail`no metadata found for ${q(targetName)}`;
    }
    const {
      bundleFileName,
      bundleTime,
      bundleSize,
      contents,
      moduleSource: { absolute: moduleSource },
    } = meta;
    assert.equal(bundleFileName, toBundleName(targetName));
    if (rootOpt) {
      moduleSource === cwd.neighbor(rootOpt).absolute() ||
        Fail`bundle ${targetName} was for ${moduleSource}, not ${rootOpt}`;
    }
    /** @type {import('fs').Stats} */
    const { mtime: actualBundleTime, size: actualBundleSize } = await wr
      .readOnly()
      .neighbor(bundleFileName)
      .stat();
    assert.equal(actualBundleTime.toISOString(), bundleTime);
    assert.equal(actualBundleSize, bundleSize);
    const moduleRd = wr.readOnly().neighbor(moduleSource);
    const actualStats = await Promise.all(
      contents.map(
        async ({ relativePath, mtime: priorMtime, size: priorSize }) => {
          const itemRd = moduleRd.neighbor(relativePath);
          /** @type {import('fs').Stats} */
          const { mtime, size } = await itemRd.stat();
          return {
            relativePath,
            mtime: mtime.toISOString(),
            size,
            priorMtime,
            priorSize,
          };
        },
      ),
    );
    const changed = actualStats.filter(
      ({ mtime, size, priorMtime, priorSize }) =>
        mtime !== priorMtime || size !== priorSize,
    );
    changed.length === 0 ||
      Fail`changed: ${q(changed)}. ${q(targetName)} bundled at ${q(
        bundleTime,
      )}`;
    return meta;
  };

  /**
   * @param {string} rootPath
   * @param {string} targetName
   * @param {Logger} [log]
   * @returns {Promise<BundleMeta>}
   */
  const validateOrAdd = async (rootPath, targetName, log = defaultLog) => {
    const metaText = await loadMetaText(targetName, log);

    /** @type {BundleMeta | undefined} */
    let meta = metaText ? JSON.parse(metaText) : undefined;

    if (meta !== undefined) {
      try {
        meta = await validate(targetName, rootPath, log, meta);
        const { bundleTime, bundleSize, contents } = meta;
        log(
          `${wr}`,
          toBundleName(targetName),
          'valid:',
          contents.length,
          'files bundled at',
          bundleTime,
          'with size',
          bundleSize,
        );
      } catch (invalid) {
        meta = undefined;
        log(invalid);
      }
    }

    if (meta === undefined) {
      log(`${wr}`, 'add:', targetName, 'from', rootPath);
      meta = await add(rootPath, targetName, log);
      const { bundleFileName, bundleTime, contents } = meta;
      log(
        `${wr}`,
        'bundled',
        contents.length,
        'files in',
        bundleFileName,
        'at',
        bundleTime,
      );
    }

    return meta;
  };

  const loaded = new Map();
  /**
   * @param {string} rootPath
   * @param {string} [targetName]
   * @param {Logger} [log]
   */
  const load = async (
    rootPath,
    targetName = readPowers.basename(rootPath, '.js'),
    log = defaultLog,
  ) => {
    const found = loaded.get(targetName);
    // console.log('load', { targetName, found: !!found, rootPath });
    if (found && found.rootPath === rootPath) {
      return found.bundle;
    }
    const todo = makePromiseKit();
    loaded.set(targetName, { rootPath, bundle: todo.promise });
    const bundle = await validateOrAdd(rootPath, targetName, log)
      .then(({ bundleFileName }) =>
        import(`${wr.readOnly().neighbor(bundleFileName)}`),
      )
      .then(m => harden(m.default));
    assert.equal(bundle.moduleFormat, 'endoZipBase64');
    todo.resolve(bundle);
    return bundle;
  };

  return harden({
    add,
    validate,
    validateOrAdd,
    load,
  });
};

/**
 * @param {string} dest
 * @param {{ format?: string, cacheOpts?: CacheOpts, cacheSourceMaps: boolean, dev?: boolean, log?: Logger }} options
 * @param {(id: string) => Promise<any>} loadModule
 * @param {number} [pid]
 * @param {number} [nonce]
 */
export const makeNodeBundleCache = async (
  dest,
  options,
  loadModule,
  pid,
  nonce,
) => {
  const [fs, path, url, crypto, timers] = await Promise.all([
    await loadModule('fs'),
    await loadModule('path'),
    await loadModule('url'),
    await loadModule('crypto'),
    await loadModule('timers'),
  ]);

  if (nonce === undefined) {
    nonce = crypto.randomInt(0xffff_ffff);
  }

  const readPowers = {
    ...makeReadPowers({ fs, url, crypto }),
    delay: ms => new Promise(resolve => timers.setTimeout(resolve, ms)),
    basename: path.basename,
  };

  const cwd = makeFileReader('', { fs, path });
  await fs.promises.mkdir(dest, { recursive: true });
  const destWr = makeAtomicFileWriter(dest, { fs, path }, pid, nonce);
  return makeBundleCache(destWr, cwd, readPowers, options);
};
