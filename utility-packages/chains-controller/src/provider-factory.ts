import { Chain } from '@ctrl-tech/chains-core';
import { EvmProvider } from '@ctrl-tech/chains-evm';
import { SolanaProvider } from '@ctrl-tech/chains-solana';
import { CosmosProvider } from '@ctrl-tech/chains-cosmos';
import { BinanceProvider } from '@ctrl-tech/chains-binance';
import { BitcoinProvider } from '@ctrl-tech/chains-bitcoin';
import { BitcoinCashProvider } from '@ctrl-tech/chains-bitcoincash';
import { DogecoinProvider } from '@ctrl-tech/chains-dogecoin';
import { LitecoinProvider } from '@ctrl-tech/chains-litecoin';
import { ThorProvider } from '@ctrl-tech/chains-thor';

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
    const { dataSourceClassName, ...providerOptions } = options;

    // @ts-ignore
    const dataSource = new ProviderClass.dataSourceList[dataSourceClassName](
      manifest
    );
    return new ProviderClass(dataSource, providerOptions);
  }
}
