import React from 'react';
import { ChainController } from '@ctrl-tech/chains-controller';
import { EVM_MANIFESTS, EvmProvider } from '@ctrl-tech/chains-evm';
import { COSMOS_MANIFESTS, CosmosProvider } from '@ctrl-tech/chains-cosmos';
import { BINANCE_MANIFEST, BinanceProvider } from '@ctrl-tech/chains-binance';
import { SOLANA_MANIFEST, SolanaProvider } from '@ctrl-tech/chains-solana';
import { THORCHAIN_MANIFESTS, ThorProvider } from '@ctrl-tech/chains-thor';
import { BITCOIN_MANIFEST, BitcoinProvider } from '@ctrl-tech/chains-bitcoin';
import {
  LITECOIN_MANIFEST,
  LitecoinProvider,
} from '@ctrl-tech/chains-litecoin';
import {
  DOGECOIN_MANIFEST,
  DogecoinProvider,
} from '@ctrl-tech/chains-dogecoin';
import {
  BITCOINCASH_MANIFEST,
  BitcoinCashProvider,
} from '@ctrl-tech/chains-bitcoincash';

export const ChainsContextDefaultValue = new ChainController();

export const initDefaultProviders = () => {
  ChainsContextDefaultValue.addProvider(
    // 0
    new SolanaProvider(
      new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST),
      {
        providerId: 'solana',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new BinanceProvider(
      new BinanceProvider.dataSourceList.IndexerDataSource(BINANCE_MANIFEST),
      {
        providerId: 'binance',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.ethereum),
      {
        providerId: 'ethereum',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.ChainDataSource({
        ...EVM_MANIFESTS.ethereum,
        name: `${EVM_MANIFESTS.ethereum.name} chain`,
      }),
      {
        providerId: 'ethereum-chain',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    //5
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(
        EVM_MANIFESTS.smartchain
      ),
      {
        providerId: 'smartchain',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.ChainDataSource({
        ...EVM_MANIFESTS.smartchain,
        name: `${EVM_MANIFESTS.smartchain.name} chain`,
      }),
      {
        providerId: 'smartchain-chain',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.polygon),
      {
        providerId: 'polygon',
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.ChainDataSource({
        ...EVM_MANIFESTS.polygon,
        name: `${EVM_MANIFESTS.polygon.name} chain`,
      }),
      {
        providerId: 'polygon-chain',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.avalanche),
      {
        providerId: 'avalanche',
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.ChainDataSource({
        ...EVM_MANIFESTS.avalanche,
        name: `${EVM_MANIFESTS.avalanche.name} chain`,
      }),
      {
        providerId: 'avalanche-chain',
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.fantom),
      {
        providerId: 'fantom',
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.ChainDataSource({
        ...EVM_MANIFESTS.fantom,
        name: `${EVM_MANIFESTS.fantom.name} chain`,
      }),
      {
        providerId: 'fantom-chain',
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.arbitrum),
      {
        providerId: 'arbitrum',
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.ChainDataSource({
        ...EVM_MANIFESTS.arbitrum,
        name: `${EVM_MANIFESTS.arbitrum.name} chain`,
      }),
      {
        providerId: 'arbitrum-chain',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    // 10
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.aurora),
      {
        providerId: 'aurora',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.ChainDataSource({
        ...EVM_MANIFESTS.aurora,
        name: `${EVM_MANIFESTS.aurora.name} chain`,
      }),
      {
        providerId: 'aurora-chain',
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(
      new CosmosProvider.dataSourceList.ChainDataSource(
        COSMOS_MANIFESTS.cosmos
      ),
      {
        providerId: 'cosmos',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(
      new CosmosProvider.dataSourceList.ChainDataSource(COSMOS_MANIFESTS.kava),
      {
        providerId: 'kava',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new ThorProvider(
      new ThorProvider.dataSourceList.ChainDataSource(
        THORCHAIN_MANIFESTS.thorchain
      ),
      {
        providerId: 'thor',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new BitcoinProvider(
      new BitcoinProvider.dataSourceList.IndexerDataSource(BITCOIN_MANIFEST),
      {
        providerId: 'bitcoin',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new LitecoinProvider(
      new LitecoinProvider.dataSourceList.IndexerDataSource(LITECOIN_MANIFEST),
      {
        providerId: 'litecoin',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new DogecoinProvider(
      new DogecoinProvider.dataSourceList.IndexerDataSource(DOGECOIN_MANIFEST),
      {
        providerId: 'dogecoin',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new BitcoinCashProvider(
      new BitcoinCashProvider.dataSourceList.IndexerDataSource(
        BITCOINCASH_MANIFEST
      ),
      {
        providerId: 'bitcoincash',
      }
    )
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
    if (provider) {
      ChainsContextDefaultValue.addProvider(provider);
    }
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
