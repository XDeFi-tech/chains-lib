import { Chain } from '@xdefi/chains-core';

export const btcManifest: Chain.Manifest = {
  name: 'Bitcoin',
  description: '',
  rpcURL: '',
  chainSymbol: 'BTC',
  blockExplorerURL: 'https://blockchair.com/bitcoin',
  chainId: 'bitcoin',
  chain: 'bitcoin',
};

export const DEFAULT_BLOCKSTREAM_URL = 'https://blockstream.info';
export const DEFAULT_HASKOIN_URL = 'https://api.haskoin.com/';