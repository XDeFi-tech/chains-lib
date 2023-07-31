import { gqlClient } from '@xdefi-tech/chains-core';
import {
  GetCosmosTransactionsDocument,
  GetOsmosisTransactionsDocument,
  GetAxelarTransactionsDocument,
  GetJunoTransactionsDocument,
  GetCrescentTransactionsDocument,
  GetKavaTransactionsDocument,
  GetStargazeTransactionsDocument,
  GetAkashTransactionsDocument,
  GetCronosTransactionsDocument,
  GetKujiraTransactionsDocument,
  GetStrideTransactionsDocument,
  GetMarsTransactionsDocument,
  Scalars,
  CosmosLikeTransaction,
} from '@xdefi-tech/chains-graphql';
import { map } from 'lodash';

import { CosmosHubChains } from '../../../manifests';

type CosmosChainParams = {
  query: any;
  queryName: string;
};

const getChainParams = (chain: string): CosmosChainParams => {
  const params: CosmosChainParams = {
    query: null,
    queryName: '',
  };
  const formattedChain = chain.toLowerCase();
  switch (formattedChain) {
    case CosmosHubChains.cosmos:
      params.query = GetCosmosTransactionsDocument;
      params.queryName = 'cosmos';
      break;
    case CosmosHubChains.osmosis:
      params.query = GetOsmosisTransactionsDocument;
      params.queryName = 'osmosis';
      break;
    case CosmosHubChains.axelar:
      params.query = GetAxelarTransactionsDocument;
      params.queryName = 'axelar';
      break;
    case CosmosHubChains.juno:
      params.query = GetJunoTransactionsDocument;
      params.queryName = 'juno';
      break;
    case CosmosHubChains.crescent:
      params.query = GetCrescentTransactionsDocument;
      params.queryName = 'crescent';
      break;
    case CosmosHubChains.kava:
      params.query = GetKavaTransactionsDocument;
      params.queryName = 'kava';
      break;
    case CosmosHubChains.stargaze:
      params.query = GetStargazeTransactionsDocument;
      params.queryName = 'stargaze';
      break;
    case CosmosHubChains.akash:
      params.query = GetAkashTransactionsDocument;
      params.queryName = 'akash';
      break;
    case CosmosHubChains.cronos:
      params.query = GetCronosTransactionsDocument;
      params.queryName = 'cronos';
      break;
    case CosmosHubChains.kujira:
      params.query = GetKujiraTransactionsDocument;
      params.queryName = 'kujira';
      break;
    case CosmosHubChains.stride:
      params.query = GetStrideTransactionsDocument;
      params.queryName = 'stride';
      break;
    case CosmosHubChains.mars:
      params.query = GetMarsTransactionsDocument;
      params.queryName = 'mars';
      break;
  }

  return params;
};

export const getTransactions = async (
  chain: string,
  address: Scalars['String']
): Promise<Array<CosmosLikeTransaction>> => {
  const params = getChainParams(chain);

  if (!params.query) {
    throw new Error('Unsupported cosmos hub chain');
  }

  const response = await gqlClient.query({
    query: params.query,
    variables: {
      address,
      first: 1000,
      dateRange: {
        from: null,
        to: null,
      },
      after: null,
    },
  });

  return map(response.data[params.queryName].transactions.edges, 'node');
};
