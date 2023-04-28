import React from 'react';
import { ChainController } from '@xdefi/chains-controller';
import {
  EVM_MANIFESTS,
  EvmProvider,
  IndexerDataSource as EvmDataSource,
} from '@xdefi/chains-evm';
import WebSigners from '@xdefi/chains-evm/dist/signers/web';

export const ChainsContextDefaultValue = new ChainController();

export const initDefaultProviders = () => {
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(new EvmDataSource(EVM_MANIFESTS.ethereum), {
      signers: WebSigners,
    })
  );
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
