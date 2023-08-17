import React from 'react';
import { ChainController } from '@xdefi-tech/chains-controller';
import {
  EVM_MANIFESTS,
  EvmProvider,
  IndexerDataSource as EvmDataSource,
  ChainDataSource as EVMChainDataSource,
} from '@xdefi-tech/chains-evm';
import WebSigners from '@xdefi-tech/chains-evm/dist/signers/web';
import {
  CosmosProvider,
  ChainDataSource,
  COSMOS_MANIFESTS,
} from '@xdefi-tech/chains-cosmos';
import {
  BTC_MANIFEST,
  BtcProvider,
  IndexerDataSource as BtcIndexerDataSource,
} from '@xdefi-tech/chains-btc';
import BtcSigners from '@xdefi-tech/chains-btc/web';
import {
  BINANCE_MANIFEST,
  BinanceProvider,
  IndexerDataSource as BbcIndexerDataSource,
} from '@xdefi-tech/chains-binance';
import {
  SOLANA_MANIFEST,
  SolanaProvider,
  IndexerDataSource as SolanaIndexerDataSource,
} from '@xdefi-tech/chains-solana';
import {
  THOR_MANIFEST,
  ThorProvider,
  ChainDataSource as ThorChainDataSource,
} from '@xdefi-tech/chains-thor';

export const ChainsContextDefaultValue = new ChainController();

export const initDefaultProviders = () => {
  ChainsContextDefaultValue.addProvider(
    new SolanaProvider(new SolanaIndexerDataSource(SOLANA_MANIFEST))
  );
  ChainsContextDefaultValue.addProvider(
    new BinanceProvider(new BbcIndexerDataSource(BINANCE_MANIFEST))
  );
  ChainsContextDefaultValue.addProvider(
    new BtcProvider(new BtcIndexerDataSource(BTC_MANIFEST), {
      signers: BtcSigners,
    })
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EVMChainDataSource(EVM_MANIFESTS.ethereum), {
      signers: WebSigners,
    })
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.ethereum), {
      signers: WebSigners,
    })
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.binancesmartchain))
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.polygon), {
      signers: WebSigners,
    })
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.avalanche))
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.fantom))
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.arbitrum))
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.aurora))
  );
  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(new ChainDataSource(COSMOS_MANIFESTS.cosmos))
  );
  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(new ChainDataSource(COSMOS_MANIFESTS.kava))
  );
  ChainsContextDefaultValue.addProvider(
    new ThorProvider(new ThorChainDataSource(THOR_MANIFEST))
  );
};

export const CHAINS_DATA_KEY = 'chains-data';

export const restoreProviders = (): boolean => {
  const serialisedData = localStorage.getItem(CHAINS_DATA_KEY);
  if (!serialisedData) {
    return false;
  }
  const parsedData = ChainController.deserialize(serialisedData);
  const providerList = ChainController.providerList;
  Object.values(parsedData).forEach((chainParam) => {
    const provider = providerList.getProvider(
      chainParam.providerClassName,
      chainParam.manifest,
      {
        providerId: chainParam.providerId,
        dataSourceClassName: chainParam.dataSourceClassName,
      }
    );
    ChainsContextDefaultValue.addProvider(provider);
  });
  return true;
};

export const saveProviders = () => {
  const serialisedData = ChainsContextDefaultValue.serialize();
  localStorage.setItem(CHAINS_DATA_KEY, serialisedData);
};

export const ChainsContext = React.createContext<ChainController>(
  ChainsContextDefaultValue
);
