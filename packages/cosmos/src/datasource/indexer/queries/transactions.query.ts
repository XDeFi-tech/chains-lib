import { gqlClient } from '@xdefi-tech/chains-core';
import { capitalize, map } from 'lodash';
import gql from 'graphql-tag';

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
      params.query = GetCosmosTransactionsDocument;
      break;
    case CosmosHubChains.osmosis:
      params.query = GetOsmosisTransactionsDocument;
      break;
    case CosmosHubChains.axelar:
      params.query = GetAxelarTransactionsDocument;
      break;
    case CosmosHubChains.juno:
      params.query = GetJunoTransactionsDocument;
      break;
    case CosmosHubChains.crescent:
      params.query = GetCrescentTransactionsDocument;
      break;
    case CosmosHubChains.kava:
      params.query = GetKavaTransactionsDocument;
      break;
    case CosmosHubChains.stargaze:
      params.query = GetStargazeTransactionsDocument;
      break;
    case CosmosHubChains.akash:
      params.query = GetAkashTransactionsDocument;
      break;
    case CosmosHubChains.cronos:
      params.query = GetCronosTransactionsDocument;
      break;
    case CosmosHubChains.kujira:
      params.query = GetKujiraTransactionsDocument;
      break;
    case CosmosHubChains.stride:
      params.query = GetStrideTransactionsDocument;
      break;
    case CosmosHubChains.mars:
      params.query = GetMarsTransactionsDocument;
      break;
    default:
      if (params.queryName) {
        params.query = gql`
          query GetC${capitalize(chain)}Transactions(
          $address: String!
          $blockRange: OptBlockRange!
          $first: Int!
          $after: String
        ) {
          ${params.queryName} {
            transactions(
              address: $address
              blockRange: $blockRange
              first: $first
              after: $after
            ) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  blockHeight
                  blockIndex
                  hash
                  status
                  transfers {
                    amount {
                      value
                    }
                    asset {
                      chain
                      contract
                      name
                      symbol
                      image
                      decimals
                    }
                    fromAddress
                    toAddress
                  }
                  timestamp
                  fee {
                    amount {
                      amount {
                        value
                      }
                      asset {
                        chain
                        contract
                        decimals
                        id
                        image
                        name
                        symbol
                        price {
                          amount
                        }
                      }
                    }
                    payer
                  }
                  signers
                }
              }
            }
          }
        }
      `;
      }
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
