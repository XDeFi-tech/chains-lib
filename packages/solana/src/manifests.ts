import { Chain } from '@xdefi-tech/chains-core';

export interface SolanaManifest extends Chain.Manifest {
  dasUrl: string;
}

export const SOLANA_MANIFEST: SolanaManifest = {
  name: 'Solana',
  description: '',
  rpcURL: 'https://solanalb-rpc.xdefi.services',
  dasUrl: 'https://rpc-proxy.xdefi.services/helius',
  chainSymbol: 'SOL',
  blockExplorerURL: 'https://explorer.solana.com/',
  chainId: 'mainnet-beta',
  chain: 'solana',
  decimals: 9,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
  maxGapAmount: 0,
};
