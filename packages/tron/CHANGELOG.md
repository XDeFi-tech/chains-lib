# @xdefi-tech/chains-tron

## 2.0.62

### Patch Changes

- c5e8afb3: Feat: add options for broadcast method
- Updated dependencies [c5e8afb3]
  - @xdefi-tech/chains-core@2.0.45

## 2.0.61

### Patch Changes

- 7c930938: Feat: separate getBalance method from chain provider
- Updated dependencies [7c930938]
  - @xdefi-tech/chains-core@2.0.44

## 2.0.60

### Patch Changes

- e9468834: Feat: add id: manifest.chain+address for chain datasource

## 2.0.59

### Patch Changes

- 21ae891b: fix: reading trc20 of undifined issue for chain datasource

## 2.0.58

### Patch Changes

- bc809247: Feat: reduce GQL cache to 1 min for balances queries
- Updated dependencies [bc809247]
  - @xdefi-tech/chains-core@2.0.43

## 2.0.57

### Patch Changes

- c69ffb1b: Feat: add waitFor method to await for transaction
- Updated dependencies [c69ffb1b]
  - @xdefi-tech/chains-core@2.0.42

## 2.0.56

### Patch Changes

- 82f2ecf9: Fix: update CHAINS_CORE_OPTIONS for core lib
- Updated dependencies [82f2ecf9]
  - @xdefi-tech/chains-core@2.0.41

## 2.0.55

### Patch Changes

- 708bde09: feat: update getMaxAmountToSend method with feeRatioPercentage params
- Updated dependencies [708bde09]
  - @xdefi-tech/chains-core@2.0.39

## 2.0.54

### Patch Changes

- e5c40bef: fix: caching policy for the balance query
- Updated dependencies [e5c40bef]
  - @xdefi-tech/chains-core@2.0.38

## 2.0.53

### Patch Changes

- 7384da2e: Feat: update GQL core package
- Updated dependencies [7384da2e]
  - @xdefi-tech/chains-core@2.0.37

## 2.0.52

### Patch Changes

- aa2aba1b: fix: too many bytes to encode

## 2.0.51

### Patch Changes

- 34ac38df: fix: fee estimation for transaction not send trx

## 2.0.50

### Patch Changes

- e4d0a001: test coverage networked requests (not mocked) for read only (get fees, get balances, get transactions, get utxos) for all chains
- Updated dependencies [302840f1]
  - @xdefi-tech/chains-core@2.0.36

## 2.0.49

### Patch Changes

- 212f8b34: feat: Implement TRON signTransaction and fee estimation

## 2.0.48

### Patch Changes

- 9767f9d9: feat: update getMaxAmountToSend method
- Updated dependencies [9767f9d9]
  - @xdefi-tech/chains-core@2.0.35

## 2.0.47

### Patch Changes

- 3b304649: Fix: move estimateEnergy method to utils

## 2.0.46

### Patch Changes

- ffa56309: feat: get energy & bandwidth price from rpc

## 2.0.45

### Patch Changes

- 03572fe8: Fix: getTransaction method status checking

## 2.0.44

### Patch Changes

- dcd1161d: feat: create ctrl data source

## 2.0.43

### Patch Changes

- d742126f: Fix: avoid modifying data.from field inside estimateFee method

## 2.0.42

### Patch Changes

- 511318b0: Fix: freeNetLimit limit

## 2.0.41

### Patch Changes

- 572b07b3: fix: manifest decimals

## 2.0.40

### Patch Changes

- 429b1c40: Feat: reflected data from CryptoAsset type to getBalances responses
- Updated dependencies [429b1c40]
  - @xdefi-tech/chains-core@2.0.34

## 2.0.39

### Patch Changes

- e9e9b5b3: Fix: getTransaction status

## 2.0.38

### Patch Changes

- 33c98eb3: Fix: update msg.getFee method to return correct fee
- 33c98eb3: Feat: update core package bignumber deps
- Updated dependencies [33c98eb3]
  - @xdefi-tech/chains-core@2.0.33

## 2.0.37

### Patch Changes

- 359f5176: Update FallbackDataSource getProvider method
- Updated dependencies [359f5176]
  - @xdefi-tech/chains-core@2.0.32

## 2.0.36

### Patch Changes

- e41a3dfb: Fix: add hash to transaction from broadcast method

## 2.0.35

### Patch Changes

- 59e58ce9: Feat: add dataSourceList to provider

## 2.0.34

### Patch Changes

- 1b543aef: Fix: add getAccountResource to base datasource to use it in FallbackDataSource
- Updated dependencies [1b543aef]
  - @xdefi-tech/chains-core@2.0.30

## 2.0.33

### Patch Changes

