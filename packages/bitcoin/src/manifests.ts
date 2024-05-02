import { UTXOManifest } from '@xdefi-tech/chains-utxo';

export const BITCOIN_MANIFEST: UTXOManifest = {
  name: 'Bitcoin',
  description: '',
  rpcURL: 'https://btc-haskoin.xdefiservices.com',
  chainSymbol: 'BTC',
  blockExplorerURL: 'https://blockchair.com/bitcoin',
  chainId: 'bitcoin',
  chain: 'bitcoin',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
