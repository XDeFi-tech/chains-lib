import { Chain } from '@xdefi-tech/chains-core';

export interface TronManifest extends Chain.Manifest {
  dataProviderType: 'trongrid' | 'custom';
  dataProviderURL: string;
}

export const TRON_MANIFEST: TronManifest = {
  name: 'Tron',
  description: '',
  rpcURL: 'https://rpc-proxy.xdefi.services/trongrid/rpc/mainnet',
  chainSymbol: 'TRX',
  blockExplorerURL: 'https://tronscan.org',
  dataProviderType: 'trongrid',
  dataProviderURL: 'https://rpc-proxy.xdefi.services/trongrid/rpc/mainnet',
  chainId: '0x2b6653dc',
  chain: 'tron',
  decimals: 6,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
  maxGapAmount: 0,
};
