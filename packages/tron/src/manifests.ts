import { Chain } from '@xdefi-tech/chains-core';

export const TRON_MANIFEST: Chain.Manifest = {
  name: 'Tron',
  description: '',
  rpcURL: 'https://api.trongrid.io',
  chainSymbol: 'TRX',
  blockExplorerURL: 'https://tronscan.org',
  chainId: '0x2b6653dc',
  chain: 'tron',
  decimals: 16,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
