# @xdefi-tech/chains-evm

## 2.0.98

### Patch Changes

- 247f5320: fix: build package failed
- c5e8afb3: Feat: enable waitFor broadcast with new core options
- c5e8afb3: Feat: add options for broadcast method
- fa2d8b99: Apply refresh to graphql schema on evm chains lib service
- Updated dependencies [c5e8afb3]
  - @xdefi-tech/chains-core@2.0.45

## 2.0.97

### Patch Changes

- 7c930938: Feat: separate getBalance method from chain provider
- Updated dependencies [7c930938]
  - @xdefi-tech/chains-core@2.0.44

## 2.0.96

### Patch Changes

- 7adc477f: fix: cronos address chain

## 2.0.95

### Patch Changes

- e9468834: Feat: add id: manifest.chain+address for chain datasource

## 2.0.94

### Patch Changes

- c8ae8667: Fix: improve estimate factor for smartchain

## 2.0.93

### Patch Changes

- b96f52c0: feat: add hex parameter to specify message format for Trezor

## 2.0.92

### Patch Changes

- ad8bf668: fix: using hex string input to be signed

## 2.0.91

### Patch Changes

- ea93eb40: chore: revert evm fee estimation

## 2.0.90

### Patch Changes

- a8a40f64: fix: sign typed data with ledger nano s

## 2.0.89

### Patch Changes

- b467e126: Fix: fee calculation, use maxFeePerGas instead of baseFeePerGas

## 2.0.88

### Patch Changes

- 198d7dcf: Fix: calculate data field for gas limit estimation

## 2.0.87

### Patch Changes

- 3c4651c8: Feat: disable waitFor method for awaiting transaction

## 2.0.86

### Patch Changes

- 063ac1d8: Update to how fees are calculated on EVM

## 2.0.85

### Patch Changes

- 0b1758a7: added value to estimate gasLimit for value for native txs with data
- d0ae4b3b: fix tests in chains provider

## 2.0.84

### Patch Changes

- bc809247: Feat: reduce GQL cache to 1 min for balances queries
- Updated dependencies [bc809247]
  - @xdefi-tech/chains-core@2.0.43

## 2.0.83

### Patch Changes

- 3b688898: fix: add validate for custom fee info

## 2.0.82

### Patch Changes

- c69ffb1b: Feat: add waitFor method to await for transaction
- Updated dependencies [c69ffb1b]
  - @xdefi-tech/chains-core@2.0.42

## 2.0.81

### Patch Changes

- 1c4dcbf5: Fix: update getMaxAmountToSend for non-native tokens

## 2.0.80

### Patch Changes

- 1ecb3980: fix: xdefi-11783 Trezor Invalid parameter domain_separator_hash"

## 2.0.79

### Patch Changes

- 82f2ecf9: Fix: update CHAINS_CORE_OPTIONS for core lib
- Updated dependencies [82f2ecf9]
  - @xdefi-tech/chains-core@2.0.41

## 2.0.78

### Patch Changes

- 9a2b943f: fix: XDEFI-11818 Secondary assets swap on Trezor failing"

## 2.0.77

### Patch Changes

- 79c2d8a8: feat: add chains-lib core options support
- Updated dependencies [79c2d8a8]
  - @xdefi-tech/chains-core@2.0.40

## 2.0.76

### Patch Changes

- 3d0bbf06: fix: fee estimation calculation

## 2.0.75

### Patch Changes

- 708bde09: feat: add feeRatioPercentage to calculation getMaxAmountToSend
- 708bde09: feat: update getMaxAmountToSend method with feeRatioPercentage params
- Updated dependencies [708bde09]
  - @xdefi-tech/chains-core@2.0.39

## 2.0.74

### Patch Changes

- e5c40bef: fix: caching policy for the balance query
- Updated dependencies [e5c40bef]
  - @xdefi-tech/chains-core@2.0.38

## 2.0.73

### Patch Changes

- 4ecc37ad: increase gasLimit for avax by 20%

## 2.0.72

### Patch Changes

- 600a3117: fix: invalid hex number error 0x0

## 2.0.71

### Patch Changes

- 7cebf99f: fix: estimate dapp tx error

## 2.0.70

### Patch Changes

- 98617304: fix: add error handling logic for signing failures
- 4fd271ca: fix: get fee error

## 2.0.69

### Patch Changes

- 7384da2e: Feat: update GQL core package
- Updated dependencies [7384da2e]
  - @xdefi-tech/chains-core@2.0.37

## 2.0.68

### Patch Changes

- c01a6bb9: update parseGwei to handle exponential numbers

## 2.0.67

### Patch Changes

- 03d49b03: add implementation for getNonce to CtrlDatasource

## 2.0.66

### Patch Changes

- 4482f00f: Feat: change MATIC to POL

