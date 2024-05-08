## Manifest

```typescript
const ethereumManifest = {
  name: 'Ethereum',
  description: '',
  rpcURL: 'https://ethereum-mainnet.xdefiservices.com',
  chainSymbol: 'ETH',
  blockExplorerURL: 'https://etherscan.io',
  chainId: '1',
  chain: 'ethereum',
  decimals: 18,
  feeGasStep: {
    high: 1.5,
    medium: 1.25,
    low: 1,
  },
  multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
};
```

- `name`: The name of the blockchain network, in this case, Ethereum. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the JSON-RPC endpoint for interacting with the blockchain. It provides access to various blockchain-related functionalities such as querying information, sending transactions, and executing smart contracts.
- `chainSymbol`: The symbol used to represent the native cryptocurrency of the chain, which is Ether (ETH) in this case.
- `blockExplorerURL`: The URL of a block explorer service specific to the Ethereum blockchain. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the chain. It distinguishes Ethereum from other blockchains and is used in various contexts such as transaction signing and network communication.
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places used to represent the smallest unit of native token. e.g. Ether (ETH) on the Ethereum blockchain. Ethereum uses 18 decimals, meaning that 1 Ether is represented by 10^18 Wei.
- `feeGasStep`: An object containing gas fee steps for different transaction priority levels. Gas is the unit used to measure the computational work done by transactions on the network. The values provided represent multipliers applied to the base gas fee for each priority level (high, medium, low).

EVM specific fields:

- `multicallContractAddress`: The address of a smart contract known as Multicall, which allows batching multiple Ethereum function calls into a single transaction. This can help reduce the number of individual transactions needed to fetch data from the Ethereum blockchain, improving efficiency and reducing costs.

## Custom chain

To implement a custom chain, you need to pass a custom manifest to ChainDatasource, and the data will be retrieved directly from the blockchain. ChainDatasource is mandatory because IndexerDatasource does not have custom chain-specific methods.

#### Example with Goerli testnet chain:

The main difference between supported chains and custom chains:

- Supported chains can use IndexerDataSource;
- You have to provide your own manifest for custom chains.

```typescript
import { EvmProvider } from '@xdefi-tech/chains-evm';

const provider = new EvmProvider(
  new EvmProvider.dataSourceList.dataSourceList({
    name: 'Goerli',
    description: '',
    rpcURL: 'https://eth-goerli.public.blastapi.io',
    chainSymbol: 'ETH',
    blockExplorerURL: 'https://goerli.etherscan.io',
    chainId: '5',
    chain: 'goerli',
    decimals: 18,
    feeGasStep: {
      high: 1.5,
      medium: 1.25,
      low: 1,
    },
  })
);

// The same as any other provider
const response = await provider.getBalance(
  '0x1234567890123456789012345678901234567890'
);
const data = await response.getData();
```

## Usage ethers provides

The library allows to use the JsonRpcProvider methods of [ethers](https://docs.ethers.org/v5/api/providers/jsonrpc-provider).

### Example using ethers provider

```typescript
import { EvmProvider, IndexerDataSource } from '@xdefi-tech/chains-evm';

const provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));

const etherProvider = provider.rpcProvider;
// Send raw message to the provider
const data = await etherProvider.send(method, params);
```
