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
  GetTerraFeesDocument,
  GetSeiFeesDocument,
  DefaultGasFee,
} from '../../../gql/graphql';
import { COSMOS_INDEXER_CHAIN, CosmosHubChains } from '../../../manifests';

type CosmosChainParams = {
  query: any;
  queryName: string;
};

const getChainParams = (chain: string): CosmosChainParams => {
  const params: CosmosChainParams = {
    query: null,
    queryName: COSMOS_INDEXER_CHAIN[chain],
  };
  const formattedChain = chain.toLowerCase();
  switch (formattedChain) {
    case CosmosHubChains.cosmos:
      params.query = GetCosmosFeesDocument;
      break;
    case CosmosHubChains.osmosis:
      params.query = GetOsmosisFeesDocument;
      break;
    case CosmosHubChains.axelar:
      params.query = GetAxelarFeesDocument;
      break;
    case CosmosHubChains.juno:
      params.query = GetJunoFeesDocument;
      break;
    case CosmosHubChains.crescent:
      params.query = GetCrescentFeesDocument;
      break;
    case CosmosHubChains.kava:
      params.query = GetKavaFeesDocument;
      break;
    case CosmosHubChains.stargaze:
      params.query = GetStargazeFeesDocument;
      break;
    case CosmosHubChains.akash:
      params.query = GetAkashFeesDocument;
      break;
    case CosmosHubChains.cronos:
      params.query = GetCronosFeesDocument;
      break;
    case CosmosHubChains.kujira:
      params.query = GetKujiraFeesDocument;
      break;
    case CosmosHubChains.stride:
      params.query = GetStrideFeesDocument;
      break;
    case CosmosHubChains.mars:
      params.query = GetMarsFeesDocument;
      break;
    case CosmosHubChains.terra:
      params.query = GetTerraFeesDocument;
      break;
    case CosmosHubChains.sei:
      params.query = GetSeiFeesDocument;
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
