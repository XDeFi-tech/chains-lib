# @xdefi-tech/chains-cosmos

## 2.0.15

### Patch Changes

- 74a48b0: Feat: update legacyNFTs franment in core lib
- Updated dependencies [74a48b0]
  - @xdefi-tech/chains-core@2.0.11

## 2.0.14

### Patch Changes

- fdbbdd7: Feat: add price.dayPriceChange field for getting balances
- Updated dependencies [fdbbdd7]
  - @xdefi-tech/chains-graphql@1.2.12

## 2.0.13

### Patch Changes

- 3abb2c1: Feat: add osmojs lib and types/converters in esm

## 2.0.12

### Patch Changes

- 90b77f2: fix(XDEFI-7720): bech32 axelar typo

## 2.0.11

### Patch Changes

- faa6dba: - feat: Implement ADR 036 - Arbitrary Signature for Cosmos Chain

## 2.0.10

### Patch Changes

- 3b42f94: Feat: temporary remove osmojs lib

## 2.0.9

### Patch Changes

- 62105c4: Feat: update README.md

## 2.0.8

### Patch Changes

- 5b781e6: Feat: add getAccount method to fallbackDataSource in core lib
- Updated dependencies [5b781e6]
  - @xdefi-tech/chains-core@2.0.8

## 2.0.7

### Patch Changes

- 2fc44eb: Feat: Add address generation unit test

## 2.0.6

### Patch Changes

- 9f067eb: dont cache balances when fetching

## 2.0.5

### Patch Changes

- 5a46337: Fix: update terra-money version

## 2.0.4

### Patch Changes

- 290355b: Fix: export ledger files from package
- Updated dependencies [290355b]
  - @xdefi-tech/chains-graphql@1.2.10
  - @xdefi-tech/chains-core@2.0.5

## 2.0.3

### Patch Changes

- 4fe86fc: feat: pin all package dependencies to strict versions
  feat: update ledger signer initialisation stage, currently required transport. see README for the details
- Updated dependencies [4fe86fc]
  - @xdefi-tech/chains-graphql@1.2.9
  - @xdefi-tech/chains-core@2.0.4

## 2.0.2

### Patch Changes

- a559cce: fix: transaction type in core lib
- Updated dependencies [a559cce]
  - @xdefi-tech/chains-core@2.0.3
  - @xdefi-tech/chains-graphql@1.2.7

## 2.0.1

### Patch Changes

- 7638e90: fix: return normalized key for signer provider from core package
  fix: update seed phrase signers with broken private keys
- Updated dependencies [7638e90]
  - @xdefi-tech/chains-core@2.0.2
  - @xdefi-tech/chains-graphql@1.2.5

## 2.0.0

### Major Changes

- 381bcfc: Bump major vesion to get highest version from develop branch

### Patch Changes

- Updated dependencies [381bcfc]
  - @xdefi-tech/chains-core@2.0.0

## 1.2.2

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch
- Updated dependencies [af2734d]
  - @xdefi-tech/chains-core@1.2.5
  - @xdefi-tech/chains-graphql@1.2.4

## 1.2.1

### Patch Changes

- 2e30ddc: feat: add swaps support and private key signer
- Updated dependencies [2e30ddc]
  - @xdefi-tech/chains-core@1.2.4
  - @xdefi-tech/chains-graphql@1.2.3

## 1.2.0

### Minor Changes

- 5498e3e: refactor: Streamlined the way signers are exported across various cryptocurrency packages for both web and React Native environments;
  feat: Enhanced accessibility to individual signers for Bitcoin, Bitcoin Cash, Cosmos, Dogecoin, EVM-compatible chains, Litecoin, Solana, Thorchain, and Tron;

## 1.1.2

### Patch Changes

- a0e1019: Feat: switch lib to production environment
- Updated dependencies [a0e1019]
  - @xdefi-tech/chains-graphql@1.2.2
  - @xdefi-tech/chains-core@1.2.2

## 1.1.1

### Patch Changes

- bede5ce: Fix: remove react dependency from each package
- Updated dependencies [bede5ce]
  - @xdefi-tech/chains-graphql@1.2.1
  - @xdefi-tech/chains-core@1.2.1

## 1.1.0

### Minor Changes

- 346e09e: Minor bump; Add Tron Ledger Signer; Fix Lint;

### Patch Changes

- Updated dependencies [346e09e]
  - @xdefi-tech/chains-core@1.2.0
  - @xdefi-tech/chains-graphql@1.2.0

## 1.0.21

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15
  - @xdefi-tech/chains-graphql@1.1.12

## 1.0.20

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - @xdefi-tech/chains-graphql@1.1.10

## 1.0.19

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13

## 1.0.18

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-core@1.1.12

## 1.0.17

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11

## 1.0.16

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @xdefi-tech/chains-core@1.1.10
  - @xdefi-tech/chains-graphql@1.1.8

## 1.0.15

### Patch Changes

- 534cef3: Increase gas limit multiplier

## 1.0.14

### Patch Changes

- 980c696: Fix chain provider deps list

## 1.0.13

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface
- Updated dependencies [b2bfe69]
  - @xdefi-tech/chains-core@1.1.8

## 1.0.12

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @xdefi-tech/chains-graphql@1.1.7
  - @xdefi-tech/chains-core@1.1.7

## 1.0.11

### Patch Changes

- cca1491: Update chains-controller, add providerList to each chain. Fix solana memo message
- Updated dependencies [cca1491]
  - @xdefi-tech/chains-core@1.1.6

## 1.0.10

### Patch Changes

- e59dcb5: Add prefix to cosmos chain provider

## 1.0.9

### Patch Changes

- 2bb0b36: Minor fixes

## 1.0.8

### Patch Changes

- 14c668d: Update fee fields for each chain. Add solana. Add EVM chain controller
- Updated dependencies [14c668d]
  - @xdefi-tech/chains-core@1.1.3
  - @xdefi-tech/chains-graphql@1.1.3

## 1.0.7

### Patch Changes

- 20c8f4c: [cosmos] Fix getAccount method for new accounts
- Updated dependencies [20c8f4c]
  - @xdefi-tech/chains-core@1.1.2

## 1.0.6

### Patch Changes

- a359d2e: Add getAccount to cosmos chain provider

## 1.0.5

### Patch Changes

- dae051d: Add fee to msg.buildTx() for cosmos chain

## 1.0.4

### Patch Changes

- f254a0a: Add getFee method to cosmos chain message

## 1.0.3

### Patch Changes

- 0662495: Add getFees for cosmos chain indexer datasource
- Updated dependencies [0662495]
  - @xdefi-tech/chains-graphql@1.1.2

## 1.0.2

### Patch Changes

- 80ea3e0: Exclude cosmos from cheching packages for tsup

## 1.0.1

### Patch Changes

- 7fd4347: Add cosmos chain
- Updated dependencies [7fd4347]
  - @xdefi-tech/chains-graphql@1.1.1
  - @xdefi-tech/chains-core@1.1.1
