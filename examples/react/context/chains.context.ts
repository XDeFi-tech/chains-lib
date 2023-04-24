import React from 'react';
import { ChainController } from '@xdefi/chains-core';
import {
  EVM_MANIFESTS,
  EvmProvider,
  IndexerDataSource as EvmDataSource,
} from '@xdefi/chains-evm';
import WebSigners from '@xdefi/chains-evm/dist/signers/web';

export const ChainsContextDefaultValue = new ChainController();

const availableProviderList = {
  EvmProvider: EvmProvider,
};

export const initDefaultProviders = () => {
  // init all needed providers
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.ethereum), {
      signers: WebSigners,
    })
  );
  // ChainsContextDefaultValue.addProvider(
  //   new SolanaProvider(new SolanaDataSource(SolanaManifest))
  // )
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.binancesmartchain))
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.polygon))
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
};

export const CHAINS_DATA_KEY = 'chains-data';

export const restoreProviders = (): boolean => {
  const serialisedData = localStorage.getItem(CHAINS_DATA_KEY);
  if (!serialisedData) {
    return false;
  }
  const parsedData = ChainController.deserialize(serialisedData);
  Object.values(parsedData).forEach((chainParam) => {
    // get provider form available list
    const ProviderClass = availableProviderList[chainParam.providerClassName];
    // get provider's data source (indexer or chain)
    const DataSourceClass =
      ProviderClass.dataSources[chainParam.dataSourceClassName];

    // TODO figure out how to store and restore signers

    ChainsContextDefaultValue.addProvider(
      new ProviderClass(new DataSourceClass(chainParam.manifest), {
        providerId: chainParam.providerId,
      })
    );
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
