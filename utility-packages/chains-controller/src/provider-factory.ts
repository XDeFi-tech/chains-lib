import { Chain } from '@xdefi-tech/chains-core';
import { EvmProvider } from '@xdefi-tech/chains-evm';
import { SolanaProvider } from '@xdefi-tech/chains-solana';
import { CosmosProvider } from '@xdefi-tech/chains-cosmos';
import { UtxoProvider } from '@xdefi-tech/chains-btc';

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
  UTXOProvider = 'UTXOProvider',
}

export type AvailableProviders =
  | typeof EvmProvider
  | typeof SolanaProvider
  | typeof CosmosProvider
  | typeof UtxoProvider;

export class ProviderFactory {
  private readonly providerList: {
    [className in ProviderNames]: AvailableProviders;
  };

  constructor() {
    this.providerList = {
      [ProviderNames.EvmProvider]: EvmProvider,
      [ProviderNames.SolanaProvider]: SolanaProvider,
      [ProviderNames.CosmosProvider]: CosmosProvider,
      [ProviderNames.UTXOProvider]: UtxoProvider,
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
    const providerOptions: Chain.IOptions = {};

    const DataSourceClass =
      ProviderClass.dataSourceList[options.dataSourceClassName];
    if (!DataSourceClass) {
      throw new Error(
        `Invalid datasource (${options.dataSourceClassName}) for provider: ${className}`
      );
    }

    if (options.providerId) {
      providerOptions.providerId = options.providerId;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dataSource = new DataSourceClass(manifest);
    return new ProviderClass(dataSource, providerOptions);
  }
}
