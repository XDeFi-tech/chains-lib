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
} from '@xdefi-tech/chains-graphql';

import { EVMChains } from '../../../manifests';

export const getFees = async (chain: string) => {
  let indexerChain = chain;
  let query: any;

  switch (chain) {
    case EVMChains.ethereum:
      query = EthereumEip1559GasFeesDocument;
      break;
    case EVMChains.smartchain:
      indexerChain = 'binanceSmartChain';
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
      indexerChain = 'cantoEVM';
      query = CantoEvmeip1559GasFeesDocument;
      break;
    case EVMChains.optimism:
      query = OptimismEip1559GasFeesDocument;
      break;
    case EVMChains.cronos:
      indexerChain = 'cronosEVM';
      query = CronosEvmeip1559GasFeesDocument;
      break;
    default:
      throw new Error(
        `Unsupported chain: ${chain}. Please check the configuration.`
      );
  }

  const response = await gqlClient.query({
    query,
  });

  return response.data[indexerChain].fee;
};
