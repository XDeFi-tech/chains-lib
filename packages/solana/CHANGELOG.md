# @xdefi-tech/chains-solana

## 2.1.36

### Patch Changes

- 7c930938: Feat: separate getBalance method from chain provider
- Updated dependencies [7c930938]
  - @xdefi-tech/chains-core@2.0.44

## 2.1.35

### Patch Changes

- 6add074c: feat: add priority fees by default to dapps and common send

## 2.1.34

### Patch Changes

- e9468834: Feat: add id: manifest.chain+address for chain datasource

## 2.1.33

### Patch Changes

- 2fd999a5: Feat: add all broadcast options to options

## 2.1.32

### Patch Changes

- f47ff973: wait 10s-20s before broadcasting again

## 2.1.31

### Patch Changes

- a790afa0: updated signer to add blockhash

## 2.1.30

### Patch Changes

- bc809247: Feat: reduce GQL cache to 1 min for balances queries
- Updated dependencies [bc809247]
  - @xdefi-tech/chains-core@2.0.43

## 2.1.29

### Patch Changes

- 91dbe300: add serializedTx to sign for sol hw signer

## 2.1.28

### Patch Changes

- c69ffb1b: Feat: add waitFor method to await for transaction
- Updated dependencies [c69ffb1b]
  - @xdefi-tech/chains-core@2.0.42

## 2.1.27

### Patch Changes

- 82f2ecf9: Fix: update CHAINS_CORE_OPTIONS for core lib
- Updated dependencies [82f2ecf9]
  - @xdefi-tech/chains-core@2.0.41

## 2.1.26

### Patch Changes

- 0d699996: add getPriorityFeeEstimate

## 2.1.25

### Patch Changes

- 79c2d8a8: feat: add chains-lib core options support
- Updated dependencies [79c2d8a8]
  - @xdefi-tech/chains-core@2.0.40

## 2.1.24

### Patch Changes

- debb0b35: update solana broadcast to use serialized tx from signer

## 2.1.23

### Patch Changes

- 708bde09: feat: update getMaxAmountToSend method with feeRatioPercentage params
- Updated dependencies [708bde09]
  - @xdefi-tech/chains-core@2.0.39

## 2.1.22

### Patch Changes

- 9c86d835: feat: use getFeeForMessage for all datasource

## 2.1.21

### Patch Changes

- e5c40bef: fix: caching policy for the balance query
- Updated dependencies [e5c40bef]
  - @xdefi-tech/chains-core@2.0.38

## 2.1.20

### Patch Changes

- 7384da2e: Feat: update GQL core package
- Updated dependencies [7384da2e]
  - @xdefi-tech/chains-core@2.0.37

## 2.1.19

### Patch Changes

- e4d0a001: test coverage networked requests (not mocked) for read only (get fees, get balances, get transactions, get utxos) for all chains
- 302840f1: feat: update trezor lib & create Solana trezor signer
- Updated dependencies [302840f1]
  - @xdefi-tech/chains-core@2.0.36

## 2.1.18

### Patch Changes

- 6802d741: fix: remove sign message in solana ledger signer

## 2.1.17

### Patch Changes

- 9767f9d9: feat: update getMaxAmountToSend method
- Updated dependencies [9767f9d9]
  - @xdefi-tech/chains-core@2.0.35

## 2.1.16

### Patch Changes

- dcd1161d: feat: create ctrl data source

## 2.1.15

### Patch Changes

- 3ce57158: fix: Solana Max Send Issue Due to Rent Requirement Miscalculation

## 2.1.14

### Patch Changes

- bdfd5d86: fix: return same blockhash for each buildTx

## 2.1.13

### Patch Changes

- 429b1c40: Feat: reflected data from CryptoAsset type to getBalances responses
- Updated dependencies [429b1c40]
  - @xdefi-tech/chains-core@2.0.34

## 2.1.12

### Patch Changes

- 9b116b86: fix: solana ledger signer

## 2.1.11

### Patch Changes

- 4d5696bf: feat: create multisign msg for transfer sol and spl token

## 2.1.10

### Patch Changes

- 33c98eb3: Feat: update core package bignumber deps
- Updated dependencies [33c98eb3]
  - @xdefi-tech/chains-core@2.0.33

## 2.1.9

### Patch Changes

- 359f5176: Update FallbackDataSource getProvider method
- Updated dependencies [359f5176]
  - @xdefi-tech/chains-core@2.0.32

## 2.1.8

### Patch Changes