## 2.0.65

### Patch Changes

- 26eb77a9: export CtrlDataSource

## 2.0.64

### Patch Changes

- e4d0a001: test coverage networked requests (not mocked) for read only (get fees, get balances, get transactions, get utxos) for all chains
- 302840f1: feat: update trezor lib & create Solana trezor signer
- Updated dependencies [302840f1]
  - @xdefi-tech/chains-core@2.0.36

## 2.0.63

### Patch Changes

- 817c1867: chore: fix type error

## 2.0.62

### Patch Changes

- 9767f9d9: feat: update getMaxAmountToSend method
- Updated dependencies [9767f9d9]
  - @xdefi-tech/chains-core@2.0.35

## 2.0.61

### Patch Changes

- 02685505: Fix: getTransaction method for EVM chains
- 83b84ced: chore: XDEFI-10371 Overwrite ETH token data for custom networks if native token is ETH

## 2.0.60

### Patch Changes

- a4206c6a: chore: increased default contract fee from 100k to 1mill

## 2.0.59

### Patch Changes

- 1d49bb77: fix: int divided by int can lead to a decimal, math.ceil fixes

## 2.0.58

### Patch Changes

- dcd1161d: feat: create ctrl data source

## 2.0.57

### Patch Changes

- 02a22251: fix: estimate gas in data sources

## 2.0.56

### Patch Changes

- f43a7bd3: feat: add ethereum message signing method
- 429b1c40: Feat: reflected data from CryptoAsset type to getBalances responses
- Updated dependencies [429b1c40]
  - @xdefi-tech/chains-core@2.0.34

## 2.0.55

### Patch Changes

- 0bfe4af6: add multiple to evm gas estimate that has contractAddress in payload(send)

## 2.0.54

### Patch Changes

- 33c98eb3: Feat: update core package bignumber deps
- Updated dependencies [33c98eb3]
  - @xdefi-tech/chains-core@2.0.33

## 2.0.53

### Patch Changes

- 359f5176: Update FallbackDataSource getProvider method
- Updated dependencies [359f5176]
  - @xdefi-tech/chains-core@2.0.32

## 2.0.52

### Patch Changes

- 4d6446e2: Fix external dependencies included in bundles
- Updated dependencies [4d6446e2]
  - @xdefi-tech/chains-core@2.0.31

## 2.0.51

### Patch Changes

- 69686372: Fix: add maxPriorityFeePerGas default value to 1 gwei

## 2.0.50

### Patch Changes

- 3b68fabe: Fix: update buildTx to avoid can't get EIP1559 gas fee error

## 2.0.49

### Patch Changes

- 1b543aef: Fix: add getAccountResource to base datasource to use it in FallbackDataSource
- Updated dependencies [1b543aef]
  - @xdefi-tech/chains-core@2.0.30

## 2.0.48

### Patch Changes

- 44d3e999: feat: add xdefi-trace-id to debug gql issues
- Updated dependencies [44d3e999]
  - @xdefi-tech/chains-core@2.0.29

## 2.0.47

### Patch Changes

- 81860b9b: fix: buildTx when maxPriorityFeePerGas is 0

## 2.0.46

### Patch Changes

- ee444743: feat: add logic to calculate gasPrice when not provided

## 2.0.45

### Patch Changes

- 1d2bf619: fix: hex odd length error for trezor signing

## 2.0.44

### Patch Changes

- e53967a2: Feat: add fallback for calculating fees

## 2.0.43

### Patch Changes

- ac6e391d: add priceChange (dayPriceChange) to getData function (getBalance response)
- Updated dependencies [ac6e391d]
  - @xdefi-tech/chains-core@2.0.27

## 2.0.42

### Patch Changes

- 6f3aa96e: remove xDai(Gnosis) - unsupported chain

## 2.0.41

### Patch Changes

- 5d972f34: Fix: nft query for smartchain and cronos

## 2.0.40

### Patch Changes

- 4316454e: feat: add no-cache for crypto asset and fetching balance queries
- Updated dependencies [4316454e]
  - @xdefi-tech/chains-core@2.0.26

## 2.0.39

### Patch Changes

- 85b3eb03: Feat: update build config
- Updated dependencies [85b3eb03]
  - @xdefi-tech/chains-core@2.0.25

## 2.0.38

### Patch Changes

- 571b0456: added default usage of fee service for evm estimateFees
- Updated dependencies [571b0456]
  - @xdefi-tech/chains-core@2.0.24

## 2.0.37

### Patch Changes

- 5b9f95cb: Feat: add generic files to .eslintignore
- 5b9f95cb: Feat: add Gnosis chain support
- Updated dependencies [5b9f95cb]
  - @xdefi-tech/chains-core@2.0.23

## 2.0.36

### Patch Changes

