## Manifest

```typescript
const bitcoincashManifest = {
  name: 'Bitcoin Cash',
  description: '',
  rpcURL: 'https://bch-mainnet.xdefiservices.com',
  chainSymbol: 'BCH',
  blockExplorerURL: 'https://blockchair.com/bitcoin-cash',
  chainId: 'bitcoincash',
  chain: 'bitcoincash',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
```

- `name`: The name of the blockchain network, in this case, Bitcoin Cash. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the RPC (Remote Procedure Call) endpoint used to interact with the Bitcoin Cash blockchain network.
- `chainSymbol`: The symbol or ticker representing the Bitcoin Cash blockchain network, which is "BCH".
- `blockExplorerURL`: The URL of the block explorer for the Bitcoin Cash blockchain network. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the Bitcoin Cash blockchain network, often referred to as the chain ID. In this example, it is "bitcoincash".
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places used for representing token amounts on the Bitcoin Cash blockchain. In this case, it is set to 8.
- `feeGasStep`: An object specifying the gas steps for different fee levels (high, medium, and low) used for transactions on the Bitcoin Cash blockchain network. In this example, all fee levels are set to 1.
