import { UTXOManifest } from '@xdefi-tech/chains-utxo';

export const DASH_MANIFEST: UTXOManifest = {
  name: 'Dash',
  description: '',
  rpcURL: 'https://explorer.dash.org/insight-api',
  chainSymbol: 'DASH',
  blockExplorerURL: 'https://blockchair.com/dash',
  chainId: 'dash',
  chain: 'dash',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
