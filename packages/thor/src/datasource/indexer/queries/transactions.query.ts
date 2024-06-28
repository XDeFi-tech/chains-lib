import { gqlClient } from '@xdefi-tech/chains-core';
import map from 'lodash/map';

import {
  GetMayachainTransactionsDocument,
  GetThorchainTransactionsDocument,
  Scalars,
} from '../../../gql/graphql';
import { ThorChains } from '../../../manifests';

type ThorchainParams = {
  query: any;
  queryName: string;
};

const getChainParams = (chain: string): ThorchainParams => {
  const params: ThorchainParams = {
    query: null,
    queryName: '',
  };

  const formattedChain = chain.toLowerCase();
  switch (formattedChain) {
    case ThorChains.mayachain:
      params.query = GetMayachainTransactionsDocument;
      params.queryName = ThorChains.mayachain;
      break;
    case ThorChains.thorchain:
      params.query = GetThorchainTransactionsDocument;
      params.queryName = ThorChains.thorchain;
      break;
  }

  return params;
};

export const getTransactions = async (
  chain: string,
  address: Scalars['String']
) => {
  const params = getChainParams(chain);

  if (!params.query) {
    throw new Error('Unsupported thor chain-like chain');
  }

  const response = await gqlClient.query({
    query: params.query,
    variables: {
      address,
      first: 500,
    },
  });

  return map(response.data[params.queryName].transactions.edges, 'node');
};
