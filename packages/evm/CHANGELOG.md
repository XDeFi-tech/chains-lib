# @xdefi-tech/chains-evm

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

## 1.3.2

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch
- Updated dependencies [af2734d]
  - @xdefi-tech/chains-core@1.2.5
  - @xdefi-tech/chains-graphql@1.2.4

## 1.3.1

### Patch Changes

- 2e30ddc: feat: update MsgEncoding type in core lib
- Updated dependencies [2e30ddc]
  - @xdefi-tech/chains-core@1.2.4
  - @xdefi-tech/chains-graphql@1.2.3

## 1.3.0

### Minor Changes

- 5498e3e: refactor: Streamlined the way signers are exported across various cryptocurrency packages for both web and React Native environments;
  feat: Enhanced accessibility to individual signers for Bitcoin, Bitcoin Cash, Cosmos, Dogecoin, EVM-compatible chains, Litecoin, Solana, Thorchain, and Tron;

## 1.2.2

### Patch Changes

- a0e1019: Feat: switch lib to production environment
- Updated dependencies [a0e1019]
  - @xdefi-tech/chains-graphql@1.2.2
  - @xdefi-tech/chains-core@1.2.2

## 1.2.1

### Patch Changes

- bede5ce: Fix: remove react dependency from each package
- Updated dependencies [bede5ce]
  - @xdefi-tech/chains-graphql@1.2.1
  - @xdefi-tech/chains-core@1.2.1

## 1.2.0

### Minor Changes

- 346e09e: Minor bump; Add Tron Ledger Signer; Fix Lint;

### Patch Changes

- Updated dependencies [346e09e]
  - @xdefi-tech/chains-core@1.2.0
  - @xdefi-tech/chains-graphql@1.2.0

## 1.1.19

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15
  - @xdefi-tech/chains-graphql@1.1.12

## 1.1.18

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - @xdefi-tech/chains-graphql@1.1.10

## 1.1.17

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13

## 1.1.16

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-core@1.1.12

## 1.1.15

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers. Added canto EVM chain and optimism chain support
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11

## 1.1.14

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @xdefi-tech/chains-core@1.1.10
  - @xdefi-tech/chains-graphql@1.1.8

## 1.1.13

### Patch Changes

- 152115f: Update smartchain manifest
- Updated dependencies [152115f]
  - @xdefi-tech/chains-core@1.1.9

## 1.1.12

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface
- Updated dependencies [b2bfe69]
  - @xdefi-tech/chains-core@1.1.8

## 1.1.11

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @xdefi-tech/chains-graphql@1.1.7
  - @xdefi-tech/chains-core@1.1.7

## 1.1.10

### Patch Changes

- cca1491: Update chains-controller, add providerList to each chain. Fix solana memo message
- Updated dependencies [cca1491]
  - @xdefi-tech/chains-core@1.1.6

## 1.1.9

### Patch Changes

- 1e359d3: Disable manifest check for indexer data source

## 1.1.8

### Patch Changes

- bffd7df: Rename binancesmartchain to smartchain

## 1.1.7

### Patch Changes

- 9856e25: Fix queries for indexer datasource (balance, txs, fees, status). Update estimating gasLimit for common transfers and sending ERC20 tokens. Update manifests

## 1.1.6

### Patch Changes

- 7c5633c: Fix use wei insted of grew for gasPrice for EVM chains

## 1.1.5

### Patch Changes

- e4ba874: Add estimateFee for ERC721 & ERC1155 contracts

## 1.1.4

### Patch Changes

- 982319e: Fix gasLimit estimation for ERC

## 1.1.3

### Patch Changes

- 2bb0b36: Minor fixes

## 1.1.2

### Patch Changes

- 14c668d: Update fee fields for each chain. Add solana. Add EVM chain controller
- Updated dependencies [14c668d]
  - @xdefi-tech/chains-core@1.1.3
  - @xdefi-tech/chains-graphql@1.1.3

## 1.1.1

### Patch Changes

- 7fd4347: Add cosmos chain
- Updated dependencies [7fd4347]
  - @xdefi-tech/chains-graphql@1.1.1
  - @xdefi-tech/chains-core@1.1.1

## 1.1.0

### Minor Changes

- 3b06078: Add getTransaction method

### Patch Changes

- Updated dependencies [3b06078]
  - @xdefi-tech/chains-graphql@1.1.0
  - @xdefi-tech/chains-core@1.1.0

## 1.0.6

### Patch Changes

- c9af6fd: Fix decimals to string for evm chains controller

## 1.0.5

### Patch Changes

- 2210abb: Include files for publishind, exclude src files
- Updated dependencies [2210abb]
  - @xdefi-tech/chains-graphql@1.0.4
  - @xdefi-tech/chains-core@1.0.6

## 1.0.4

### Patch Changes

- e7459e3: Test changeset with publishing
- Updated dependencies [e7459e3]
  - @xdefi-tech/chains-graphql@1.0.3
  - @xdefi-tech/chains-core@1.0.3

## 1.0.3

### Patch Changes

- 39a0985: Test changeset with publishing
- Updated dependencies [39a0985]
  - @xdefi-tech/chains-graphql@1.0.2
  - @xdefi-tech/chains-core@1.0.2
