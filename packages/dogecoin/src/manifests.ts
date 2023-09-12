import { UTXOManifest } from '@xdefi-tech/chains-utxo';

export const DOGECOIN_MANIFEST: UTXOManifest = {
  name: 'Dogecoin',
  description: '',
  rpcURL: 'https://blockstream.info',
  chainSymbol: 'DOGE',
  blockExplorerURL: 'https://blockchair.com/dogecoin',
  dataProviderType: 'blockchair',
  dataProviderURL: 'https://api.blockchair.com/dogecoin',
  chainId: 'dogecoin',
  chain: 'dogecoin',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
