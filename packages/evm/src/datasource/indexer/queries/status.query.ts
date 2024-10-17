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
  GetGnosisStatusDocument,
  GetBaseStatusDocument,
  GetBlastStatusDocument,
  GetZkSyncStatusDocument,
  GetCeloStatusDocument,
  GetOpBnbStatusDocument,
  GetZetaChainStatusDocument,
  GetMantleStatusDocument,
  GetLineaStatusDocument,
  GetScrollStatusDocument,
} from '../../../gql/graphql';
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
    case EVMChains.gnosis:
      indexerChain = 'gnosis';
      query = GetGnosisStatusDocument;
      break;
    case EVMChains.celo:
      query = GetCeloStatusDocument;
      break;
    case EVMChains.base:
      query = GetBaseStatusDocument;
      break;
    case EVMChains.blast:
      query = GetBlastStatusDocument;
      break;
    case EVMChains.zkSync:
      query = GetZkSyncStatusDocument;
      break;
    case EVMChains.linea:
      query = GetLineaStatusDocument;
      break;
    case EVMChains.mantle:
      query = GetMantleStatusDocument;
      break;
    case EVMChains.opBNB:
      query = GetOpBnbStatusDocument;
      break;
    case EVMChains.zetaChain:
      query = GetZetaChainStatusDocument;
      break;
    case EVMChains.scroll:
      query = GetScrollStatusDocument;
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
