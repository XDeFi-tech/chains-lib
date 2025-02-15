# @xdefi-tech/chains-cosmos

## 2.0.81

### Patch Changes

- c5e8afb3: Feat: add options for broadcast method
- b72d71f6: chore: update terra lcd endpoint
- Updated dependencies [c5e8afb3]
  - @xdefi-tech/chains-core@2.0.45

## 2.0.80

### Patch Changes

- 7c930938: Feat: separate getBalance method from chain provider
- Updated dependencies [7c930938]
  - @xdefi-tech/chains-core@2.0.44

## 2.0.79

### Patch Changes

- 27c63836: feat: add smart account msg types

## 2.0.78

### Patch Changes

- 2adf3b12: fix: estimate fee error

## 2.0.77

### Patch Changes

- bc809247: Feat: reduce GQL cache to 1 min for balances queries
- Updated dependencies [bc809247]
  - @xdefi-tech/chains-core@2.0.43

## 2.0.76

### Patch Changes

- c69ffb1b: Feat: add waitFor method to await for transaction
- Updated dependencies [c69ffb1b]
  - @xdefi-tech/chains-core@2.0.42

## 2.0.75

### Patch Changes

- 82f2ecf9: Fix: update CHAINS_CORE_OPTIONS for core lib
- Updated dependencies [82f2ecf9]
  - @xdefi-tech/chains-core@2.0.41

## 2.0.74

### Patch Changes

- 79c2d8a8: feat: add chains-lib core options support
- Updated dependencies [79c2d8a8]
  - @xdefi-tech/chains-core@2.0.40

## 2.0.73

### Patch Changes

- 708bde09: feat: update getMaxAmountToSend method with feeRatioPercentage params
- Updated dependencies [708bde09]
  - @xdefi-tech/chains-core@2.0.39

## 2.0.72

### Patch Changes

- e5c40bef: fix: caching policy for the balance query
- Updated dependencies [e5c40bef]
  - @xdefi-tech/chains-core@2.0.38

## 2.0.71

### Patch Changes

- 9e7bb6bc: fix: build and change key from name to chain for finding custom cosmos asset

## 2.0.70

### Patch Changes

- 4fc116d0: fix: try to find chain in AddressChains of getBalance

## 2.0.69

### Patch Changes

- c872bbe2: bitcoin lint and cosmos ledger

## 2.0.68

### Patch Changes

- eee3cb43: fix: ledger sign send tx

## 2.0.67

### Patch Changes

- 7384da2e: Feat: update GQL core package
- Updated dependencies [7384da2e]
  - @xdefi-tech/chains-core@2.0.37

## 2.0.66

### Patch Changes

- 7699c4ed: fix: signAnimo dapp tx

## 2.0.65

### Patch Changes

- 773696bc: Fix: kava manifest chain name

## 2.0.64

### Patch Changes

- 26eb77a9: export CtrlDataSource

## 2.0.63

### Patch Changes

- 3e2eb16a: chore: remove custom terra code

## 2.0.62

### Patch Changes

- e4d0a001: test coverage networked requests (not mocked) for read only (get fees, get balances, get transactions, get utxos) for all chains
- Updated dependencies [302840f1]
  - @xdefi-tech/chains-core@2.0.36

## 2.0.61

### Patch Changes

- 817c1867: chore: fix type error

## 2.0.60

### Patch Changes

- 9767f9d9: feat: update getMaxAmountToSend method
- Updated dependencies [9767f9d9]
  - @xdefi-tech/chains-core@2.0.35

## 2.0.59

### Patch Changes

- dcd1161d: feat: create ctrl data source

## 2.0.58

### Patch Changes

- 429b1c40: Feat: reflected data from CryptoAsset type to getBalances responses
- Updated dependencies [429b1c40]
  - @xdefi-tech/chains-core@2.0.34

## 2.0.57

### Patch Changes

- 68f23fbc: feat: add fallback asset fetcher for custom chain

## 2.0.56

### Patch Changes

- 33c98eb3: Feat: update core package bignumber deps
- Updated dependencies [33c98eb3]
  - @xdefi-tech/chains-core@2.0.33

## 2.0.55

### Patch Changes

- 359f5176: Update FallbackDataSource getProvider method
- Updated dependencies [359f5176]
  - @xdefi-tech/chains-core@2.0.32

## 2.0.54

### Patch Changes

- b9d24365: fix: return chain msg instead of msg body

## 2.0.53

### Patch Changes

- cf8df3c8: fix: rounding amount before get transfer route

## 2.0.52

### Patch Changes

