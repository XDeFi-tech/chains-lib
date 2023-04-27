import { Chain } from '@xdefi/chains-core';
import { EvmProvider } from '@xdefi/chains-evm';
import { SolanaProvider } from '@xdefi/chains-solana';

export interface ProviderOptions {
  providerId?: string;
  dataSourceClassName: string;
}

export class ProviderList {
  private readonly providerList: {[className: string]: typeof Chain.Provider};

  constructor() {
    this.providerList = {};
  }

  public addProvider(className: string, provider: typeof Chain.Provider) {
    this.providerList[className] =  provider;
  }

  public getProvider(className: string, manifest: Chain.Manifest, options: ProviderOptions): Chain.Provider {
    if (!this.providerList[className]) {
      throw new Error('No provider with specified class name');
    }

    const ProviderClass = this.providerList[className];
    const providerOptions: Chain.IOptions = {};

    const DataSourceClass = ProviderClass.dataSourceList[options.dataSourceClassName];
    if (!DataSourceClass) {
      throw new Error(`Invalid datasource (${options.dataSourceClassName}) for provider: ${className}`)
    }

    if (options.providerId) {
      providerOptions.providerId = options.providerId;
    }

    return new ProviderClass(new DataSourceClass(manifest), providerOptions)
  }
}

export const providerList = new ProviderList();

// add available providers here
providerList.addProvider(EvmProvider.name, EvmProvider);
providerList.addProvider(SolanaProvider.name, SolanaProvider);
