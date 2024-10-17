import { gqlClient } from '@xdefi-tech/chains-core';
import map from 'lodash/map';
import gql from 'graphql-tag';
import { capitalize } from 'lodash';

import {
  GetArbitrumTransactionsDocument,
  GetAuroraTransactionsDocument,
  GetAvalancheTransactionsDocument,
  GetCantoEvmTransactionsDocument,
  GetCronosEvmTransactionsDocument,
  GetEthereumTransactionsDocument,
  GetFantomTransactionsDocument,
  GetOptimismTransactionsDocument,
  GetPolygonTransactionsDocument,
  GetSmartChainTransactionsDocument,
  GetGnosisTransactionsDocument,
  GetBaseTransactionsDocument,
  GetBlastTransactionsDocument,
  GetZkSyncTransactionsDocument,
  GetCeloTransactionsDocument,
  GetMantleTransactionsDocument,
  GetLineaTransactionsDocument,
  GetZetaChainTransactionsDocument,
  GetOpBnbTransactionsDocument,
  GetScrollTransactionsDocument,
} from '../../../gql/graphql';
import { EVM_INDEXER_CHAIN, EVMChains } from '../../../manifests';

export const getTransactions = async (
  chain: EVMChains,
  address: string,
  first = 100
) => {
  let query: any;
  const indexerChain = EVM_INDEXER_CHAIN[chain];

  switch (chain) {
    case EVMChains.ethereum:
      query = GetEthereumTransactionsDocument;
      break;
    case EVMChains.smartchain:
      query = GetSmartChainTransactionsDocument;
      break;
    case EVMChains.polygon:
      query = GetPolygonTransactionsDocument;
      break;
    case EVMChains.avalanche:
      query = GetAvalancheTransactionsDocument;
      break;
    case EVMChains.fantom:
      query = GetFantomTransactionsDocument;
      break;
    case EVMChains.arbitrum:
      query = GetArbitrumTransactionsDocument;
      break;
    case EVMChains.aurora:
      query = GetAuroraTransactionsDocument;
      break;
    case EVMChains.cantoevm:
      query = GetCantoEvmTransactionsDocument;
      break;
    case EVMChains.optimism:
      query = GetOptimismTransactionsDocument;
      break;
    case EVMChains.cronos:
      query = GetCronosEvmTransactionsDocument;
      break;
    case EVMChains.gnosis:
      query = GetGnosisTransactionsDocument;
      break;
    case EVMChains.celo:
      query = GetCeloTransactionsDocument;
      break;
    case EVMChains.base:
      query = GetBaseTransactionsDocument;
      break;
    case EVMChains.blast:
      query = GetBlastTransactionsDocument;
      break;
    case EVMChains.zkSync:
      query = GetZkSyncTransactionsDocument;
      break;
    case EVMChains.linea:
      query = GetLineaTransactionsDocument;
      break;
    case EVMChains.mantle:
      query = GetMantleTransactionsDocument;
      break;
    case EVMChains.opBNB:
      query = GetOpBnbTransactionsDocument;
      break;
    case EVMChains.zetaChain:
      query = GetZetaChainTransactionsDocument;
      break;
    case EVMChains.scroll:
      query = GetScrollTransactionsDocument;
      break;
    default:
      if (indexerChain) {
        query = gql`
          query Get${capitalize(
            chain
          )}Transactions($address: String!, $first: Int) {
            ${indexerChain} {
              transactions(address: $address, first: $first) {
                pageInfo {
                  endCursor
                  hasNextPage
                }
                edges {
                  node {
                    hash
                    blockIndex
                    blockNumber
                    status
                    value
                    timestamp
                    fromAddress
                    transfers {
                      amount {
                        value
                      }
                      asset {
                        ... on CryptoAsset {
                          chain
                          contract
                          decimals
                          id
                          image
                          name
                          price {
                            amount
                            scalingFactor
                          }
                          symbol
                        }
                      }
                      fromAddress
                      toAddress
                    }
                  }
                }
              }
            }
          }
        `;
      } else {
        throw new Error(
          `Unsupported chain: ${chain}. Please check the configuration.`
        );
      }
  }

  const response = await gqlClient.query({
    query: query,
    variables: {
      address,
      first: first,
    },
  });

  return map(response.data[indexerChain].transactions.edges, 'node');
};
