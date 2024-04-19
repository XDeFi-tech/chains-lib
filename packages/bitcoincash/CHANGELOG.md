# @xdefi-tech/chains-bitcoincash

## 2.0.9

### Patch Changes

- 1adaef3: feat: use @psf/bitcoincashjs-lib instead of @scure/btc-signer

## 2.0.8

### Patch Changes

- 2fc44eb: Feat: Add address generation unit test

## 2.0.7

### Patch Changes

- c62adeb: update utxo signers to use noble and scure instead of bitcoinjs

## 2.0.6

### Patch Changes

- 290355b: Fix: export ledger files from package
- Updated dependencies [290355b]
  - @xdefi-tech/chains-graphql@1.2.10
  - @xdefi-tech/chains-core@2.0.5
  - @xdefi-tech/chains-utxo@2.0.4

## 2.0.5

### Patch Changes

- c5f9d20: Fix: use createMsg for specific chain instead of use basic message for all chains

## 2.0.4

### Patch Changes

- 4fe86fc: feat: pin all package dependencies to strict versions
  feat: update ledger signer initialisation stage, currently required transport. see README for the details
- Updated dependencies [4fe86fc]
  - @xdefi-tech/chains-graphql@1.2.9
  - @xdefi-tech/chains-core@2.0.4
  - @xdefi-tech/chains-utxo@2.0.3

## 2.0.3

### Patch Changes

- c2732db: fix: gql queries for each UTXO chain
- a559cce: fix: transaction type in core lib
- Updated dependencies [a559cce]
  - @xdefi-tech/chains-core@2.0.3
  - @xdefi-tech/chains-utxo@2.0.2
  - @xdefi-tech/chains-graphql@1.2.7

## 2.0.2

### Patch Changes

- 7638e90: fix: return normalized key for signer provider from core package
  fix: update seed phrase signers with broken private keys
- Updated dependencies [7638e90]
  - @xdefi-tech/chains-core@2.0.2
  - @xdefi-tech/chains-utxo@2.0.1
  - @xdefi-tech/chains-graphql@1.2.5

## 2.0.1

### Patch Changes

- e7c77f6: feat: add seed phrase signer to export

## 2.0.0

### Major Changes

- 381bcfc: Bump major vesion to get highest version from develop branch

### Patch Changes

- Updated dependencies [381bcfc]
  - @xdefi-tech/chains-core@2.0.0
  - @xdefi-tech/chains-utxo@2.0.0

## 1.2.2

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch
- Updated dependencies [af2734d]
  - @xdefi-tech/chains-core@1.2.5
  - @xdefi-tech/chains-utxo@1.1.4
  - eslint-config-custom@1.0.2
  - @xdefi-tech/chains-graphql@1.2.4

## 1.2.1

### Patch Changes

- 2e30ddc: feat: update MsgEncoding type in core lib
- Updated dependencies [2e30ddc]
  - @xdefi-tech/chains-core@1.2.4
  - @xdefi-tech/chains-utxo@1.1.3
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
  - @xdefi-tech/chains-utxo@1.1.2

## 1.1.1

### Patch Changes

- bede5ce: Fix: remove react dependency from each package
- Updated dependencies [bede5ce]
  - @xdefi-tech/chains-graphql@1.2.1
  - @xdefi-tech/chains-core@1.2.1
  - @xdefi-tech/chains-utxo@1.1.1

## 1.1.0

### Minor Changes

- 346e09e: Minor bump; Add Tron Ledger Signer; Fix Lint;

### Patch Changes

- Updated dependencies [346e09e]
  - @xdefi-tech/chains-core@1.2.0
  - @xdefi-tech/chains-utxo@1.1.0
  - @xdefi-tech/chains-graphql@1.2.0

## 1.0.12

### Patch Changes

- 04ce322: Update get transaction query with BE updates
- Updated dependencies [04ce322]
  - @xdefi-tech/chains-graphql@1.1.14

## 1.0.11

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15
  - @xdefi-tech/chains-utxo@1.0.8
  - @xdefi-tech/chains-graphql@1.1.12

## 1.0.10

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - @xdefi-tech/chains-utxo@1.0.7
  - eslint-config-custom@1.0.1
  - @xdefi-tech/chains-graphql@1.1.10

## 1.0.9

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13
  - @xdefi-tech/chains-utxo@1.0.6

## 1.0.8

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-utxo@1.0.5
  - @xdefi-tech/chains-core@1.1.12

## 1.0.7

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11
  - @xdefi-tech/chains-utxo@1.0.4

## 1.0.6

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @xdefi-tech/chains-core@1.1.10
  - @xdefi-tech/chains-utxo@1.0.3
  - @xdefi-tech/chains-graphql@1.1.8

## 1.0.5

### Patch Changes

- b04503d: Split msg object from chains-utxo package to each chain individualy to keep a difference between chains
- Updated dependencies [b04503d]
- Updated dependencies [152115f]
  - @xdefi-tech/chains-utxo@1.0.2
  - @xdefi-tech/chains-core@1.1.9

## 1.0.4

### Patch Changes

- fc06dee: Change something

## 1.0.3

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface
- Updated dependencies [b2bfe69]
  - @xdefi-tech/chains-core@1.1.8

## 1.0.2

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @xdefi-tech/chains-graphql@1.1.7
  - @xdefi-tech/chains-core@1.1.7
  - @xdefi-tech/chains-utxo@1.0.1

## 1.0.1

### Patch Changes

- cca1491: Update chains-controller, add providerList to each chain. Fix solana memo message
- Updated dependencies [cca1491]
  - @xdefi-tech/chains-core@1.1.6

## 1.0.0

### Major Changes

- 35b848f: Add UTXO chains, update GQL schemas

### Patch Changes

- Updated dependencies [35b848f]
  - @xdefi-tech/chains-utxo@1.0.0
  - @xdefi-tech/chains-graphql@1.1.6