- 4d6446e2: Fix external dependencies included in bundles
- Updated dependencies [4d6446e2]
  - @xdefi-tech/chains-core@2.0.31

## 2.0.51

### Patch Changes

- b80c98c0: feat: return balance of native token on custom cosmos chains

## 2.0.50

### Patch Changes

- a09cc88b: fix mars gasFeeStep

## 2.0.49

### Patch Changes

- f72964cd: Fix: return null for getFee method

## 2.0.48

### Patch Changes

- 1b543aef: Fix: add getAccountResource to base datasource to use it in FallbackDataSource
- Updated dependencies [1b543aef]
  - @xdefi-tech/chains-core@2.0.30

## 2.0.47

### Patch Changes

- be72f6c7: added MsgExecuteContract and sanitiseMsg

## 2.0.46

### Patch Changes

- 44d3e999: feat: add xdefi-trace-id to debug gql issues
- Updated dependencies [44d3e999]
  - @xdefi-tech/chains-core@2.0.29

## 2.0.45

### Patch Changes

- 34d81da7: fix: asset.decimals field for indexer data-source

## 2.0.44

### Patch Changes

- 0657f2d0: feat: update cosmos sign + estimateFee to automatically adapt inputs to ibc when possible

## 2.0.43

### Patch Changes

- 0d0096cc: feat: update cosmos sign + estimateFee to automatically adapt inputs to ibc when possible

## 2.0.42

### Patch Changes

- ee444743: feat: add logic to calculate gasPrice when not provided

## 2.0.41

### Patch Changes

- 5c8da390: chore: align HW signers & SeedPhrase signer with the PK signer

## 2.0.40

### Patch Changes

- 14b88161: chore: align fee estimation on ChainDatasource with IndexDatasource
- f28122bc: fix: estimateFee for stargaze NFTs

## 2.0.39

### Patch Changes

- 63cbdc41: Fix: improve build tx with swap pool manager

## 2.0.38

### Patch Changes

- 196ec779: chore: refactor ibc tranfer methods

## 2.0.37

### Patch Changes

- 688bc6f7: chore: update ledger sign method to take prefix from manifest

## 2.0.36

### Patch Changes

- ac6e391d: add priceChange (dayPriceChange) to getData function (getBalance response)
- Updated dependencies [ac6e391d]
  - @xdefi-tech/chains-core@2.0.27

## 2.0.35

### Patch Changes

- 9afd5bca: fix: error when fetching balance on cronos and mars chains

## 2.0.34

### Patch Changes

- 631d1476: fix: error in fee estimation

## 2.0.33

### Patch Changes

- 4316454e: feat: add no-cache for crypto asset and fetching balance queries
- Updated dependencies [4316454e]
  - @xdefi-tech/chains-core@2.0.26

## 2.0.32

### Patch Changes

- 340ec5ef: use protobuf for cosmos types (remove osmojs dependency)

## 2.0.31

### Patch Changes

- 5f2e1cf1: feat: add methods to sign transaction from sign doc

## 2.0.30

### Patch Changes

- 918ccee9: Feat: add Sei mainnet chain

## 2.0.29

### Patch Changes

- 25af39fe: Fix: getTransaction method for cosmos chains

## 2.0.28

### Patch Changes

- 7ff10296: feat: add signing mode for the sign method

## 2.0.27

### Patch Changes

- 5b9f95cb: Feat: add generic files to .eslintignore
- Updated dependencies [5b9f95cb]
  - @xdefi-tech/chains-core@2.0.23

## 2.0.26

### Patch Changes

- 54e5f927: add default fee config for Cosmos chains

## 2.0.25

### Patch Changes

- f593f316: Feat: update builder and test cases environment
- Updated dependencies [f593f316]
  - @xdefi-tech/chains-core@2.0.20

## 2.0.24

### Patch Changes

- 34e22132: use nodeURL instead of rpcURL && reduce size import osmojs

## 2.0.23

### Patch Changes

- ab92e93c: reduce size import osmojs

## 2.0.22

### Patch Changes

- 0a125235: Split Chains Lib GQL package for each chains
- Updated dependencies [0a125235]
  - @xdefi-tech/chains-core@2.0.19

## 2.0.21

### Patch Changes

- deeeccd0: Fix: swap and send NFT transactions

## 2.0.20

### Patch Changes

- b3b380fd: Upgrade version for core package of binance lib, cosmos lib, solana lib, core lib and evm lid.
- Updated dependencies [b3b380fd]
  - @xdefi-tech/chains-core@2.0.18

## 2.0.19

### Patch Changes

- 6fc03319: feat: implement fee abstraction on osmosis chain

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
