import { gqlClient } from '@xdefi-tech/chains-core';
import {
  BitcoinBalanceDocument,
  BitcoinCashBalanceDocument,
  DogecoinBalanceDocument,
  LitecoinBalanceDocument,
  Balance,
} from '@xdefi-tech/chains-graphql';

import { UTXOChains } from '../../../manifests';

type UTXOChainParams = {
  query: any;
  queryName: string;
};

const getChainParams = (chain: string): UTXOChainParams => {
  const params: UTXOChainParams = {
    query: null,
    queryName: '',
  };
  const formattedChain = chain.toLowerCase();
  switch (formattedChain) {
    case UTXOChains.bitcoin:
      params.query = BitcoinBalanceDocument;
      params.queryName = 'bitcoin';
      break;
    case UTXOChains.litecoin:
      params.query = LitecoinBalanceDocument;
      params.queryName = 'litecoin';
      break;
    case UTXOChains.dogecoin:
      params.query = DogecoinBalanceDocument;
      params.queryName = 'dogecoin';
      break;
    case UTXOChains.bitcoincash:
      params.query = BitcoinCashBalanceDocument;
      params.queryName = 'bitcoincash';
      break;
    default:
      throw new Error('Unsupported utxo chain');
  }
  return params;
};

export const getBalance = async (
  chain: string,
  address: string
): Promise<Array<Balance>> => {
  const params = getChainParams(chain);

  const response = await gqlClient.query({
    query: params.query,
    variables: {
      address,
    },
  });

  return response.data[params.queryName].balances;
};
