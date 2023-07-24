import { Chain, GasFeeSpeed } from '@xdefi-tech/chains-core';

export enum CosmosHubChains {
  cosmoshub = 'cosmoshub',
  osmosis = 'osmosis',
  axelar = 'axelar',
  juno = 'juno',
  crescent = 'crescent',
  kava = 'kava',
  stargaze = 'stargaze',
  akash = 'akash',
  cronos = 'cronos',
  kujira = 'kujira',
  stride = 'stride',
  mars = 'mars',
}

export interface CosmosManifest extends Chain.Manifest {
  lcdURL: string;
  denom: string;
  decimals: number;
  feeGasStep: {
    [GasFeeSpeed.high]: number;
    [GasFeeSpeed.medium]: number;
    [GasFeeSpeed.low]: number;
  };
}

export const COSMOS_MANIFESTS: {
  [key in CosmosHubChains]: CosmosManifest;
} = {
  [CosmosHubChains.cosmoshub]: {
    name: 'Cosmos Hub',
    description: '',
    rpcURL: 'https://rpc-proxy.xdefi.services/cosmos/rpc/mainnet',
    lcdURL: 'https://rpc-proxy.xdefi.services/cosmos/lcd/mainnet',
    chainSymbol: 'ATOM',
    blockExplorerURL: 'https://www.mintscan.io/cosmos/account',
    chainId: 'cosmoshub-4',
    chain: 'cosmos',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.003,
      medium: 0.0025,
      low: 0.001,
    },
  },
  [CosmosHubChains.osmosis]: {
    name: 'Osmosis',
    description: '',
    rpcURL: 'https://rpc-proxy.xdefi.services/osmosis/lcd/mainnet',
    lcdURL: 'https://rpc-proxy.xdefi.services/osmosis/lcd/mainnet',
    chainSymbol: 'OSMO',
    blockExplorerURL: 'https://www.mintscan.io/osmosis/account',
    chainId: 'osmosis-1',
    chain: 'osmosis',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.axelar]: {
    name: 'Axelar',
    description: '',
    rpcURL: 'https://www.mintscan.io/axelar/txs',
    lcdURL: 'https://www.mintscan.io/axelar/txs',
    chainSymbol: 'AXL',
    blockExplorerURL: 'https://www.mintscan.io/axelar/account',
    chainId: 'axelar-dojo-1',
    chain: 'alexar',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.juno]: {
    name: 'JUNO',
    description: '',
    rpcURL: 'https://www.mintscan.io/juno/txs',
    lcdURL: 'https://www.mintscan.io/juno/txs',
    chainSymbol: 'JUNO',
    blockExplorerURL: 'https://www.mintscan.io/juno/account',
    chainId: 'juno-1',
    chain: 'juno',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.crescent]: {
    name: 'Crescent',
    description: '',
    rpcURL: 'https://www.mintscan.io/crescent/txs',
    lcdURL: 'https://www.mintscan.io/crescent/txs',
    chainSymbol: 'CRE',
    blockExplorerURL: 'https://www.mintscan.io/crescent/account',
    chainId: 'crescent-1',
    chain: 'crescent',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.kava]: {
    name: 'Kava',
    description: '',
    rpcURL: 'https://rpc-proxy.xdefi.services/kava/lcd/mainnet',
    lcdURL: 'https://rpc-proxy.xdefi.services/kava/lcd/mainnet',
    chainSymbol: 'KAVA',
    blockExplorerURL: 'https://www.mintscan.io/kava/account',
    chainId: 'kava_2222-10',
    chain: 'Kava',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.stargaze]: {
    name: 'Stargaze',
    description: '',
    rpcURL: 'https://www.mintscan.io/stargaze/txs',
    lcdURL: 'https://www.mintscan.io/stargaze/txs',
    chainSymbol: 'STARS',
    blockExplorerURL: 'https://www.mintscan.io/stargaze/account',
    chainId: 'stargaze-1',
    chain: 'stargaze',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.akash]: {
    name: 'Akash',
    description: '',
    rpcURL: 'https://www.mintscan.io/akash/txs',
    lcdURL: 'https://www.mintscan.io/akash/txs',
    chainSymbol: 'AKT',
    blockExplorerURL: 'https://www.mintscan.io/akash/account',
    chainId: 'akashnet-2',
    chain: 'akash',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.cronos]: {
    name: 'Crypto.Org',
    description: '',
    rpcURL: 'https://www.mintscan.io/cronos/txs',
    lcdURL: 'https://www.mintscan.io/cronos/txs',
    chainSymbol: 'CRO',
    blockExplorerURL: 'https://www.mintscan.io/cronos/account',
    chainId: 'crypto-org-chain-mainnet-1',
    chain: 'cronos',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.kujira]: {
    name: 'Kujira',
    description: '',
    rpcURL: 'https://www.mintscan.io/kujira/txs',
    lcdURL: 'https://www.mintscan.io/kujira/txs',
    chainSymbol: 'KUJI',
    blockExplorerURL: 'https://www.mintscan.io/kujira/account',
    chainId: 'kaiyo-1',
    chain: 'kujira',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.stride]: {
    name: 'Stride',
    description: '',
    rpcURL: 'https://www.mintscan.io/stride/txs',
    lcdURL: 'https://www.mintscan.io/stride/txs',
    chainSymbol: 'STRD',
    blockExplorerURL: 'https://www.mintscan.io/stride/account',
    chainId: 'stride-1',
    chain: 'stride',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
  [CosmosHubChains.mars]: {
    name: 'Mars',
    description: '',
    rpcURL: 'https://www.mintscan.io/mars-protocol/txs',
    lcdURL: 'https://www.mintscan.io/mars-protocol/txs',
    chainSymbol: 'MARS',
    blockExplorerURL: 'https://www.mintscan.io/mars-protocol/account',
    chainId: 'mars-1',
    chain: 'mars',
    denom: 'uatom',
    decimals: 6,
    feeGasStep: {
      high: 0.03,
      medium: 0.025,
      low: 0.01,
    },
  },
};
