## Manifest

```typescript
const thorManifest = {
  name: 'Thor',
  description: '',
  rpcURL: 'https://rpc-proxy.xdefi.services/thornode',
  chainSymbol: 'RUNE',
  blockExplorerURL: 'https://viewblock.io/thorchain',
  chainId: 'thorchain-1',
  chain: 'thorchain',
  denom: 'rune',
  prefix: 'thor',
  decimals: 8,
  feeGasStep: {
    high: 0,
    medium: 0,
    low: 0,
  },
};
```

- `name`: The name of the blockchain network, in this case, Thor. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the remote procedure call (RPC) server used to interact with the Thor blockchain.
- `chainSymbol`: The symbol or ticker representing the Thor cryptocurrency, which is "RUNE".
- `blockExplorerURL`: The URL of the block explorer for the Thor blockchain network. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the Thor blockchain. In this example, it's set to 'thorchain-1'.
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places supported by the native currency of the Thor blockchain. In this example, it's set to 6.
- `feeGasStep`: An object specifying the gas steps for different fee levels (high, medium, and low) used for transactions on the Thor blockchain network. In this example, all fee levels are set to 1.

Thorchain specific fields:

- `denom`: The denomination of the native currency of the Thorchain blockchain network, which is "rune".
- `prefix`: The prefix used for addresses on the Thorchain blockchain network, which is "thor".
