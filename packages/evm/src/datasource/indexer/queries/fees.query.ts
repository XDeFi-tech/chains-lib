import { gqlClient } from '@xdefi-tech/chains-core';

import {
  ArbitrumDefaultGasFeesDocument,
  AuroraDefaultGasFeesDocument,
  AvalancheEip1559GasFeesDocument,
  CantoEvmeip1559GasFeesDocument,
  CronosEvmeip1559GasFeesDocument,
  EthereumEip1559GasFeesDocument,
  FantomEip1559GasFeesDocument,
  OptimismEip1559GasFeesDocument,
  PolygonEip1559GasFeesDocument,
  SmartChainDefaultGasFeesDocument,
  GnosisEip1559GasFeesDocument,
  CeloDefaultGasFeesDocument,
  BaseEip1559GasFeesDocument,
  LineaEip1559GasFeesDocument,
  MantleEip1559GasFeesDocument,
  ZetaChainEip1559GasFeesDocument,
  BlastEip1559GasFeesDocument,
  OpBnbeip1559GasFeesDocument,
  ZkSyncDefaultGasFeesDocument,
  BeamEip1559GasFeesDocument,
  MantaEip1559GasFeesDocument,
} from '../../../gql/graphql';
import { EVM_INDEXER_CHAIN, EVMChains } from '../../../manifests';

export const getFees = async (chain: string) => {
  // if you update this function, make sure to update packages/evm/src/utils/get-fees.ts
  const indexerChain = EVM_INDEXER_CHAIN[chain];
  let query: any;

  switch (chain) {
    case EVMChains.ethereum:
      query = EthereumEip1559GasFeesDocument;
      break;
    case EVMChains.smartchain:
      query = SmartChainDefaultGasFeesDocument;
      break;
    case EVMChains.polygon:
      query = PolygonEip1559GasFeesDocument;
      break;
    case EVMChains.avalanche:
      query = AvalancheEip1559GasFeesDocument;
      break;
    case EVMChains.fantom:
      query = FantomEip1559GasFeesDocument;
      break;
    case EVMChains.arbitrum:
      query = ArbitrumDefaultGasFeesDocument;
      break;
    case EVMChains.aurora:
      query = AuroraDefaultGasFeesDocument;
      break;
    case EVMChains.cantoevm:
      query = CantoEvmeip1559GasFeesDocument;
      break;
    case EVMChains.optimism:
      query = OptimismEip1559GasFeesDocument;
      break;
    case EVMChains.cronos:
      query = CronosEvmeip1559GasFeesDocument;
      break;
    case EVMChains.gnosis:
      query = GnosisEip1559GasFeesDocument;
      break;
    case EVMChains.celo:
      query = CeloDefaultGasFeesDocument;
      break;
    case EVMChains.base:
      query = BaseEip1559GasFeesDocument;
      break;
    case EVMChains.linea:
      query = LineaEip1559GasFeesDocument;
      break;
    case EVMChains.blast:
      query = BlastEip1559GasFeesDocument;
      break;
    case EVMChains.mantle:
      query = MantleEip1559GasFeesDocument;
      break;
    case EVMChains.opBNB:
      query = OpBnbeip1559GasFeesDocument;
      break;
    case EVMChains.zkSync:
      query = ZkSyncDefaultGasFeesDocument;
      break;
    case EVMChains.zetaChain:
      query = ZetaChainEip1559GasFeesDocument;
      break;
    case EVMChains.beam:
      query = BeamEip1559GasFeesDocument;
      break;
    case EVMChains.manta:
      query = MantaEip1559GasFeesDocument;
      break;
    default:
      throw new Error(
        `Unsupported chain: ${chain}. Please check the configuration.`
      );
  }

  const response = await gqlClient.query({
    query,
    fetchPolicy: 'no-cache',
  });

  return response.data[indexerChain].fee;
};
