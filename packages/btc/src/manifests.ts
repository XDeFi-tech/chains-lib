import { Chain } from '@xdefi-tech/chains-core';

export enum UTXOChains {
  bitcoin = 'bitcoin',
  litecoin = 'litecoin',
  dogecoin = 'dogecoin',
  bitcoincash = 'bitcoincash',
}

export interface UTXOManifest extends Chain.Manifest {
  chainDataSourceURL: string;
}

export const UTXO_MANIFESTS: { [key in UTXOChains]: UTXOManifest } = {
  [UTXOChains.bitcoin]: {
    name: 'Bitcoin',
    description: '',
    rpcURL: 'https://blockstream.info',
    chainSymbol: 'BTC',
    blockExplorerURL: 'https://blockchair.com/bitcoin',
    chainDataSourceURL: 'https://api.haskoin.com/btc/',
    chainId: 'bitcoin',
    chain: 'bitcoin',
    decimals: 8,
    feeGasStep: {
      high: 1,
      medium: 1,
      low: 1,
    },
  },
  [UTXOChains.litecoin]: {
    name: 'Litecoin',
    description: '',
    rpcURL: 'https://blockstream.info',
    chainSymbol: 'LTC',
    blockExplorerURL: 'https://blockchair.com/litecoin',
    chainDataSourceURL: 'https://litecoin-mainnet.xdefiservices.com',
    chainId: 'litecoin',
    chain: 'litecoin',
    decimals: 8,
    feeGasStep: {
      high: 1,
      medium: 1,
      low: 1,
    },
  },
  [UTXOChains.dogecoin]: {
    name: 'Dogecoin',
    description: '',
    rpcURL: 'https://blockstream.info',
    chainSymbol: 'DOGE',
    blockExplorerURL: 'https://blockchair.com/dogecoin',
    chainDataSourceURL: 'https://api.haskoin.com/btc/',
    chainId: 'dogecoin',
    chain: 'dogecoin',
    decimals: 8,
    feeGasStep: {
      high: 1,
      medium: 1,
      low: 1,
    },
  },
  [UTXOChains.bitcoincash]: {
    name: 'Bitcoin Cash',
    description: '',
    rpcURL: 'https://bch-mainnet.xdefiservices.com/',
    chainSymbol: 'BCH',
    blockExplorerURL: 'https://blockchair.com/bitcoin-cash',
    chainDataSourceURL: 'https://bch-haskoin.xdefiservices.com',
    chainId: 'bitcoincash',
    chain: 'bitcoincash',
    decimals: 8,
    feeGasStep: {
      high: 1,
      medium: 1,
      low: 1,
    },
  },
};
