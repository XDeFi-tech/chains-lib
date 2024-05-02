import { UTXOManifest } from '@xdefi-tech/chains-utxo';

export const BITCOINCASH_MANIFEST: UTXOManifest = {
  name: 'Bitcoin Cash',
  description: '',
  rpcURL: 'https://bch-mainnet.xdefiservices.com',
  chainSymbol: 'BCH',
  blockExplorerURL: 'https://blockchair.com/bitcoin-cash',
  chainId: 'bitcoincash',
  chain: 'bitcoincash',
  decimals: 8,
  feeGasStep: {
    high: 1,
    medium: 1,
    low: 1,
  },
};
