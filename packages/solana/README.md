## Manifest

```typescript
const solanaManifest = {
  name: 'Solana',
  description: '',
  rpcURL: 'https://solanalb-rpc.xdefi.services',
  chainSymbol: 'SOL',
  blockExplorerURL: 'https://explorer.solana.com/',
  chainId: 'mainnet-beta',
  chain: 'solana',
  decimals: 6,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
```

- `name`: The name of the blockchain network, in this case, Solana. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the remote procedure call (RPC) server used to interact with the Solana blockchain.
- `chainSymbol`: The symbol or ticker representing the Solana cryptocurrency, which is "SOL".
- `blockExplorerURL`: The URL of the block explorer for the Solana blockchain network. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the Solana blockchain network, often referred to as the chain ID. In this example, it is "mainnet-beta".
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places supported by the native currency of the Solana blockchain. In this example, it's set to 6.
- `feeGasStep`: An object specifying the gas steps for different fee levels (high, medium, and low) used for transactions on the Solana blockchain network. In this example, all fee levels are set to 1.
