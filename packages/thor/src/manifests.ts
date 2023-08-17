import { Chain } from '@xdefi-tech/chains-core';

export interface ThorManifest extends Chain.Manifest {
  denom: string;
  prefix: string;
}

export const THOR_MANIFEST: ThorManifest = {
  name: 'Thor',
  description: '',
  rpcURL: 'https://rpc-proxy.xdefi.services/thornode',
  chainSymbol: 'RUNE',
  blockExplorerURL: 'https://viewblock.io/thorchain',
  chainId: 'thorchain-mainnet-v1',
  chain: 'thorchain',
  denom: 'rune',
  prefix: 'thor',
  decimals: 8,
  feeGasStep: {
    high: 0,
    medium: 0,
    low: 0,
  },
};
