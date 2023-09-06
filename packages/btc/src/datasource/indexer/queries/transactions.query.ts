import {
  GetBitcoinTransactionsDocument,
  GetLitecoinTransactionsDocument,
  GetDogecoinTransactionsDocument,
  GetBitcoinCashTransactionsDocument,
  Scalars,
  OptBlockRange,
  UtxoTransaction,
} from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';
import map from 'lodash/map';

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
      params.query = GetBitcoinTransactionsDocument;
      params.queryName = 'bitcoin';
      break;
    case UTXOChains.litecoin:
      params.query = GetLitecoinTransactionsDocument;
      params.queryName = 'litecoin';
      break;
    case UTXOChains.dogecoin:
      params.query = GetDogecoinTransactionsDocument;
      params.queryName = 'dogecoin';
      break;
    case UTXOChains.bitcoincash:
      params.query = GetBitcoinCashTransactionsDocument;
      params.queryName = 'bitcoincash';
      break;
    default:
      throw new Error('Unsupported utxo chain');
  }
  return params;
};

export const getTransactions = async (
  chain: string,
  address: Scalars['String'],
  blockRange: OptBlockRange
): Promise<Array<UtxoTransaction>> => {
  const params = getChainParams(chain);
  const response = await gqlClient.query({
    query: params.query,
    variables: {
      address,
      blockRange,
      dateRange: {
        from: null,
        to: null,
      },
      pageNumber: 1,
      pageSize: 1000,
    },
  });

  return map(response.data[params.queryName].transactions.edges, 'node');
};
