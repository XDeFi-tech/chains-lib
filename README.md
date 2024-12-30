# Chainslib

This TypeScript library is designed to provide a unified interface for working with multiple blockchain networks, allowing developers to interact with various blockchain chains seamlessly. It supports a wide range of features and blockchain networks, making it a versatile tool for blockchain development.

## Features

This library offers the following key features:

Hardware Wallet Support: It provides integration with Ledger and Trezor hardware wallets for enhanced security in blockchain transactions.

Wallet Types: You can work with both seed phrase and private key wallets for managing your blockchain assets.

Standardized RPC Interface: The library offers a consistent RPC interface for fetching blockchain information and broadcasting transactions across different supported chains.

## Supported Chains

This library currently supports the following blockchain networks:
// example for fallback data source
// example with custom provider

| Chain           | Provider                                                                        | Datasources    | Signers                                | Custom chain |
| --------------- | ------------------------------------------------------------------------------- | -------------- | -------------------------------------- | ------------ |
| Bitcoin         | [Bitcoin](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-bitcoin)         | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | No           |
| Ethereum        | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| BNB Smart Chain | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Polygon         | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Avalanche       | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Fantom          | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Arbitrum        | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Aurora          | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Canto EVM       | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Optimism        | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Klaytn          | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Cronos          | [EVM](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-evm)                 | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| BitcoinCash     | [BitcoinCash](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-bitcoincash) | Indexer        | SeedPhrase, PrivateKey, Ledger, Trezor | No           |
| Cosmos Hub      | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Osmosis         | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Axelar          | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Juno            | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Crescent        | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Kava            | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Stargaze        | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Akash           | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Cronos          | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Kujira          | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Stride          | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Mars            | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Terra           | [Cosmos](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-cosmos)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger, Trezor | Yes          |
| Dogecoin        | [Dogecoin](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-dogecoin)       | Indexer        | SeedPhrase, PrivateKey, Ledger, Trezor | No           |
| Litecoin        | [Litecoin](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-litecoin)       | Indexer        | SeedPhrase, PrivateKey, Ledger, Trezor | No           |
| Solana          | [Solana](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-solana)           | Indexer, Chain | SeedPhrase, PrivateKey, Ledger         | No           |
| ThorChain       | [ThorChain](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-thor)          | Indexer, Chain | SeedPhrase, Ledger                     | No           |
| MayaChain       | [ThorChain](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-thor)          | Indexer, Chain | SeedPhrase, Ledger                     | No           |
| Tron            | [Tron](https://github.com/XDeFi-tech/chains/pkgs/npm/chains-tron)               | Indexer, Chain | SeedPhrase, PrivateKey, Ledger         | No           |

## Installation

To use this library in your TypeScript project, you can install it via npm or yarn:

```bash
npm install @xdefi-tech/chains
# or
yarn add @xdefi-tech/chains
```

## Environment Setup

The `NETWORKED_QUERIES` environment variable is used to control the behavior of network requests in tests. By default, `NETWORKED_QUERIES` is set to `0`, which means that all network requests are mocked, allowing tests to run without actual network dependencies. This ensures that tests are faster, more reliable, and not affected by external factors such as network latency or availability of external services. Setting `NETWORKED_QUERIES` to `1` enables real network requests, allowing tests to interact with actual external services. This can be useful for integration tests where end-to-end verification of network interactions is required. To configure this setting, simply add `NETWORKED_QUERIES=0` or `NETWORKED_QUERIES=1` to your `.env` file as needed.

## Manifest

Each provider may have different manifests, but they share common fields. For more details, please refer to the README of the respective provider.

- `name`: The name of the blockchain network. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL endpoint for the Remote Procedure Call (RPC) interface of the blockchain network.
- `chainSymbol`: The symbol representing the blockchain network.
- `blockExplorerURL`: The URL of a block explorer service specific to the blockchain. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier of the blockchain network.
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places used by the native currency of the blockchain network.
- `feeGasStep`: An object containing gas step values for different fee levels (high, medium, low) used in transactions.

## Usage

Here's a basic example of how to use this library in your TypeScript application:

### 1. Import Required Modules

```typescript
import { BitcoinProvider } from './chain.provider';
import LedgerSigner from './ledger.signer';
import { MsgBody, Msg } from '../msg';
```

### 2. Initialize Bitcoin Provider

Initialize the Bitcoin provider with the necessary configurations:

```typescript
const provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
```

### 3. Create Transaction Input

Define the transaction input data, including the sender (from), recipient (to), and the amount to send.

```typescript
const txInput: MsgBody = {
  from: 'FROM ADDRESS',
  to: 'TO ADDRESS',
  amount: 0.000001,
};
```

### 4. Create a Transaction Message

Create a transaction message using the provider:

```typescript
const message: Msg = provider.createMsg(txInput);
```

### 5. Sign the Transaction with Ledger

Use the LedgerSigner to sign the transaction. Provide the message and the derivation path:

```typescript
const transport = await Transport.create();
const signer = new LedgerSigner(transport);
const derivationPath = "m/84'/0'/0'/0/0";

await signer.sign(message, derivationPath);
// finally close
transport.close();
```

### 6. Broadcast the Transaction

Now that the transaction is signed, you can broadcast it to the Bitcoin network using the BitcoinProvider. This step assumes that the transaction is already signed within the `message`.

```typescript
await provider.broadcast([message]);
```

## Fallback datasource

- If an error occurs while fetching data from the primary data source, the FallbackDataSource will automatically switch to one of the alternative data sources configured in the constructor.
- The number of retry attempts and the order in which the alternative data sources are used can be customized based on the requirements and preferences of the application.

```typescript
import { FallbackDataSource } from '@xdefi-tech/chains-core';
import { EvmProvider, EVM_MANIFESTS } from '@xdefi-tech/chains-evm';

const provider = new EvmProvider(
  new FallbackDataSource(
    EVM_MANIFEST.ethereum,
    {
      attempts: 5,
    },
    new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFEST.ethereum),
    new EvmProvider.dataSourceList.ChainDataSource(EVM_MANIFEST.ethereum)
  )
);

// The same as any other provider
const response = await provider.getBalance(
  '0x1234567890123456789012345678901234567890'
);
const data = await response.getData();
```

## Retrieving a Transaction

### 1. Get Transaction Hash

If you have a transaction hash, you can retrieve the transaction details. Use the `getTransaction` method of the BitcoinProvider:

```typescript
const txHash = 'TX HAS';
const txData = await provider.getTransaction(txHash);
```

The `txData` object will contain transaction details, including the transaction hash.

## Contribution

Please make sure to read the [Contributing Guide](CONTRIBUTING.md) before making a pull request. If you have a Chainslib-related project or feature request, feel free to open an issue.

Thank you to all the people who already contributed to Chainslib!

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

Copyright © 2024 XDEFI