- 459335c9: Feat: add check for minimum balance for rent exemption

## 2.1.7

### Patch Changes

- 4d6446e2: Fix external dependencies included in bundles
- Updated dependencies [4d6446e2]
  - eslint-config-custom@1.0.3
  - @xdefi-tech/chains-core@2.0.31

## 2.1.6

### Patch Changes

- 6503b295: feat: pass preflight settings from params for Solana chain

## 2.1.5

### Patch Changes

- 1b543aef: Fix: add getAccountResource to base datasource to use it in FallbackDataSource
- Updated dependencies [1b543aef]
  - @xdefi-tech/chains-core@2.0.30

## 2.1.4

### Patch Changes

- 44d3e999: feat: add xdefi-trace-id to debug gql issues
- Updated dependencies [44d3e999]
  - @xdefi-tech/chains-core@2.0.29

## 2.1.3

### Patch Changes

- 4b849010: fix: logic to handle getAccount errors

## 2.1.2

### Patch Changes

- f12c368f: fix solana signing

## 2.1.1

### Patch Changes

- 5fc3fd95: fix: send on solana for secondary token to new accounts

## 2.1.0

### Minor Changes

- 9121608c: Switched to scure bip32/bip39

## 2.0.28

### Patch Changes

- ac6e391d: add priceChange (dayPriceChange) to getData function (getBalance response)
- Updated dependencies [ac6e391d]
  - @xdefi-tech/chains-core@2.0.27

## 2.0.27

### Patch Changes

- 4316454e: feat: add no-cache for crypto asset and fetching balance queries
- Updated dependencies [4316454e]
  - @xdefi-tech/chains-core@2.0.26

## 2.0.26

### Patch Changes

- 85b3eb03: Feat: update build config
- Updated dependencies [85b3eb03]
  - @xdefi-tech/chains-core@2.0.25

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

- f593f316: Feat: update builder and test cases environment
- Updated dependencies [f593f316]
  - @xdefi-tech/chains-core@2.0.20

## 2.0.22

### Patch Changes

- 0a125235: Split Chains Lib GQL package for each chains
- Updated dependencies [0a125235]
  - @xdefi-tech/chains-core@2.0.19

## 2.0.21

### Patch Changes

- b3b380fd: Upgrade version for core package of binance lib, cosmos lib, solana lib, core lib and evm lid.
- Updated dependencies [b3b380fd]
  - @xdefi-tech/chains-core@2.0.18

## 2.0.20

### Patch Changes

- 3d8f054: Feat: move verifyAddress to provider, make it static
- Updated dependencies [3d8f054]
  - @xdefi-tech/chains-graphql@1.2.15
  - @xdefi-tech/chains-core@2.0.16

## 2.0.19

### Patch Changes

- 5a5b9ef: feat: add base58 to msg encoding for solana chain
  feat: add signMessage for solana signers
- Updated dependencies [5a5b9ef]
  - @xdefi-tech/chains-core@2.0.15

## 2.0.18

### Patch Changes

- 89956d2: Fix TypeScript type errors with abstract provider class
- Updated dependencies [89956d2]
  - @xdefi-tech/chains-core@2.0.14
  - @xdefi-tech/chains-graphql@1.2.14

## 2.0.17

### Patch Changes

- d8b0336: Feat: update signers for swap transactions
- Updated dependencies [6661742]
- Updated dependencies [8c60d66]
  - @xdefi-tech/chains-graphql@1.2.13
  - @xdefi-tech/chains-core@2.0.13

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

- dd93e90: Fix: getBalance calculating amount method

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

- fca5a7f: Feat: update `legacyNFTs` query with collectionV3 fields
- Updated dependencies [fca5a7f]
  - @xdefi-tech/chains-core@2.0.10

## 2.0.11

### Patch Changes

- 38ef280: Fix: metaplex issue for mobile app

## 2.0.10

### Patch Changes

- 62105c4: Feat: update README.md

## 2.0.9

### Patch Changes

- 5b781e6: Feat: add getAccount method to fallbackDataSource in core lib
- Updated dependencies [5b781e6]
  - @xdefi-tech/chains-core@2.0.8

## 2.0.8

### Patch Changes

- 2fc44eb: Feat: Add address generation unit test

## 2.0.7

### Patch Changes

- ac0a640: add solana chain data set

## 2.0.6

### Patch Changes

- 82fdce3: Add support for solana priority fees

## 2.0.5

### Patch Changes

