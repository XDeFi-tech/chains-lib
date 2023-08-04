import { Chain } from '@xdefi-tech/chains-core';

export const SOLANA_MANIFEST: Chain.Manifest = {
  name: 'Solana',
  description: '',
  rpcURL: 'https://solanalb-rpc.xdefi.services',
  chainSymbol: 'SOL',
  blockExplorerURL: 'https://explorer.solana.com/',
  chainId: 'mainnet-beta',
  chain: 'solana',
  decimals: 6,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
