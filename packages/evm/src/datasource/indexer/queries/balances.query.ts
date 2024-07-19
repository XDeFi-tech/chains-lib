import { gqlClient } from '@xdefi-tech/chains-core';
import filter from 'lodash/filter';

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
} from '../../../gql/graphql';
import { EVMChains } from '../../../manifests';

export const getBalance = async (chain: EVMChains, address: string) => {
  let indexerChain: string = chain;
  let query;
  switch (chain) {
    case EVMChains.ethereum:
      query = GetEthereumBalanceDocument;
      break;
    case EVMChains.smartchain:
      indexerChain = 'binanceSmartChain';
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
      indexerChain = 'cantoEVM';
      query = GetCantoEvmBalanceDocument;
      break;
    case EVMChains.optimism:
      query = GetOptimismBalanceDocument;
      break;
    case EVMChains.cronos:
      indexerChain = 'cronosEVM';
      query = GetCronosEvmBalanceDocument;
      break;
    case EVMChains.gnosis:
      indexerChain = 'gnosis';
      query = GetGnosisBalanceDocument;
      break;
    default:
      throw new Error(
        `Unsupported chain: ${chain}. Please check the configuration.`
      );
  }
  const response = await gqlClient.query({
    query: query,
    variables: {
      address,
      first: 100,
    },
  });

  return filter(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.data[indexerChain].balances,
    (b: any) => b.asset.symbol && b.asset.id // cut off balances without asset
  );
};
