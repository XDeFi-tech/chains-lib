## Manifest

```typescript
const cosmosManifest = {
    name: 'Cosmos Hub',
    description: '',
    rpcURL: 'https://rpc-proxy.xdefi.services/cosmos/rpc/mainnet',
    lcdURL: 'https://rpc-proxy.xdefi.services/cosmos/lcd/mainnet',
    chainSymbol: 'ATOM',
    blockExplorerURL: 'https://www.mintscan.io/cosmos/account',
    chainId: 'cosmoshub-4',
    chain: 'cosmos',
    denom: 'uatom',
    decimals: 6,
    prefix: 'cosmos',
    feeGasStep: {
        high: 0.003,
        medium: 0.0025,
        low: 0.001,
    },
};
```

- `name`: The name of the blockchain network, in this case, Cosmos Hub. Uses only for display name to user
- `description`: A brief description or additional information about the blockchain network.
- `rpcURL`: The URL of the remote procedure call (RPC) server used to interact with the Cosmos blockchain.
- `chainSymbol`: The symbol or ticker representing the native cryptocurrency of the Cosmos Hub blockchain, which is "ATOM".
- `blockExplorerURL`: The URL of the block explorer for the Cosmos blockchain network. Block explorers allow users to view details about blocks, transactions, addresses, and other blockchain-related data.
- `chainId`: The unique identifier for the Cosmos Hub blockchain. In this example, it's set to "cosmoshub-4".
- `chain`: The name of the blockchain network. If you are using IndexerDataSource, it must be obtained from the [registry](https://github.com/XDeFi-tech/xdefi-registry/blob/main/chains.json).
- `decimals`: The number of decimal places supported by the native currency of the Cosmos Hub blockchain. In this example, it's set to 6.
- `feeGasStep`: An object containing the gas fee steps for transactions on the Cosmos Hub blockchain. It includes three levels: high, medium, and low, each with a different gas fee value specified in "ATOM".

Cosmos specific fields:
- `lcdURL`: The URL of the LCD (Light Client Daemon) server used to query information from the Cosmos Hub blockchain.
- `denom`: The denomination or name of the native currency of the Cosmos Hub blockchain, which is "uatom".
- `prefix`: A prefix used in some contexts or operations related to the Cosmos Hub blockchain, which is "cosmos".

