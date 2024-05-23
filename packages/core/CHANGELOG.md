# @xdefi-tech/chains-core

## 2.0.12

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

## 2.0.11

### Patch Changes

- 74a48b0: Feat: update legacyNFTs franment in core lib

## 2.0.10

### Patch Changes

- fca5a7f: Feat: update `legacyNFTs` query with collectionV3 fields

## 2.0.9

### Patch Changes

- 7de45e1: Feat: move dataprovider from haskoin & blockchair to indexer for all UTXO chains

## 2.0.8

### Patch Changes

- 5b781e6: Feat: add getAccount method to fallbackDataSource in core lib

## 2.0.7

### Patch Changes

- d97d68f: Fix: getBalance method with empty tokenAddresses

## 2.0.6

### Patch Changes

- 737695e: feat: add get custom tokents, multicall get balance

## 2.0.5

### Patch Changes

- 290355b: Fix: export ledger files from package

## 2.0.4

### Patch Changes

- 4fe86fc: feat: pin all package dependencies to strict versions
  feat: update ledger signer initialisation stage, currently required transport. see README for the details

## 2.0.3

### Patch Changes

- a559cce: fix: transaction type in core lib

## 2.0.2

### Patch Changes

- 7638e90: fix: return normalized key for signer provider from core package
  fix: update seed phrase signers with broken private keys

## 2.0.1

### Patch Changes

- 6728ac5: add tron fee estimation logic

## 2.0.0

### Major Changes

- 381bcfc: Bump major vesion to get highest version from develop branch

## 1.2.5

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch

## 1.2.4

### Patch Changes

- 2e30ddc: feat: update MsgEncoding type in core lib

## 1.2.3

### Patch Changes

- 9adefdc: Update TRON library to get more relevant data about transactions

## 1.2.2

### Patch Changes

- a0e1019: Feat: switch lib to production environment

## 1.2.1

### Patch Changes

- bede5ce: Fix: remove react dependency from each package

## 1.2.0

### Minor Changes

- 346e09e: Minor bump; Add Tron Ledger Signer; Fix Lint;

## 1.1.15

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances

## 1.1.14

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes

## 1.1.13

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64

## 1.1.12

### Patch Changes

- 3b7b00d: Add NFT Support

## 1.1.11

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers

## 1.1.10

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers

## 1.1.9

### Patch Changes

- 152115f: Add fallback datasource support

## 1.1.8

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface

## 1.1.7

### Patch Changes

- 1efef82: Change import from mjs to common js

## 1.1.6

### Patch Changes

- cca1491: Update chains-controller, add providerList to each chain. Fix solana memo message

## 1.1.5

### Patch Changes

- 2431a1d: Add Near chain controller. Fix GQL issues

## 1.1.4

### Patch Changes

- 3a7e0bb: Add Binance Beacon Chain

## 1.1.3

### Patch Changes

- 14c668d: Update fee fields for each chain. Add solana. Add EVM chain controller

## 1.1.2

### Patch Changes

- 20c8f4c: [cosmos] Fix getAccount method for new accounts

## 1.1.1

### Patch Changes

- 7fd4347: Add cosmos chain

## 1.1.0

### Minor Changes

- 3b06078: Add getTransaction method

## 1.0.6

### Patch Changes

- 2210abb: Include files for publishind, exclude src files

## 1.0.5

### Patch Changes

- a9c4dbe: add dist folder to files

## 1.0.4

### Patch Changes

- eb20ae0: Add .npmignore for publish

## 1.0.3

### Patch Changes

- e7459e3: Test changeset with publishing

## 1.0.2

### Patch Changes

- 39a0985: Test changeset with publishing
