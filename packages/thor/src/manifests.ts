import { Chain } from '@ctrl-tech/chains-core';

export enum ThorChains {
  thorchain = 'thorchain',
  mayachain = 'mayachain',
}

export const THORCHAIN_MANIFESTS: {
  [key in ThorChains]: ThorManifest;
} = {
  [ThorChains.thorchain]: {
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
    maxGapAmount: 0,
  },
  [ThorChains.mayachain]: {
    name: 'Maya',
    description: '',
    rpcURL: 'https://rpc-proxy.xdefi.services/mayachain/node',
    chainSymbol: 'CACAO',
    blockExplorerURL: 'https://www.mayascan.org/',
    chainId: 'mayachain-mainnet-v1',
    chain: 'mayachain',
    denom: 'cacao',
    prefix: 'maya',
    decimals: 10,
    feeGasStep: {
      high: 0,
      medium: 0,
      low: 0,
    },
    maxGapAmount: 0,
  },
};

export interface ThorManifest extends Chain.Manifest {
  name: string;
  decimals: any;
  chainId: string;
  chain: string;
  rpcURL: string;
  denom: string;
  prefix: string;
}