- 44d3e999: feat: add xdefi-trace-id to debug gql issues
- Updated dependencies [44d3e999]
  - @xdefi-tech/chains-core@2.0.29

## 2.0.32

### Patch Changes

- 75fc2fee: fix: remove 'm/' prefix from derivation in LedgerSigner for Tron and Thor

## 2.0.31

### Patch Changes

- d53373c4: chore: update fee estimation on tron
- Updated dependencies [d53373c4]
  - @xdefi-tech/chains-core@2.0.28

## 2.0.30

### Patch Changes

- ac6e391d: add priceChange (dayPriceChange) to getData function (getBalance response)
- Updated dependencies [ac6e391d]
  - @xdefi-tech/chains-core@2.0.27

## 2.0.29

### Patch Changes

- 9972c424: Add sign method options and the multiSign method

## 2.0.28

### Patch Changes

- 4316454e: feat: add no-cache for crypto asset and fetching balance queries
- Updated dependencies [4316454e]
  - @xdefi-tech/chains-core@2.0.26

## 2.0.27

### Patch Changes

- 85b3eb03: Feat: update build config
- Updated dependencies [85b3eb03]
  - @xdefi-tech/chains-core@2.0.25

## 2.0.26

### Patch Changes

- 38794f73: Feat: change dataProviderURL

## 2.0.25

### Patch Changes

- 5b9f95cb: Feat: add generic files to .eslintignore
- Updated dependencies [5b9f95cb]
  - @xdefi-tech/chains-core@2.0.23

## 2.0.24

### Patch Changes

- 9a9fe602: Revert tsup config
- Updated dependencies [9a9fe602]
  - @xdefi-tech/chains-core@2.0.22

## 2.0.23

### Patch Changes

- 0dbc7648: feat: Implement estimateFee for Tron provider
- Updated dependencies [0dbc7648]
  - @xdefi-tech/chains-core@2.0.21

## 2.0.22

### Patch Changes

- f593f316: Feat: update builder and test cases environment
- Updated dependencies [f593f316]
  - @xdefi-tech/chains-core@2.0.20

## 2.0.21

### Patch Changes

- e0dcc77d: Tron Signers - signMessage, signMessageV2, sign, signTransaction for all wallets types

## 2.0.20

### Patch Changes

- 0a125235: Split Chains Lib GQL package for each chains
- Updated dependencies [0a125235]
  - @xdefi-tech/chains-core@2.0.19

## 2.0.19

### Patch Changes

- 3d8f054: Feat: move verifyAddress to provider, make it static
- Updated dependencies [3d8f054]
  - @xdefi-tech/chains-graphql@1.2.15
  - @xdefi-tech/chains-core@2.0.16

## 2.0.18

### Patch Changes

- 89956d2: Fix TypeScript type errors with abstract provider class
- Updated dependencies [89956d2]
  - @xdefi-tech/chains-core@2.0.14
  - @xdefi-tech/chains-graphql@1.2.14

## 2.0.17

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

## 2.0.16

### Patch Changes

- 74a48b0: Feat: update legacyNFTs franment in core lib
- Updated dependencies [74a48b0]
  - @xdefi-tech/chains-core@2.0.11

## 2.0.15

### Patch Changes

- fdbbdd7: Feat: add price.dayPriceChange field for getting balances
- Updated dependencies [fdbbdd7]
  - @xdefi-tech/chains-graphql@1.2.12

## 2.0.14

### Patch Changes

- 62105c4: Feat: update README.md

## 2.0.13

### Patch Changes

- 5b781e6: Feat: add getAccount method to fallbackDataSource in core lib
- Updated dependencies [5b781e6]
  - @xdefi-tech/chains-core@2.0.8

## 2.0.12

### Patch Changes

- 2fc44eb: Feat: Add address generation unit test

## 2.0.11

### Patch Changes

- 290355b: Fix: export ledger files from package
- Updated dependencies [290355b]
  - @xdefi-tech/chains-graphql@1.2.10
  - @xdefi-tech/chains-core@2.0.5

## 2.0.10

### Patch Changes

- 4fe86fc: feat: pin all package dependencies to strict versions
  feat: update ledger signer initialisation stage, currently required transport. see README for the details
- Updated dependencies [4fe86fc]
  - @xdefi-tech/chains-graphql@1.2.9
  - @xdefi-tech/chains-core@2.0.4

## 2.0.9

### Patch Changes

- 1bd83d3: fix: Set cache policy to 'network-only' for getBalance GQL query

## 2.0.8

### Patch Changes

- e08adeb: fix tron trc20 fee estimation

## 2.0.7

### Patch Changes

- 59ba44a: feat: allow estimating tron fees without signing a tx

## 2.0.6

### Patch Changes

