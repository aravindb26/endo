# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

### [1.0.1](https://github.com/endojs/endo/compare/@endo/exo@1.0.0...@endo/exo@1.0.1) (2023-12-20)

**Note:** Version bump only for package @endo/exo





## [1.0.0](https://github.com/endojs/endo/compare/@endo/exo@0.2.6...@endo/exo@1.0.0) (2023-12-12)


### ⚠ BREAKING CHANGES

* **exo:** reject extra args by default
* **exo:** extra undeclared args dropped

### Features

* **defaultGuards:** absorb `sloppy` and `raw` ([58a3d42](https://github.com/endojs/endo/commit/58a3d42a92102336d814690430e0feb3773227d4))
* **defendSyncMethod:** implement raw exo methods ([c8126dc](https://github.com/endojs/endo/commit/c8126dc9d863fbb69cc53d57514368ba931df7fe))
* **exo:** opt out individual arguments ([bf593d8](https://github.com/endojs/endo/commit/bf593d8e83ba7eb231b4d3a909c41751ab24fe66))
* **pass-style:** Far GET_METHOD_NAMES meta method ([b079812](https://github.com/endojs/endo/commit/b07981215a64766b2813f92f6d6c430d181b5512))


### Bug Fixes

* Adjust type generation in release process and CI ([9465be3](https://github.com/endojs/endo/commit/9465be369e53167815ca444f6293a8e9eb48501d))
* **exo:** allow richer behaviorMethods ([fde26da](https://github.com/endojs/endo/commit/fde26da22f03a18045807d833c8e03c4409fd877))
* **exo:** extra undeclared args dropped ([3a7e13c](https://github.com/endojs/endo/commit/3a7e13ce28f37e16c623df9804134d73326c3032))
* **exo:** reject extra args by default ([4d100ef](https://github.com/endojs/endo/commit/4d100ef2527b74ea776b79533e996c87e983537c))
* **exo:** Relax requirement on implementation of __getInterfaceGuard__ method ([64e1099](https://github.com/endojs/endo/commit/64e109997c4d1d67c2643c6d5f8c890cdb31df7e))
* **exo:** tighten typing ([c50ee18](https://github.com/endojs/endo/commit/c50ee18b543c8da921cd095cdc65b56df1761b9f))
* **exo:** update `M.callWhen` broken by `M.raw()` ([015696d](https://github.com/endojs/endo/commit/015696dc744599334f678d0c4882727cbeef8b04))
* Import types explicitly throughout ([631d087](https://github.com/endojs/endo/commit/631d087e291262ce3e798f7a15482c534cb7233b))
* **patterns:** remove `defaultGuards: 'never'` for `undefined` ([77d04b2](https://github.com/endojs/endo/commit/77d04b2902ddf539f10688dfb84fe2aa9e841f16))
* review suggestions ([9de852b](https://github.com/endojs/endo/commit/9de852bb78d659ba274e7cacbfda96107844506f))



### [0.2.6](https://github.com/endojs/endo/compare/@endo/exo@0.2.5...@endo/exo@0.2.6) (2023-09-12)


### Features

* **exo:** revocables ([c9bcb8c](https://github.com/endojs/endo/commit/c9bcb8c754bcb8e364cf39fe530eecbf82b9767f))


### Bug Fixes

* **exo:** Extend InterfaceGuard to support symbol-keyed methods ([d6ea36b](https://github.com/endojs/endo/commit/d6ea36b120f6118a59f32c7c63c339d354bbd4e7)), closes [#1728](https://github.com/endojs/endo/issues/1728)
* **patterns,exo:** abstract guard getters ([dcf1071](https://github.com/endojs/endo/commit/dcf1071d7c8cc531c21cf1778fc54fdbdc6d6d18))
* **patterns:** type guards ([c2cd034](https://github.com/endojs/endo/commit/c2cd0343bf42b212d4a144f570f493286ec280ba))



### [0.2.5](https://github.com/endojs/endo/compare/@endo/exo@0.2.3...@endo/exo@0.2.5) (2023-08-07)

**Note:** Version bump only for package @endo/exo





### [0.2.4](https://github.com/endojs/endo/compare/@endo/exo@0.2.3...@endo/exo@0.2.4) (2023-08-07)

**Note:** Version bump only for package @endo/exo





### [0.2.3](https://github.com/endojs/endo/compare/@endo/exo@0.2.2...@endo/exo@0.2.3) (2023-07-19)


### Features

* **env-options:** env-options as separate importable package ([ba266c9](https://github.com/endojs/endo/commit/ba266c95d46a7330aeb73def7a1a0a18242d75cd))
* **exo:** getInterfaceGuard default meta method ([3fd960f](https://github.com/endojs/endo/commit/3fd960f2563ba0cebc8adef2797af6986776d354))
* **types:** parameterize InterfaceGuard ([645a7a8](https://github.com/endojs/endo/commit/645a7a80a45303e6412405b9c4feeb1406592c0c))


### Bug Fixes

* **exo:** do NOT mutate behaviorMethods argument ([43f89ef](https://github.com/endojs/endo/commit/43f89ef0dc5674591907315356b468724aabc33f))



### [0.2.2](https://github.com/endojs/endo/compare/@endo/exo@0.2.1...@endo/exo@0.2.2) (2023-04-20)

### Bug Fixes

- **exo:** correct types ([07345f0](https://github.com/endojs/endo/commit/07345f0d3c88a75a9b3438cdaaa3c438bea2ab2b))
- **exo:** parse `$DEBUG` as comma-separated ([902f766](https://github.com/endojs/endo/commit/902f7662a5d4f344b3c5280d731fc2f14a616f21))

### [0.2.1](https://github.com/endojs/endo/compare/@endo/exo@0.2.0...@endo/exo@0.2.1) (2023-04-14)

### Features

- **pass-style,exo:** label remotable instances ([56edc68](https://github.com/endojs/endo/commit/56edc68444ac3e0d94d43028bc7d53fe804bb332))

### Bug Fixes

- **exo:** fix exo-tools TSC problem ([#1512](https://github.com/endojs/endo/issues/1512)) ([e413d9c](https://github.com/endojs/endo/commit/e413d9cd97fbeefc1497b3b67daad278869ccdfc))
- sync with exo API change ([df861c1](https://github.com/endojs/endo/commit/df861c1ffbfef3a2d54c23c5011d06f2e93f7a32))
- sync with shadows in agoric-sdk ([19e2833](https://github.com/endojs/endo/commit/19e28339e359791fd2a9f78d2c3801598e3894ca))

## 0.2.0 (2023-03-07)

### ⚠ BREAKING CHANGES

- rename 'fit' to 'mustMatch' (#1464)

### Features

- **exo:** start migrating exo from @agoric/store ([#1459](https://github.com/endojs/endo/issues/1459)) ([a882b7c](https://github.com/endojs/endo/commit/a882b7ca88863d7f85310074c38f3cc0032e1e0e))

### Bug Fixes

- Fix hackerone.com links in SECURITY.md ([#1472](https://github.com/endojs/endo/issues/1472)) ([389733d](https://github.com/endojs/endo/commit/389733dbc7a74992f909c38d27ea7e8e68623959))
- missed documentation suggestion ([#1463](https://github.com/endojs/endo/issues/1463)) ([3f266bf](https://github.com/endojs/endo/commit/3f266bffdf122c73dedada6f311de770210b426a))

### Miscellaneous Chores

- rename 'fit' to 'mustMatch' ([#1464](https://github.com/endojs/endo/issues/1464)) ([a4f88f8](https://github.com/endojs/endo/commit/a4f88f8ef1e7d62b993900244e260d90113f9759))

## 0.2.0 (2023-03-07)

### ⚠ BREAKING CHANGES

- rename 'fit' to 'mustMatch' (#1464)

### Features

- **exo:** start migrating exo from @agoric/store ([#1459](https://github.com/endojs/endo/issues/1459)) ([a882b7c](https://github.com/endojs/endo/commit/a882b7ca88863d7f85310074c38f3cc0032e1e0e))

### Bug Fixes

- Fix hackerone.com links in SECURITY.md ([#1472](https://github.com/endojs/endo/issues/1472)) ([389733d](https://github.com/endojs/endo/commit/389733dbc7a74992f909c38d27ea7e8e68623959))
- missed documentation suggestion ([#1463](https://github.com/endojs/endo/issues/1463)) ([3f266bf](https://github.com/endojs/endo/commit/3f266bffdf122c73dedada6f311de770210b426a))

### Miscellaneous Chores

- rename 'fit' to 'mustMatch' ([#1464](https://github.com/endojs/endo/issues/1464)) ([a4f88f8](https://github.com/endojs/endo/commit/a4f88f8ef1e7d62b993900244e260d90113f9759))
