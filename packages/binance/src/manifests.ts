import { Chain } from '@xdefi-tech/chains-core';

export const BINANCE_MANIFEST: Chain.Manifest = {
  name: 'Binance',
  description: '',
  rpcURL: 'https://bbc-dex.xdefiservices.com',
  chainSymbol: 'BNB',
  blockExplorerURL: 'https://explorer.bnbchain.org',
  chainId: 'Binance-Chain-Tigris',
  chain: 'binance',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
