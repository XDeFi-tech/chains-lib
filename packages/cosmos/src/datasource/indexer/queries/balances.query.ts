import { gqlClient } from '@xdefi-tech/chains-core';
import gql from 'graphql-tag';
import { capitalize } from 'lodash';

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
  TerraBalanceDocument,
  SeiBalanceDocument,
  Balance,
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
      params.query = CosmosBalanceDocument;
      break;
    case CosmosHubChains.osmosis:
      params.query = OsmosisBalanceDocument;
      break;
    case CosmosHubChains.axelar:
      params.query = AxelarBalanceDocument;
      break;
    case CosmosHubChains.juno:
      params.query = JunoBalanceDocument;
      break;
    case CosmosHubChains.crescent:
      params.query = CrescentBalanceDocument;
      break;
    case CosmosHubChains.kava:
      params.query = KavaBalanceDocument;
      break;
    case CosmosHubChains.stargaze:
      params.query = StargazeBalanceDocument;
      break;
    case CosmosHubChains.akash:
      params.query = AkashBalanceDocument;
      break;
    case CosmosHubChains.cronos:
      params.query = CronosBalanceDocument;
      break;
    case CosmosHubChains.kujira:
      params.query = KujiraBalanceDocument;
      break;
    case CosmosHubChains.stride:
      params.query = StrideBalanceDocument;
      break;
    case CosmosHubChains.mars:
      params.query = MarsBalanceDocument;
      break;
    case CosmosHubChains.terra:
      params.query = TerraBalanceDocument;
      break;
    case CosmosHubChains.sei:
      params.query = SeiBalanceDocument;
      break;
    default:
      if (params.queryName) {
        params.query = gql`
          query GetC${capitalize(chain)}Balance($address: String!) {
            ${params.queryName} {
              balances(address: $address) {
                address
                amount {
                  value
                }
                asset {
                  categories
                  type
                  chain
                  contract
                  decimals
                  id
                  image
                  name
                  price {
                    amount
                    scalingFactor
                    dayPriceChange
                  }
                  symbol
                }
              }
            }
          }
        `;
      }
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
