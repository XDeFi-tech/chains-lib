import { UTXOManifest } from '@xdefi-tech/chains-utxo';

export const LITECOIN_MANIFEST: UTXOManifest = {
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
