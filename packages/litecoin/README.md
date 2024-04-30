## Manifest

```typescript
const litecoinManifest = {
    name: 'Litecoin',
    description: '',
    rpcURL: 'https://blockstream.info',
    chainSymbol: 'LTC',
    blockExplorerURL: 'https://blockchair.com/litecoin',
    dataProviderType: 'blockchair',
    dataProviderURL: 'https://rpc-proxy.xdefi.services/blockchair/litecoin',
    chainId: 'litecoin',
    chain: 'litecoin',
    decimals: 8,
    feeGasStep: {
        high: 1,
        medium: 1,
        low: 1,
    },
};
```

- `name`: The name of the blockchain network, in this case, Litecoin. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the RPC (Remote Procedure Call) endpoint used to interact with the Litecoin blockchain network.
- `chainSymbol`: The symbol or ticker representing the Litecoin blockchain network, which is "LTC".
- `blockExplorerURL`: The URL of the block explorer for the Litecoin blockchain network. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the Litecoin blockchain network, often referred to as the chain ID. In this example, it is "litecoin".
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places used for representing token amounts on the Litecoin blockchain. In this case, it is set to 8.
- `feeGasStep`: An object specifying the gas steps for different fee levels (high, medium, and low) used for transactions on the Litecoin blockchain network. In this example, all fee levels are set to 1.

UTXO Specifec fields:
- `dataProviderType`: Specifies the type of data provider used for retrieving blockchain data: hascoin/blockchair
- `dataProviderURL`: The URL of the data provider used for retrieving blockchain data: scanUTXOs, getTransaction
