import { gqlClient } from '@ctrl-tech/chains-core';
import {
  CosmosBalanceDocument,
  OsmosisBalanceDocument,
  AxelarBalanceDocument,
  JunoBalanceDocument,
  CrescentBalanceDocument,
  KavaBalanceDocument,
  StargazeBalanceDocument,
  AkashBalanceDocument,
  CronosBalanceDocument,
  KujiraBalanceDocument,
  StrideBalanceDocument,
  MarsBalanceDocument,
  Balance,
} from '@ctrl-tech/chains-graphql';

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
      params.query = CosmosBalanceDocument;
      params.queryName = 'cosmos';
      break;
    case CosmosHubChains.osmosis:
      params.query = OsmosisBalanceDocument;
      params.queryName = 'osmosis';
      break;
    case CosmosHubChains.axelar:
      params.query = AxelarBalanceDocument;
      params.queryName = 'axelar';
      break;
    case CosmosHubChains.juno:
      params.query = JunoBalanceDocument;
      params.queryName = 'juno';
      break;
    case CosmosHubChains.crescent:
      params.query = CrescentBalanceDocument;
      params.queryName = 'crescent';
      break;
    case CosmosHubChains.kava:
      params.query = KavaBalanceDocument;
      params.queryName = 'kava';
      break;
    case CosmosHubChains.stargaze:
      params.query = StargazeBalanceDocument;
      params.queryName = 'stargaze';
      break;
    case CosmosHubChains.akash:
      params.query = AkashBalanceDocument;
      params.queryName = 'akash';
      break;
    case CosmosHubChains.cronos:
      params.query = CronosBalanceDocument;
      params.queryName = 'cronos';
      break;
    case CosmosHubChains.kujira:
      params.query = KujiraBalanceDocument;
      params.queryName = 'kujira';
      break;
    case CosmosHubChains.stride:
      params.query = StrideBalanceDocument;
      params.queryName = 'stride';
      break;
    case CosmosHubChains.mars:
      params.query = MarsBalanceDocument;
      params.queryName = 'mars';
      break;
  }

  return params;
};

export const getBalance = async (
  chain: string,
  address: string
): Promise<Array<Balance>> => {
  const params = getChainParams(chain);

  if (!params.query) {
    throw new Error('Unsupported cosmos hub chain');
  }

  const response = await gqlClient.query({
    query: params.query,
    variables: {
      address,
    },
  });

  return response.data[params.queryName].balances;
};