- 9a9fe602: Revert tsup config
- Updated dependencies [9a9fe602]
  - @xdefi-tech/chains-core@2.0.22

## 2.0.35

### Patch Changes

- f593f316: Feat: update builder and test cases environment
- Updated dependencies [f593f316]
  - @xdefi-tech/chains-core@2.0.20

## 2.0.34

### Patch Changes

- 88df53e5: fix: ledger signer

## 2.0.33

### Patch Changes

- f549279a: fix: evm baseFeePerGas

## 2.0.32

### Patch Changes

- 2f8a9425: fix: use data if present and not assume transfer for ERC20 tokens

## 2.0.31

### Patch Changes

- 2c6c2f59: split graphql for evm chain lib

## 2.0.30

### Patch Changes

- 0a125235: Split Chains Lib GQL package for each chains
- Updated dependencies [0a125235]
  - @xdefi-tech/chains-core@2.0.19

## 2.0.29

### Patch Changes

- b3b380fd: Upgrade version for core package of binance lib, cosmos lib, solana lib, core lib and evm lid.
- Updated dependencies [b3b380fd]
  - @xdefi-tech/chains-core@2.0.18

## 2.0.28

### Patch Changes

- b340836e: fix: add the logic to fetch native token balance using multicall and batch call

## 2.0.27

### Patch Changes

- 0a8c0a56: feat: gasFeeOptions for chain and indexer on EVM should default to getting data from RPC
- Updated dependencies [0a8c0a56]
  - @xdefi-tech/chains-core@2.0.17

## 2.0.26

### Patch Changes

- 3d8f054: Feat: move verifyAddress to provider, make it static
- Updated dependencies [3d8f054]
  - @xdefi-tech/chains-graphql@1.2.15
  - @xdefi-tech/chains-core@2.0.16

## 2.0.25

### Patch Changes

- 89956d2: Fix TypeScript type errors with abstract provider class
- Updated dependencies [89956d2]
  - @xdefi-tech/chains-core@2.0.14
  - @xdefi-tech/chains-graphql@1.2.14

## 2.0.24

### Patch Changes

- 9794deb: feat: implement signTypedData method (v4)
- 6661742: Feat: add separate queries for each EVM chain. Fix caching issue
- 8c60d66: Feat: add baseFeePerGas for evm fees, update getFee method calculation
- Updated dependencies [6661742]
- Updated dependencies [8c60d66]
  - @xdefi-tech/chains-graphql@1.2.13
  - @xdefi-tech/chains-core@2.0.13

## 2.0.23

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

## 2.0.22

### Patch Changes

- dd93e90: Fix: getBalance calculating amount method

## 2.0.21

### Patch Changes

- 74a48b0: Feat: update legacyNFTs franment in core lib
- Updated dependencies [74a48b0]
  - @xdefi-tech/chains-core@2.0.11

## 2.0.20

### Patch Changes

- fdbbdd7: Feat: add price.dayPriceChange field for getting balances
- Updated dependencies [fdbbdd7]
  - @xdefi-tech/chains-graphql@1.2.12

## 2.0.19

### Patch Changes

- 3afec9a: feat: Add missing methods for EVM signers

  - [x] added `recover` method
  - [x] added `recoverPublicKey` method
  - [x] added `encryptWithPublicKey` method

## 2.0.18

### Patch Changes

- fca5a7f: Feat: update `legacyNFTs` query with collectionV3 fields
- Updated dependencies [fca5a7f]
  - @xdefi-tech/chains-core@2.0.10

## 2.0.17

### Patch Changes

- c7526da: feat: expose provider so that extension can calls `send()` to the provider for dapps

## 2.0.16

### Patch Changes

- cebc1dc: chore: update optimism default rpc url

## 2.0.15

### Patch Changes

- 7de45e1: Feat: make signatureType optional field
- Updated dependencies [7de45e1]
  - @xdefi-tech/chains-graphql@1.2.11
  - @xdefi-tech/chains-core@2.0.9

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

- d97d68f: Fix: getBalance method with empty tokenAddresses
- Updated dependencies [d97d68f]
  - @xdefi-tech/chains-core@2.0.7

## 2.0.10

### Patch Changes

- 609e0ad: Fix: Syntax

## 2.0.9

### Patch Changes

- 6051dff: Feat: rpc batch call

## 2.0.8

### Patch Changes

- 737695e: feat: add get custom tokents, multicall get balance
- Updated dependencies [737695e]
  - @xdefi-tech/chains-core@2.0.6

## 2.0.7

### Patch Changes

- 13a3eb3: feat: add ethers to export

## 2.0.6

### Patch Changes

- caa099e: add klaytn and cronos chains to manifest

## 2.0.5

### Patch Changes

- 7f90cae: Feat: add personal signing

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
