# @xdefi-tech/chains-dogecoin

## 2.1.25

### Patch Changes

- c5e8afb3: Feat: add options for broadcast method
- Updated dependencies [c5e8afb3]
  - @xdefi-tech/chains-core@2.0.45
  - @xdefi-tech/chains-utxo@2.0.28

## 2.1.24

### Patch Changes

- 7c930938: Feat: separate getBalance method from chain provider
- Updated dependencies [7c930938]
  - @xdefi-tech/chains-core@2.0.44
  - @xdefi-tech/chains-utxo@2.0.27

## 2.1.23

### Patch Changes

- 02cfa870: feat: add feebounds check for utxo chains
- Updated dependencies [02cfa870]
  - @xdefi-tech/chains-utxo@2.0.26

## 2.1.22

### Patch Changes

- 395acd1e: feat: enable to compile hex memo

## 2.1.21

### Patch Changes

- bc809247: Feat: reduce GQL cache to 1 min for balances queries
- Updated dependencies [bc809247]
  - @xdefi-tech/chains-core@2.0.43
  - @xdefi-tech/chains-utxo@2.0.25

## 2.1.20

### Patch Changes

- c69ffb1b: Feat: add waitFor method to await for transaction
- Updated dependencies [c69ffb1b]
  - @xdefi-tech/chains-core@2.0.42

## 2.1.19

### Patch Changes

- 02d650c5: fix: txs failed while sending with memo using Trezor

## 2.1.18

### Patch Changes

- 82f2ecf9: Fix: update CHAINS_CORE_OPTIONS for core lib
- Updated dependencies [82f2ecf9]
  - @xdefi-tech/chains-core@2.0.41
  - @xdefi-tech/chains-utxo@2.0.24

## 2.1.17

### Patch Changes

- 79c2d8a8: feat: add chains-lib core options support
- Updated dependencies [79c2d8a8]
  - @xdefi-tech/chains-core@2.0.40

## 2.1.16

### Patch Changes

- 708bde09: feat: update getMaxAmountToSend method with feeRatioPercentage params
- Updated dependencies [708bde09]
  - @xdefi-tech/chains-core@2.0.39
  - @xdefi-tech/chains-utxo@2.0.23

## 2.1.15

### Patch Changes

- e5c40bef: fix: caching policy for the balance query
- Updated dependencies [e5c40bef]
  - @xdefi-tech/chains-core@2.0.38
  - @xdefi-tech/chains-utxo@2.0.22

## 2.1.14

### Patch Changes

- 7384da2e: Feat: update GQL core package
- Updated dependencies [7384da2e]
  - @xdefi-tech/chains-core@2.0.37
  - @xdefi-tech/chains-utxo@2.0.21

## 2.1.13

### Patch Changes

- 7df6d0ef: update versions @ledgerhq/hw-app-btc lib

## 2.1.12

### Patch Changes

- e4d0a001: test coverage networked requests (not mocked) for read only (get fees, get balances, get transactions, get utxos) for all chains
- 302840f1: feat: update trezor lib & create Solana trezor signer
- Updated dependencies [302840f1]
  - @xdefi-tech/chains-core@2.0.36

## 2.1.11

### Patch Changes

- 9767f9d9: feat: update getMaxAmountToSend method
- Updated dependencies [9767f9d9]
  - @xdefi-tech/chains-core@2.0.35
  - @xdefi-tech/chains-utxo@2.0.20

## 2.1.10

### Patch Changes

- dcd1161d: feat: create ctrl data source

## 2.1.9

### Patch Changes

- 429b1c40: Feat: reflected data from CryptoAsset type to getBalances responses
- Updated dependencies [429b1c40]
  - @xdefi-tech/chains-core@2.0.34

## 2.1.8

### Patch Changes

- 33c98eb3: Feat: update core package bignumber deps
- Updated dependencies [33c98eb3]
  - @xdefi-tech/chains-core@2.0.33
  - @xdefi-tech/chains-utxo@2.0.19

## 2.1.7

### Patch Changes

- 359f5176: Update FallbackDataSource getProvider method
- Updated dependencies [359f5176]
  - @xdefi-tech/chains-core@2.0.32
  - @xdefi-tech/chains-utxo@2.0.18

## 2.1.6

### Patch Changes

- 9fb78931: fix: ledger signing for utxo chains & update logic to round up fee rate

## 2.1.5

### Patch Changes

- 4d6446e2: Fix external dependencies included in bundles
- Updated dependencies [4d6446e2]
  - eslint-config-custom@1.0.3
  - @xdefi-tech/chains-core@2.0.31
  - @xdefi-tech/chains-utxo@2.0.17

## 2.1.4

### Patch Changes

- 72238c5a: Fix: add memo to utxo chains using @scure/btc-signer
- Updated dependencies [72238c5a]
  - @xdefi-tech/chains-utxo@2.0.16

## 2.1.3

### Patch Changes

- 1b543aef: Fix: add getAccountResource to base datasource to use it in FallbackDataSource
- Updated dependencies [1b543aef]
  - @xdefi-tech/chains-core@2.0.30
  - @xdefi-tech/chains-utxo@2.0.15

## 2.1.2

### Patch Changes

- 44d3e999: feat: add xdefi-trace-id to debug gql issues
- Updated dependencies [44d3e999]
  - @xdefi-tech/chains-core@2.0.29
  - @xdefi-tech/chains-utxo@2.0.14

## 2.1.1

### Patch Changes

