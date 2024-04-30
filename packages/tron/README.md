## Manifest

```typescript
const tronManifest = {
    name: 'Tron',
    description: '',
    rpcURL: 'https://api.trongrid.io',
    chainSymbol: 'TRX',
    blockExplorerURL: 'https://tronscan.org',
    dataProviderType: 'trongrid',
    dataProviderURL: 'https://api.trongrid.io',
    chainId: '0x2b6653dc',
    chain: 'tron',
    decimals: 16,
    feeGasStep: {
        high: 1,
        medium: 1,
        low: 1,
    },
};
```

- `name`: The name of the blockchain network, in this case, Tron. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the remote procedure call (RPC) server used to interact with the Tron blockchain.
- `chainSymbol`: The symbol or ticker representing the Tron cryptocurrency, which is "TRX".
- `blockExplorerURL`: The URL of the block explorer for the Tron blockchain network. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the Tron blockchain network, often referred to as the chain ID. In this example, it is "0x2b6653dc".
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places supported by the native currency of the Tron blockchain, which is 16.
- `feeGasStep`: An object specifying the gas steps for different fee levels (high, medium, and low) used for transactions on the Tron blockchain network. In this example, all fee levels are set to 1.

Tron specific fields:
- `dataProviderType`: Specifies the type of data provider used for retrieving blockchain data: trongrid
- `dataProviderURL`: The URL of the data provider used for retrieving blockchain data: getTransaction, getAccount, getBlock