- 5ea32e5: fix: simplify tron indexer data source transaction response
- Updated dependencies [5ea32e5]
  - @xdefi-tech/chains-graphql@1.2.8

## 2.0.5

### Patch Changes

- a559cce: fix: transaction type in core lib
- Updated dependencies [a559cce]
  - @xdefi-tech/chains-core@2.0.3
  - @xdefi-tech/chains-graphql@1.2.7

## 2.0.4

### Patch Changes

- e9a3d69: tsconfig: added references
  @xdefi-tech/chains-graphql: added gql queries for tron
  @xdefi-tech/chains-tron: added IndexerDataSource
- Updated dependencies [e9a3d69]
  - @xdefi-tech/chains-graphql@1.2.6

## 2.0.3

### Patch Changes

- 7638e90: fix: return normalized key for signer provider from core package
  fix: update seed phrase signers with broken private keys
- Updated dependencies [7638e90]
  - @xdefi-tech/chains-core@2.0.2

## 2.0.2

### Patch Changes

- e7c77f6: feat: add seed phrase signer to export

## 2.0.1

### Patch Changes

- 6728ac5: add tron fee estimation logic
- Updated dependencies [6728ac5]
  - @xdefi-tech/chains-core@2.0.1

## 2.0.0

### Major Changes

- 381bcfc: Bump major vesion to get highest version from develop branch

### Patch Changes

- Updated dependencies [381bcfc]
  - @xdefi-tech/chains-core@2.0.0

## 1.3.3

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch
- Updated dependencies [af2734d]
  - @xdefi-tech/chains-core@1.2.5
  - eslint-config-custom@1.0.2

## 1.3.2

### Patch Changes

- 2e30ddc: feat: update MsgEncoding type in core lib
- Updated dependencies [2e30ddc]
  - @xdefi-tech/chains-core@1.2.4

## 1.3.1

### Patch Changes

- 9adefdc: Update TRON library to get more relevant data about transactions
- Updated dependencies [9adefdc]
  - @xdefi-tech/chains-core@1.2.3

## 1.3.0

### Minor Changes

- 5498e3e: refactor: Streamlined the way signers are exported across various cryptocurrency packages for both web and React Native environments;
  feat: Enhanced accessibility to individual signers for Bitcoin, Bitcoin Cash, Cosmos, Dogecoin, EVM-compatible chains, Litecoin, Solana, Thorchain, and Tron;

## 1.2.3

### Patch Changes

- a0e1019: Feat: switch lib to production environment
- Updated dependencies [a0e1019]
  - @xdefi-tech/chains-core@1.2.2

## 1.2.2

### Patch Changes

- bede5ce: Fix: remove react dependency from each package
- Updated dependencies [bede5ce]
  - @xdefi-tech/chains-core@1.2.1

## 1.2.1

### Patch Changes

- 93a7327: export ledger signer

## 1.2.0

### Minor Changes

- 346e09e: Minor bump; Add Tron Ledger Signer; Fix Lint;

### Patch Changes

- Updated dependencies [346e09e]
  - @xdefi-tech/chains-core@1.2.0

## 1.1.9

### Patch Changes

- 4b0977a: Update TRC20 Balances and Fix Broken Import

## 1.1.8

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15

## 1.1.7

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - eslint-config-custom@1.0.1

## 1.1.6

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13

## 1.1.5

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-core@1.1.12

## 1.1.4

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11

## 1.1.3

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface
- Updated dependencies [b2bfe69]
  - @xdefi-tech/chains-core@1.1.8

## 1.1.2

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @xdefi-tech/chains-core@1.1.7

## 1.1.1

### Patch Changes

- 14c668d: Update fee fields for each chain. Add solana. Add EVM chain controller
- Updated dependencies [14c668d]
  - @xdefi-tech/chains-core@1.1.3

## 1.1.0

### Minor Changes

- 3b06078: Add getTransaction method

### Patch Changes

- Updated dependencies [3b06078]
  - @xdefi-tech/chains-core@1.1.0

## 1.0.4

### Patch Changes

- 2210abb: Include files for publishind, exclude src files
- Updated dependencies [2210abb]
  - @xdefi-tech/chains-core@1.0.6

## 1.0.3

### Patch Changes

- e7459e3: Test changeset with publishing
- Updated dependencies [e7459e3]
  - @xdefi-tech/chains-core@1.0.3

## 1.0.2

### Patch Changes

- 39a0985: Test changeset with publishing
- Updated dependencies [39a0985]
  - @xdefi-tech/chains-core@1.0.2

## 1.0.1

### Patch Changes

- a9cd85c: Test changeset with publishing
- Updated dependencies [a9cd85c]
  - @xdefi-tech/chains-core@1.0.1
