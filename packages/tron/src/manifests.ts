import { Chain } from '@xdefi-tech/chains-core';

export interface TronManifest extends Chain.Manifest {
  dataProviderType: 'trongrid' | 'custom';
  dataProviderURL: string;
}

export const TRON_MANIFEST: TronManifest = {
  name: 'Tron',
  description: '',
  rpcURL: 'https://api.trongrid.io',
  chainSymbol: 'TRX',
  blockExplorerURL: 'https://tronscan.org',
  dataProviderType: 'trongrid',
  dataProviderURL: 'https://api.trongrid.io',
  chainId: '0x2b6653dc',
  chain: 'tron',
  decimals: 16,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
