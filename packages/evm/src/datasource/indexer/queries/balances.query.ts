import { gqlClient } from '@xdefi-tech/chains-core';
import filter from 'lodash/filter';
import gql from 'graphql-tag';
import { capitalize } from 'lodash';

import {
  GetArbitrumBalanceDocument,
  GetAuroraBalanceDocument,
  GetAvalancheBalanceDocument,
  GetEthereumBalanceDocument,
  GetFantomBalanceDocument,
  GetOptimismBalanceDocument,
  GetPolygonBalanceDocument,
  GetSmartChainBalanceDocument,
  GetCronosEvmBalanceDocument,
  GetCantoEvmBalanceDocument,
  GetGnosisBalanceDocument,
  GetCeloBalanceDocument,
  GetScrollBalanceDocument,
  GetMantleBalanceDocument,
  GetOpBnbBalanceDocument,
  GetBaseBalanceDocument,
  GetLineaBalanceDocument,
  GetBlastBalanceDocument,
  GetZkSyncBalanceDocument,
  GetZetaChainBalanceDocument,
} from '../../../gql/graphql';
import { EVM_INDEXER_CHAIN, EVMChains } from '../../../manifests';

export interface ICacheOpt {
  forceTokenDiscovery?: boolean | null;
  extraTokens?: string[] | null;
}

export const getBalance = async (
  chain: EVMChains,
  address: string,
  tokenAddresses: string[] | null = null,
  first = 100,
  after = '',
  cacheOpt: ICacheOpt | null = null
) => {
  const indexerChain: string = EVM_INDEXER_CHAIN[chain];
  let query;
  switch (chain) {
    case EVMChains.ethereum:
      query = GetEthereumBalanceDocument;
      break;
    case EVMChains.smartchain:
      query = GetSmartChainBalanceDocument;
      break;
    case EVMChains.polygon:
      query = GetPolygonBalanceDocument;
      break;
    case EVMChains.avalanche:
      query = GetAvalancheBalanceDocument;
      break;
    case EVMChains.fantom:
      query = GetFantomBalanceDocument;
      break;
    case EVMChains.arbitrum:
      query = GetArbitrumBalanceDocument;
      break;
    case EVMChains.aurora:
      query = GetAuroraBalanceDocument;
      break;
    case EVMChains.cantoevm:
      query = GetCantoEvmBalanceDocument;
      break;
    case EVMChains.optimism:
      query = GetOptimismBalanceDocument;
      break;
    case EVMChains.cronos:
      query = GetCronosEvmBalanceDocument;
      break;
    case EVMChains.gnosis:
      query = GetGnosisBalanceDocument;
      break;
    case EVMChains.celo:
      query = GetCeloBalanceDocument;
      break;
    case EVMChains.scroll:
      query = GetScrollBalanceDocument;
      break;
    case EVMChains.mantle:
      query = GetMantleBalanceDocument;
      break;
    case EVMChains.opBNB:
      query = GetOpBnbBalanceDocument;
      break;
    case EVMChains.base:
      query = GetBaseBalanceDocument;
      break;
    case EVMChains.linea:
      query = GetLineaBalanceDocument;
      break;
    case EVMChains.blast:
      query = GetBlastBalanceDocument;
      break;
    case EVMChains.zkSync:
      query = GetZkSyncBalanceDocument;
      break;
    case EVMChains.zetaChain:
      query = GetZetaChainBalanceDocument;
      break;
    default:
      if (indexerChain) {
        query = gql`
          query Get${capitalize(
            chain
          )}Balance ($address: String!, $tokenAddresses: [String!], $cacheOpt: CacheOptTknBalanceV0Input, $first: Int, $after: String) {
            ${indexerChain} {
              balances( address: $address, tokenAddresses: $tokenAddresses, cacheOpt: $cacheOpt, first: $first, after: $after) {
                address
                asset {
                  categories
                  type
                  symbol
                  contract
                  id
                  name
                  image
                  chain
                  decimals
                  price {
                    amount
                    dayPriceChange
                  }
                }
                amount {
                  value
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
      first,
      after,
      tokenAddresses,
      cacheOpt,
    },
  });

  return filter(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.data[indexerChain].balances,
    (b: any) => b.asset.symbol && b.asset.id // cut off balances without asset
  );
};
