# @ctrl-tech/chains-thor

## 2.0.17

### Patch Changes

- 89956d2: Fix TypeScript type errors with abstract provider class
- Updated dependencies [89956d2]
  - @ctrl-tech/chains-core@2.0.14
  - @ctrl-tech/chains-graphql@1.2.14

## 2.0.16

### Patch Changes

- 32eb057: fix: update endpoint for estimateFee on Thorchain
- Updated dependencies [6661742]
- Updated dependencies [8c60d66]
  - @ctrl-tech/chains-graphql@1.2.13
  - @ctrl-tech/chains-core@2.0.13

## 2.0.15

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
  - @ctrl-tech/chains-core@2.0.12

## 2.0.14

### Patch Changes

- 87bcf06: Feat: add private key signer

## 2.0.13

### Patch Changes

- 74a48b0: Feat: update legacyNFTs franment in core lib
- Updated dependencies [74a48b0]
  - @ctrl-tech/chains-core@2.0.11

## 2.0.12

### Patch Changes

- f41bfb4: - feat: Implement methods for maya on thor chain

## 2.0.11

### Patch Changes

- 62105c4: Feat: update README.md

## 2.0.10

### Patch Changes

- 8acbcea: Fix: message amount integer value

## 2.0.9

### Patch Changes

- 5b781e6: Feat: add getAccount method to fallbackDataSource in core lib
- Updated dependencies [5b781e6]
  - @ctrl-tech/chains-core@2.0.8

## 2.0.8

### Patch Changes

- 3f8a1dd: Feat: update default rpcUrl for thorchain

## 2.0.7

### Patch Changes

- 2fc44eb: Feat: Add address generation unit test

## 2.0.6

### Patch Changes

- ce13b63: fix: seed-phrase signer and manifest for mayachain

## 2.0.5

### Patch Changes

- 3f0581e: fix: add cosmjs dependency

## 2.0.4

### Patch Changes

- 290355b: Fix: export ledger files from package
- Updated dependencies [290355b]
  - @ctrl-tech/chains-graphql@1.2.10
  - @ctrl-tech/chains-core@2.0.5

## 2.0.3

### Patch Changes

- 4fe86fc: feat: pin all package dependencies to strict versions
  feat: update ledger signer initialisation stage, currently required transport. see README for the details
- Updated dependencies [4fe86fc]
  - @ctrl-tech/chains-graphql@1.2.9
  - @ctrl-tech/chains-core@2.0.4

## 2.0.2

### Patch Changes

- a559cce: fix: transaction type in core lib
- Updated dependencies [a559cce]
  - @ctrl-tech/chains-core@2.0.3
  - @ctrl-tech/chains-graphql@1.2.7

## 2.0.1

### Patch Changes

- 7638e90: fix: return normalized key for signer provider from core package
  fix: update seed phrase signers with broken private keys
- Updated dependencies [7638e90]
  - @ctrl-tech/chains-core@2.0.2
  - @ctrl-tech/chains-graphql@1.2.5

## 2.0.0

### Major Changes

- 381bcfc: Bump major vesion to get highest version from develop branch

### Patch Changes

- Updated dependencies [381bcfc]
  - @ctrl-tech/chains-core@2.0.0

## 1.2.2

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch
- Updated dependencies [af2734d]
  - @ctrl-tech/chains-core@1.2.5
  - @ctrl-tech/chains-graphql@1.2.4

## 1.2.1

### Patch Changes

- 2e30ddc: feat: update MsgEncoding type in core lib
- Updated dependencies [2e30ddc]
  - @ctrl-tech/chains-core@1.2.4
  - @ctrl-tech/chains-graphql@1.2.3

## 1.2.0

### Minor Changes

- 5498e3e: refactor: Streamlined the way signers are exported across various cryptocurrency packages for both web and React Native environments;
  feat: Enhanced accessibility to individual signers for Bitcoin, Bitcoin Cash, Cosmos, Dogecoin, EVM-compatible chains, Litecoin, Solana, Thorchain, and Tron;

## 1.1.2

### Patch Changes

- a0e1019: Feat: switch lib to production environment
- Updated dependencies [a0e1019]
  - @ctrl-tech/chains-graphql@1.2.2
  - @ctrl-tech/chains-core@1.2.2

## 1.1.1

### Patch Changes

- bede5ce: Fix: remove react dependency from each package
- Updated dependencies [bede5ce]
  - @ctrl-tech/chains-graphql@1.2.1
  - @ctrl-tech/chains-core@1.2.1

## 1.1.0

### Minor Changes

- 346e09e: Minor bump; Add Tron Ledger Signer; Fix Lint;

### Patch Changes

- Updated dependencies [346e09e]
  - @ctrl-tech/chains-core@1.2.0
  - @ctrl-tech/chains-graphql@1.2.0

## 1.0.11

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @ctrl-tech/chains-core@1.1.15
  - @ctrl-tech/chains-graphql@1.1.12

## 1.0.10

### Patch Changes

- a0e3beb: Add TRC20 support
- Updated dependencies [a0e3beb]
  - @ctrl-tech/chains-graphql@1.1.11

## 1.0.9

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @ctrl-tech/chains-core@1.1.14
  - @ctrl-tech/chains-graphql@1.1.10

## 1.0.8

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @ctrl-tech/chains-core@1.1.13

## 1.0.7

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
  - @ctrl-tech/chains-core@1.1.12

## 1.0.6

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @ctrl-tech/chains-core@1.1.11

## 1.0.5

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @ctrl-tech/chains-core@1.1.10
  - @ctrl-tech/chains-graphql@1.1.8

## 1.0.4

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface
- Updated dependencies [b2bfe69]
  - @ctrl-tech/chains-core@1.1.8

## 1.0.3

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @ctrl-tech/chains-graphql@1.1.7
  - @ctrl-tech/chains-core@1.1.7

## 1.0.2

### Patch Changes

- cca1491: Update chains-controller, add providerList to each chain. Fix solana memo message
- Updated dependencies [cca1491]
  - @ctrl-tech/chains-core@1.1.6

## 1.0.1

### Patch Changes

- eb87031: Fix lint issues
- Updated dependencies [35b848f]
  - @ctrl-tech/chains-graphql@1.1.6

## 1.0.0

### Major Changes

- 1d226cd: Add thor chain
