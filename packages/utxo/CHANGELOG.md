# @xdefi-tech/chains-utxo

## 2.0.22

### Patch Changes

- e5c40bef: fix: caching policy for the balance query
- Updated dependencies [e5c40bef]
  - @xdefi-tech/chains-core@2.0.38

## 2.0.21

### Patch Changes

- 7384da2e: Feat: update GQL core package
- Updated dependencies [7384da2e]
  - @xdefi-tech/chains-core@2.0.37

## 2.0.20

### Patch Changes

- 9767f9d9: feat: update getMaxAmountToSend method
- Updated dependencies [9767f9d9]
  - @xdefi-tech/chains-core@2.0.35

## 2.0.19

### Patch Changes

- 33c98eb3: Feat: update core package bignumber deps
- Updated dependencies [33c98eb3]
  - @xdefi-tech/chains-core@2.0.33

## 2.0.18

### Patch Changes

- 359f5176: Update FallbackDataSource getProvider method
- Updated dependencies [359f5176]
  - @xdefi-tech/chains-core@2.0.32

## 2.0.17

### Patch Changes

- 4d6446e2: Fix external dependencies included in bundles
- Updated dependencies [4d6446e2]
  - eslint-config-custom@1.0.3
  - @xdefi-tech/chains-core@2.0.31

## 2.0.16

### Patch Changes

- 72238c5a: Fix: add memo to utxo chains using @scure/btc-signer

## 2.0.15

### Patch Changes

- 1b543aef: Fix: add getAccountResource to base datasource to use it in FallbackDataSource
- Updated dependencies [1b543aef]
  - @xdefi-tech/chains-core@2.0.30

## 2.0.14

### Patch Changes

- 44d3e999: feat: add xdefi-trace-id to debug gql issues
- Updated dependencies [44d3e999]
  - @xdefi-tech/chains-core@2.0.29

## 2.0.13

### Patch Changes

- 6d09e6b7: feat: fix typescript error with utxo chains

## 2.0.12

### Patch Changes

- 85b3eb03: Feat: update build config
- Updated dependencies [85b3eb03]
  - @xdefi-tech/chains-core@2.0.25

## 2.0.11

### Patch Changes

- f593f316: Feat: update builder and test cases environment
- Updated dependencies [f593f316]
  - @xdefi-tech/chains-core@2.0.20

## 2.0.10

### Patch Changes

- fc541c1a: Fix: calculate fee rate to use for bitcoin dusting algorithm

## 2.0.9

### Patch Changes

- 89956d2: Fix TypeScript type errors with abstract provider class
- Updated dependencies [89956d2]
  - @xdefi-tech/chains-core@2.0.14

## 2.0.8

### Patch Changes

- db8e556: feat: add getMaxAmountToSend method

  - [x] binance
  - [x] bitcoin
  - [x] bitcoincash
  - [x] cosmos
  - [x] dogecoin
  - [x] evm
  - [x] litecoin
  - [x] solana
  - [x] thor
  - [x] utxo
  - [x] tron

- Updated dependencies [db8e556]
  - @xdefi-tech/chains-core@2.0.12

## 2.0.7

### Patch Changes

- 7de45e1: Feat: move dataprovider from haskoin & blockchair to indexer for all UTXO chains
- Updated dependencies [7de45e1]
  - @xdefi-tech/chains-core@2.0.9

## 2.0.6

### Patch Changes

- a04a730: Feat: add Uint8Array support for memo field

## 2.0.5

### Patch Changes

- 5b781e6: Feat: add getAccount method to fallbackDataSource in core lib
- Updated dependencies [5b781e6]
  - @xdefi-tech/chains-core@2.0.8

## 2.0.4

### Patch Changes

- 290355b: Fix: export ledger files from package
- Updated dependencies [290355b]
  - @xdefi-tech/chains-core@2.0.5

## 2.0.3

### Patch Changes

- 4fe86fc: feat: pin all package dependencies to strict versions
  feat: update ledger signer initialisation stage, currently required transport. see README for the details
- Updated dependencies [4fe86fc]
  - @xdefi-tech/chains-core@2.0.4

## 2.0.2

### Patch Changes

- a559cce: fix: transaction type in core lib
- Updated dependencies [a559cce]
  - @xdefi-tech/chains-core@2.0.3

## 2.0.1

### Patch Changes

- 7638e90: fix: return normalized key for signer provider from core package
  fix: update seed phrase signers with broken private keys
- Updated dependencies [7638e90]
  - @xdefi-tech/chains-core@2.0.2

## 2.0.0

### Major Changes

- 381bcfc: Bump major vesion to get highest version from develop branch

### Patch Changes

- Updated dependencies [381bcfc]
  - @xdefi-tech/chains-core@2.0.0

## 1.1.4

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch
- Updated dependencies [af2734d]
  - @xdefi-tech/chains-core@1.2.5
  - eslint-config-custom@1.0.2

## 1.1.3

### Patch Changes

- 2e30ddc: feat: update MsgEncoding type in core lib
- Updated dependencies [2e30ddc]
  - @xdefi-tech/chains-core@1.2.4

## 1.1.2

### Patch Changes

- a0e1019: Feat: switch lib to production environment
- Updated dependencies [a0e1019]
  - @xdefi-tech/chains-core@1.2.2

## 1.1.1

### Patch Changes

- bede5ce: Fix: remove react dependency from each package
- Updated dependencies [bede5ce]
  - @xdefi-tech/chains-core@1.2.1

## 1.1.0

### Minor Changes

- 346e09e: Minor bump; Add Tron Ledger Signer; Fix Lint;

### Patch Changes

- Updated dependencies [346e09e]
  - @xdefi-tech/chains-core@1.2.0

## 1.0.8

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15

## 1.0.7

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - eslint-config-custom@1.0.1

## 1.0.6

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13

## 1.0.5

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-core@1.1.12

## 1.0.4

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11

## 1.0.3

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @xdefi-tech/chains-core@1.1.10

## 1.0.2

### Patch Changes

- b04503d: Split msg object from chains-utxo package to each chain individualy to keep a difference between chains
- Updated dependencies [152115f]
  - @xdefi-tech/chains-core@1.1.9

## 1.0.1

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @xdefi-tech/chains-core@1.1.7

## 1.0.0

### Major Changes

- 35b848f: Add UTXO chains, update GQL schemas
