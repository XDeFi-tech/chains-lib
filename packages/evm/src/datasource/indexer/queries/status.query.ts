import { gqlClient } from '@xdefi-tech/chains-core';
import {
  GetArbitrumStatusDocument,
  GetAuroraStatusDocument,
  GetAvalancheStatusDocument,
  GetCantoEvmStatusDocument,
  GetCronosEvmStatusDocument,
  GetEthereumStatusDocument,
  GetFantomStatusDocument,
  GetOptimismStatusDocument,
  GetPolygonStatusDocument,
  GetSmartChainStatusDocument,
} from '@xdefi-tech/chains-graphql';

import { EVMChains } from '../../../manifests';

export const getStatus = async (chain: string) => {
  let indexerChain: string = chain;
  let query: any;

  switch (chain) {
    case EVMChains.ethereum:
      query = GetEthereumStatusDocument;
      break;
    case EVMChains.smartchain:
      indexerChain = 'binanceSmartChain';
      query = GetSmartChainStatusDocument;
      break;
    case EVMChains.polygon:
      query = GetPolygonStatusDocument;
      break;
    case EVMChains.avalanche:
      query = GetAvalancheStatusDocument;
      break;
    case EVMChains.fantom:
      query = GetFantomStatusDocument;
      break;
    case EVMChains.arbitrum:
      query = GetArbitrumStatusDocument;
      break;
    case EVMChains.aurora:
      query = GetAuroraStatusDocument;
      break;
    case EVMChains.cantoevm:
      indexerChain = 'cantoEVM';
      query = GetCantoEvmStatusDocument;
      break;
    case EVMChains.optimism:
      query = GetOptimismStatusDocument;
      break;
    case EVMChains.cronos:
      indexerChain = 'cronosEVM';
      query = GetCronosEvmStatusDocument;
      break;
    default:
      throw new Error(
        `Unsupported chain: ${chain}. Please check the configuration.`
      );
  }

  const response = await gqlClient.query({
    query: query,
  });

  return response.data[indexerChain].status;
};
