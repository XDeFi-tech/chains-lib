## Manifest

```typescript
const dogecoinManifest = {
  name: 'Dogecoin',
  description: '',
  rpcURL: 'https://blockstream.info',
  chainSymbol: 'DOGE',
  blockExplorerURL: 'https://blockchair.com/dogecoin',
  chainId: 'dogecoin',
  chain: 'dogecoin',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
```

- `name`: The name of the blockchain network, in this case, Dogecoin. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the RPC (Remote Procedure Call) endpoint used to interact with the Dogecoin blockchain network.
- `chainSymbol`: The symbol or ticker representing the Dogecoin blockchain network, which is "DOGE".
- `blockExplorerURL`: The URL of the block explorer for the Dogecoin blockchain network. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the Dogecoin blockchain network, often referred to as the chain ID. In this example, it is "dogecoin".
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places used for representing token amounts on the Dogecoin blockchain. In this case, it is set to 8.
- `feeGasStep`: An object specifying the gas steps for different fee levels (high, medium, and low) used for transactions on the Dogecoin blockchain network. In this example, all fee levels are set to 1.
