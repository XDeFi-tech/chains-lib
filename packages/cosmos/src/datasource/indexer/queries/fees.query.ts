import { gqlClient } from '@xdefi-tech/chains-core';
import {
  GetCosmosFeesDocument,
  GetOsmosisFeesDocument,
  GetAxelarFeesDocument,
  GetJunoFeesDocument,
  GetCrescentFeesDocument,
  GetKavaFeesDocument,
  GetStargazeFeesDocument,
  GetAkashFeesDocument,
  GetCronosFeesDocument,
  GetKujiraFeesDocument,
  GetStrideFeesDocument,
  GetMarsFeesDocument,
  DefaultGasFee,
} from '@xdefi-tech/chains-graphql';

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
      params.query = GetCosmosFeesDocument;
      params.queryName = 'cosmos';
      break;
    case CosmosHubChains.osmosis:
      params.query = GetOsmosisFeesDocument;
      params.queryName = 'osmosis';
      break;
    case CosmosHubChains.axelar:
      params.query = GetAxelarFeesDocument;
      params.queryName = 'axelar';
      break;
    case CosmosHubChains.juno:
      params.query = GetJunoFeesDocument;
      params.queryName = 'juno';
      break;
    case CosmosHubChains.crescent:
      params.query = GetCrescentFeesDocument;
      params.queryName = 'crescent';
      break;
    case CosmosHubChains.kava:
      params.query = GetKavaFeesDocument;
      params.queryName = 'kava';
      break;
    case CosmosHubChains.stargaze:
      params.query = GetStargazeFeesDocument;
      params.queryName = 'stargaze';
      break;
    case CosmosHubChains.akash:
      params.query = GetAkashFeesDocument;
      params.queryName = 'akash';
      break;
    case CosmosHubChains.cronos:
      params.query = GetCronosFeesDocument;
      params.queryName = 'cronos';
      break;
    case CosmosHubChains.kujira:
      params.query = GetKujiraFeesDocument;
      params.queryName = 'kujira';
      break;
    case CosmosHubChains.stride:
      params.query = GetStrideFeesDocument;
      params.queryName = 'stride';
      break;
    case CosmosHubChains.mars:
      params.query = GetMarsFeesDocument;
      params.queryName = 'mars';
      break;
  }

  return params;
};

export const getFees = async (chain: string): Promise<DefaultGasFee> => {
  const params = getChainParams(chain);

  if (!params.query) {
    throw new Error('Unsupported cosmos hub chain');
  }

  const response = await gqlClient.query({
    query: params.query,
  });

  return response.data[params.queryName].fee;
};
