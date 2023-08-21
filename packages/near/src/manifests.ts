import { Chain } from '@xdefi-tech/chains-core';

export interface NearManifest extends Chain.Manifest {
  walletUrl: string;
  helperUrl: string;
}

export const NEAR_MANIFEST: NearManifest = {
  name: 'Near',
  description: '',
  rpcURL: 'https://rpc-proxy.xdefi.services/near/mainnet',
  chainSymbol: 'NEAR',
  blockExplorerURL: 'https://explorer.mainnet.near.org',
  chainId: 'mainnet',
  chain: 'near',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  decimals: 24,
  feeGasStep: {
    high: 0.0001,
    medium: 0.0001,
    low: 0.0001,
  },
};
