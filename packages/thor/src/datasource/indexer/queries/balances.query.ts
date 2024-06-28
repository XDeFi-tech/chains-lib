import { gqlClient } from '@xdefi-tech/chains-core';

import {
  GetMayachainBalancesDocument,
  GetThorchainBalancesDocument,
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
      params.query = GetMayachainBalancesDocument;
      params.queryName = ThorChains.mayachain;
      break;
    case ThorChains.thorchain:
      params.query = GetThorchainBalancesDocument;
      params.queryName = ThorChains.thorchain;
      break;
  }

  return params;
};

export const getBalance = async (chain: string, address: string) => {
  const params = getChainParams(chain);

  if (!params.query) {
    throw new Error('Unsupported thor chain-like chain');
  }

  const response = await gqlClient.query({
    query: params.query,
    variables: {
      address,
    },
  });

  return response.data[params.queryName].balances;
};