- 290355b: Fix: export ledger files from package
- Updated dependencies [290355b]
  - @xdefi-tech/chains-graphql@1.2.10
  - @xdefi-tech/chains-core@2.0.5

## 2.0.4

### Patch Changes

- 4fe86fc: feat: pin all package dependencies to strict versions
  feat: update ledger signer initialisation stage, currently required transport. see README for the details
- Updated dependencies [4fe86fc]
  - @xdefi-tech/chains-graphql@1.2.9
  - @xdefi-tech/chains-core@2.0.4

## 2.0.3

### Patch Changes

- a559cce: fix: transaction type in core lib
- Updated dependencies [a559cce]
  - @xdefi-tech/chains-core@2.0.3
  - @xdefi-tech/chains-graphql@1.2.7

## 2.0.2

### Patch Changes

- 7638e90: fix: return normalized key for signer provider from core package
  fix: update seed phrase signers with broken private keys
- Updated dependencies [7638e90]
  - @xdefi-tech/chains-core@2.0.2
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

## 1.3.2

### Patch Changes

- af2734d: Bump all packages to apply changes from develop branch
- Updated dependencies [af2734d]
  - @xdefi-tech/chains-core@1.2.5
  - eslint-config-custom@1.0.2
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

## 1.1.17

### Patch Changes

- e602ae7: add solana and btc seed phrase signers

## 1.1.16

### Patch Changes

- 9b2f6b6: Update assets for cor package. Add TRC20 balances
- Updated dependencies [9b2f6b6]
  - @xdefi-tech/chains-core@1.1.15
  - @xdefi-tech/chains-graphql@1.1.12

## 1.1.15

### Patch Changes

- 680b517: Add test coverage, bunch minor fixes
- Updated dependencies [680b517]
  - @xdefi-tech/chains-core@1.1.14
  - eslint-config-custom@1.0.1
  - @xdefi-tech/chains-graphql@1.1.10

## 1.1.14

### Patch Changes

- a357964: Disable preflight option on broadcast

## 1.1.13

### Patch Changes

- 64ca641: Add option to create message from object, buffer or base64
- Updated dependencies [64ca641]
  - @xdefi-tech/chains-core@1.1.13

## 1.1.12

### Patch Changes

- 3b7b00d: Add test coverage
- 3b7b00d: Add NFT Support
- Updated dependencies [3b7b00d]
  - @xdefi-tech/chains-core@1.1.12

## 1.1.11

### Patch Changes

- 5b6cb9b: Added Ledger signer. Added testing coverage for signers
- Updated dependencies [5b6cb9b]
  - @xdefi-tech/chains-core@1.1.11

## 1.1.10

### Patch Changes

- 2c9033b: Added Trezor and Ledger Signers
- Updated dependencies [2c9033b]
  - @xdefi-tech/chains-core@1.1.10
  - @xdefi-tech/chains-graphql@1.1.8

## 1.1.9

### Patch Changes

- b2bfe69: Add seed phrase signer type, update core signer's interface
- Updated dependencies [b2bfe69]
  - @xdefi-tech/chains-core@1.1.8

## 1.1.8

### Patch Changes

- 1efef82: Change import from mjs to common js
- Updated dependencies [1efef82]
  - @xdefi-tech/chains-graphql@1.1.7
  - @xdefi-tech/chains-core@1.1.7

## 1.1.7

### Patch Changes

- cca1491: Update chains-controller, add providerList to each chain. Fix solana memo message
- Updated dependencies [cca1491]
  - @xdefi-tech/chains-core@1.1.6

## 1.1.6

### Patch Changes

- 35b848f: Add UTXO chains, update GQL schemas
- Updated dependencies [35b848f]
  - @xdefi-tech/chains-graphql@1.1.6

## 1.1.5

### Patch Changes

- 5c82b86: Add contract info to buildTx method for Solana chain

## 1.1.4

### Patch Changes

- e60113a: Add send token support for solana chain.

## 1.1.3

### Patch Changes

- 619b0b7: Fix fee issue with solana chain

## 1.1.2

### Patch Changes

- 1641eeb: Fix package.json. Disable lint for chains controller (temp)
- Updated dependencies [3a7e0bb]
  - @xdefi-tech/chains-graphql@1.1.4
  - @xdefi-tech/chains-core@1.1.4

## 1.1.1

### Patch Changes

- 14c668d: Update fee fields for each chain. Add solana. Add EVM chain controller
- Updated dependencies [14c668d]
  - @xdefi-tech/chains-core@1.1.3
  - @xdefi-tech/chains-graphql@1.1.3

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
