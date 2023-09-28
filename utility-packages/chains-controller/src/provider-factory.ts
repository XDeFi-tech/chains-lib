import { Chain } from '@xdefi-tech/chains-core';
import { EvmProvider } from '@xdefi-tech/chains-evm';
import { SolanaProvider } from '@xdefi-tech/chains-solana';
import { CosmosProvider } from '@xdefi-tech/chains-cosmos';
import { BinanceProvider } from '@xdefi-tech/chains-binance';
import { BitcoinProvider } from '@xdefi-tech/chains-bitcoin';
import { BitcoinCashProvider } from '@xdefi-tech/chains-bitcoincash';
import { DogecoinProvider } from '@xdefi-tech/chains-dogecoin';
import { LitecoinProvider } from '@xdefi-tech/chains-litecoin';
import { ThorProvider } from '@xdefi-tech/chains-thor';

export enum DataSourceNames {
  IndexerDataSource = 'IndexerDataSource',
  ChainDataSource = 'ChainDataSource',
}

export interface ProviderOptions {
  providerId?: string;
  dataSourceClassName: DataSourceNames | string;
}

export enum ProviderNames {
  EvmProvider = 'EvmProvider',
  SolanaProvider = 'SolanaProvider',
  CosmosProvider = 'CosmosProvider',
  BinanceProvider = 'BinanceProvider',
  BitcoinProvider = 'BitcoinProvider',
  BitcoinCashProvider = 'BitcoinCashProvider',
  DogecoinProvider = 'DogecoinProvider',
  LitecoinProvider = 'LitecoinProvider',
  ThorProvider = 'ThorProvider',
}

export type AvailableProviders =
  | typeof EvmProvider
  | typeof SolanaProvider
  | typeof CosmosProvider
  | typeof BinanceProvider
  | typeof BitcoinProvider
  | typeof BitcoinCashProvider
  | typeof DogecoinProvider
  | typeof LitecoinProvider
  | typeof ThorProvider;

export class ProviderFactory {
  private readonly providerList: {
    [className in ProviderNames]: AvailableProviders;
  };

  constructor() {
    this.providerList = {
      [ProviderNames.EvmProvider]: EvmProvider,
      [ProviderNames.SolanaProvider]: SolanaProvider,
      [ProviderNames.CosmosProvider]: CosmosProvider,
      [ProviderNames.BinanceProvider]: BinanceProvider,
      [ProviderNames.BitcoinProvider]: BitcoinProvider,
      [ProviderNames.BitcoinCashProvider]: BitcoinCashProvider,
      [ProviderNames.DogecoinProvider]: DogecoinProvider,
      [ProviderNames.LitecoinProvider]: LitecoinProvider,
      [ProviderNames.ThorProvider]: ThorProvider,
    };
  }

  public getProvider(
    className: string,
    manifest: Chain.Manifest,
    options: ProviderOptions
  ): Chain.Provider {
    if (!this.providerList[className as ProviderNames]) {
      throw new Error('No provider with specified class name');
    }

    const ProviderClass = this.providerList[className as ProviderNames];
    const { dataSourceClassName, ...providerOptions }  = options;

    // @ts-ignore
    const dataSource = new ProviderClass.dataSourceList[dataSourceClassName](manifest);
    return new ProviderClass(dataSource, providerOptions);
  }
}
