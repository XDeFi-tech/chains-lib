import { gqlClient } from '@xdefi-tech/chains-core';
import map from 'lodash/map';
import {
  GetArbitrumTransactionsDocument,
  GetAuroraTransactionsDocument,
  GetAvalancheTransactionsDocument,
  GetCantoEvmTransactionsDocument,
  GetCronosTransactionsDocument,
  GetEthereumTransactionsDocument,
  GetFantomTransactionsDocument,
  GetOptimismTransactionsDocument,
  GetPolygonTransactionsDocument,
  GetSmartChainTransactionsDocument,
} from '@xdefi-tech/chains-graphql';

import { EVMChains } from '../../../manifests';

export const getTransactions = async (
  chain: EVMChains,
  address: string,
  first = 100
) => {
  let query: any;
  let indexerChain: string = chain;

  switch (chain) {
    case EVMChains.ethereum:
      query = GetEthereumTransactionsDocument;
      break;
    case EVMChains.smartchain:
      indexerChain = 'binanceSmartChain';
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
      indexerChain = 'cantoEVM';
      query = GetCantoEvmTransactionsDocument;
      break;
    case EVMChains.optimism:
      query = GetOptimismTransactionsDocument;
      break;
    case EVMChains.cronos:
      indexerChain = 'cronosEVM';
      query = GetCronosTransactionsDocument;
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
      first: first,
    },
  });

  return map(response.data[indexerChain].transactions.edges, 'node');
};