- 6d09e6b7: feat: fix typescript error with utxo chains
- Updated dependencies [6d09e6b7]
  - @xdefi-tech/chains-utxo@2.0.13

## 2.1.0

### Minor Changes

- 9121608c: Switched to scure bip32/bip39

## 2.0.26

### Patch Changes

- ac6e391d: add priceChange (dayPriceChange) to getData function (getBalance response)
- Updated dependencies [ac6e391d]
  - @xdefi-tech/chains-core@2.0.27

## 2.0.25

### Patch Changes

- 4316454e: feat: add no-cache for crypto asset and fetching balance queries
- Updated dependencies [4316454e]
  - @xdefi-tech/chains-core@2.0.26

## 2.0.24

### Patch Changes

- 85b3eb03: Feat: update build config
- Updated dependencies [85b3eb03]
  - @xdefi-tech/chains-core@2.0.25
  - @xdefi-tech/chains-utxo@2.0.12

## 2.0.23

### Patch Changes

- 5b9f95cb: Feat: add generic files to .eslintignore
- Updated dependencies [5b9f95cb]
  - @xdefi-tech/chains-core@2.0.23

## 2.0.22

### Patch Changes

- 9a9fe602: Revert tsup config
- Updated dependencies [9a9fe602]
  - @xdefi-tech/chains-core@2.0.22

## 2.0.21

### Patch Changes

- f593f316: Feat: update builder and test cases environment
- Updated dependencies [f593f316]
  - @xdefi-tech/chains-core@2.0.20
  - @xdefi-tech/chains-utxo@2.0.11

## 2.0.20

### Patch Changes

- d76c12c3: fix: fee being 0 when creating a transaction

## 2.0.19

### Patch Changes

- fc541c1a: Fix: calculate fee rate to use for bitcoin dusting algorithm
- Updated dependencies [fc541c1a]
  - @xdefi-tech/chains-utxo@2.0.10

## 2.0.18

### Patch Changes

- 0a125235: Split Chains Lib GQL package for each chains
- Updated dependencies [0a125235]
  - @xdefi-tech/chains-core@2.0.19

## 2.0.17

### Patch Changes

- 3d8f054: Feat: move verifyAddress to provider, make it static
- Updated dependencies [3d8f054]
  - @xdefi-tech/chains-graphql@1.2.15
  - @xdefi-tech/chains-core@2.0.16

## 2.0.16

### Patch Changes

- 89956d2: Fix TypeScript type errors with abstract provider class
- Updated dependencies [89956d2]
  - @xdefi-tech/chains-core@2.0.14
  - @xdefi-tech/chains-utxo@2.0.9
  - @xdefi-tech/chains-graphql@1.2.14

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
  - @xdefi-tech/chains-utxo@2.0.8

## 2.0.14

### Patch Changes

- 74a48b0: Feat: update legacyNFTs franment in core lib
- Updated dependencies [74a48b0]
  - @xdefi-tech/chains-core@2.0.11

## 2.0.13

### Patch Changes

- fdbbdd7: Feat: add price.dayPriceChange field for getting balances
- Updated dependencies [fdbbdd7]
  - @xdefi-tech/chains-graphql@1.2.12

## 2.0.12

### Patch Changes

- 7de45e1: Feat: move dataprovider from haskoin & blockchair to indexer for all UTXO chains
- Updated dependencies [7de45e1]
  - @xdefi-tech/chains-graphql@1.2.11
  - @xdefi-tech/chains-core@2.0.9
  - @xdefi-tech/chains-utxo@2.0.7

## 2.0.11

### Patch Changes

- 62105c4: Feat: update README.md
- a04a730: Feat: add Uint8Array support for memo field
- Updated dependencies [a04a730]
  - @xdefi-tech/chains-utxo@2.0.6

## 2.0.10

### Patch Changes

- 5b781e6: Feat: add getAccount method to fallbackDataSource in core lib
- Updated dependencies [5b781e6]
  - @xdefi-tech/chains-core@2.0.8
  - @xdefi-tech/chains-utxo@2.0.5

## 2.0.9

### Patch Changes

- 2fc44eb: Feat: Add address generation unit test

## 2.0.8

### Patch Changes

- 4776364: update dogecoin mocks to not use network

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

## 1.0.11

### Patch Changes

- 04ce322: Update get transaction query with BE updates
- Updated dependencies [04ce322]
  - @xdefi-tech/chains-graphql@1.1.14

## 1.0.10

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15
  - @xdefi-tech/chains-utxo@1.0.8
  - @xdefi-tech/chains-graphql@1.1.12

## 1.0.9

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - @xdefi-tech/chains-utxo@1.0.7
  - eslint-config-custom@1.0.1
  - @xdefi-tech/chains-graphql@1.1.10

## 1.0.8

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13
  - @xdefi-tech/chains-utxo@1.0.6

## 1.0.7

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-utxo@1.0.5
  - @xdefi-tech/chains-core@1.1.12

## 1.0.6

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11
  - @xdefi-tech/chains-utxo@1.0.4

## 1.0.5

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @xdefi-tech/chains-core@1.1.10
  - @xdefi-tech/chains-utxo@1.0.3
  - @xdefi-tech/chains-graphql@1.1.8

## 1.0.4

### Patch Changes

- b04503d: Split msg object from chains-utxo package to each chain individualy to keep a difference between chains
- Updated dependencies [b04503d]
- Updated dependencies [152115f]
  - @xdefi-tech/chains-utxo@1.0.2
  - @xdefi-tech/chains-core@1.1.9

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
