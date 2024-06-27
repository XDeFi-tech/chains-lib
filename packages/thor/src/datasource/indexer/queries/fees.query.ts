import { gqlClient } from '@xdefi-tech/chains-core';
import {
  GetMayachainFeeDocument,
  GetThorchainFeeDocument,
} from '@xdefi-tech/chains-graphql';

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
      params.query = GetMayachainFeeDocument;
      params.queryName = ThorChains.mayachain;
      break;
    case ThorChains.thorchain:
      params.query = GetThorchainFeeDocument;
      params.queryName = ThorChains.thorchain;
      break;
  }

  return params;
};

export const getFees = async (chain: string) => {
  const params = getChainParams(chain);

  if (!params.query) {
    throw new Error('Unsupported thor chain-like chain');
  }

  const response = await gqlClient.query({
    query: params.query,
  });

  return response.data[params.queryName].fee;
};
