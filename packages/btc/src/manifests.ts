import { Chain } from '@xdefi-tech/chains-core';

export interface UTXOManifest extends Chain.Manifest {
  chainDataSourceURL: string;
}

export const BTC_MANIFEST: UTXOManifest = {
  name: 'Bitcoin',
  description: '',
  rpcURL: 'https://blockstream.info',
  chainSymbol: 'BTC',
  blockExplorerURL: 'https://blockchair.com/bitcoin',
  chainDataSourceURL: 'https://api.haskoin.com/btc/',
  chainId: 'bitcoin',
  chain: 'bitcoin',
  decimals: 8,
  feeGasStep: {
    high: 2,
    medium: 1.5,
    low: 1,
  },
};

export const DEFAULT_BLOCKSTREAM_URL = 'https://blockstream.info';
export const DEFAULT_HASKOIN_URL = 'https://api.haskoin.com/';
