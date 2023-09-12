import { UTXOManifest } from '@xdefi-tech/chains-utxo';

export const BITCOIN_MANIFEST: UTXOManifest = {
  name: 'Bitcoin',
  description: '',
  rpcURL: 'https://blockstream.info',
  chainSymbol: 'BTC',
  blockExplorerURL: 'https://blockchair.com/bitcoin',
  dataProviderType: 'haskoin',
  dataProviderURL: 'https://api.haskoin.com/btc',
  chainId: 'bitcoin',
  chain: 'bitcoin',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
