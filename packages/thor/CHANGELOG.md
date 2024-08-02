# @xdefi-tech/chains-thor

## 2.0.29

### Patch Changes

- 4316454e: feat: add no-cache for crypto asset and fetching balance queries
- Updated dependencies [4316454e]
  - @xdefi-tech/chains-core@2.0.26

## 2.0.28

### Patch Changes

- ab8cd4fa: chore: update denom default for deposit msg

## 2.0.27

### Patch Changes

- 30a0bf9e: Feat: add getThorChainID function to get chain ID dynamically

## 2.0.26

### Patch Changes

- 5b9f95cb: Feat: add generic files to .eslintignore
- Updated dependencies [5b9f95cb]
  - @xdefi-tech/chains-core@2.0.23

## 2.0.25

### Patch Changes

- 6ed254de: Fix: getBalance decimals for indexer datasource

## 2.0.24

### Patch Changes

- 9a9fe602: Revert tsup config
- Updated dependencies [9a9fe602]
  - @xdefi-tech/chains-core@2.0.22

## 2.0.23

### Patch Changes

- f593f316: Feat: update builder and test cases environment
- Updated dependencies [f593f316]
  - @xdefi-tech/chains-core@2.0.20

## 2.0.22

### Patch Changes

- 34e22132: use nodeURL instead of rpcURL && reduce size import osmojs

## 2.0.21

### Patch Changes

- 5e307619: Feat: use nodeURL instead of rpcURL

## 2.0.20

### Patch Changes

- 0a125235: Split Chains Lib GQL package for each chains
- Updated dependencies [0a125235]
  - @xdefi-tech/chains-core@2.0.19

## 2.0.19

### Patch Changes

- 1f0b3cec: chore: added msgDeposit to thor

## 2.0.18

### Patch Changes

- 3d8f054: Feat: move verifyAddress to provider, make it static
- Updated dependencies [3d8f054]
  - @xdefi-tech/chains-graphql@1.2.15
  - @xdefi-tech/chains-core@2.0.16

## 2.0.17

### Patch Changes

- 89956d2: Fix TypeScript type errors with abstract provider class
- Updated dependencies [89956d2]
  - @xdefi-tech/chains-core@2.0.14
  - @xdefi-tech/chains-graphql@1.2.14

## 2.0.16

### Patch Changes

- 32eb057: fix: update endpoint for estimateFee on Thorchain
- Updated dependencies [6661742]
- Updated dependencies [8c60d66]
  - @xdefi-tech/chains-graphql@1.2.13
  - @xdefi-tech/chains-core@2.0.13

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
  - @xdefi-tech/chains-core@2.0.12

## 2.0.14

### Patch Changes

- 87bcf06: Feat: add private key signer

## 2.0.13

### Patch Changes

- 74a48b0: Feat: update legacyNFTs franment in core lib
- Updated dependencies [74a48b0]
  - @xdefi-tech/chains-core@2.0.11

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
  - @xdefi-tech/chains-core@2.0.8

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

- 2e30ddc: feat: update MsgEncoding type in core lib
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

## 1.0.11

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15
  - @xdefi-tech/chains-graphql@1.1.12

## 1.0.10

### Patch Changes

- a0e3beb: Add TRC20 support
- Updated dependencies [a0e3beb]
  - @xdefi-tech/chains-graphql@1.1.11

## 1.0.9

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - @xdefi-tech/chains-graphql@1.1.10

## 1.0.8

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13

## 1.0.7

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-core@1.1.12

## 1.0.6

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11

## 1.0.5

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @xdefi-tech/chains-core@1.1.10
  - @xdefi-tech/chains-graphql@1.1.8

## 1.0.4

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface
- Updated dependencies [b2bfe69]
  - @xdefi-tech/chains-core@1.1.8

## 1.0.3

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @xdefi-tech/chains-graphql@1.1.7
  - @xdefi-tech/chains-core@1.1.7

## 1.0.2

### Patch Changes

- cca1491: Update chains-controller, add providerList to each chain. Fix solana memo message
- Updated dependencies [cca1491]
  - @xdefi-tech/chains-core@1.1.6

## 1.0.1

### Patch Changes

- eb87031: Fix lint issues
- Updated dependencies [35b848f]
  - @xdefi-tech/chains-graphql@1.1.6

## 1.0.0

### Major Changes

- 1d226cd: Add thor chain
