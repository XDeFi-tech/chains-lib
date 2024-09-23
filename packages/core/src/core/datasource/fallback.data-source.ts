import { Manifest } from '../chain';
import { Msg } from '../msg';
import { GasFeeSpeed } from '../fee';

import { BalanceFilter, DataSource, TransactionsFilter } from './base.data-source';

export interface FallbackDataSourceOptions {
  attempts: number;
}

export class FallbackDataSource extends DataSource {
  public attempts: number;
  public currentProviderIndex: number;
  public providers: DataSource[];

  constructor(manifest: Manifest, options: FallbackDataSourceOptions, ...providers: DataSource[]) {
    super(manifest);
    if (providers.length === 0) {
      throw new Error('At least one provider is required');
    }
    this.attempts = options.attempts;
    this.currentProviderIndex = 0;
    this.providers = providers;
  }

  getProvider(): DataSource {
    if (this.attempts > 5) {
      this.attempts = 0;
      this.currentProviderIndex++;
      if (this.providers[this.currentProviderIndex] === undefined) {
        this.currentProviderIndex = 0;
      }
    }

    return this.providers[this.currentProviderIndex];
  }

  async getNFTBalance(address: string) {
    try {
      return await this.getProvider().getNFTBalance(address);
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async getBalance(filter: BalanceFilter, tokenAddresses?: string[]) {
    try {
      return await this.getProvider().getBalance(filter, tokenAddresses);
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async subscribeBalance(filter: BalanceFilter) {
    try {
      return await this.getProvider().subscribeBalance(filter);
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async getTransactions(filter: TransactionsFilter) {
    try {
      return await this.getProvider().getTransactions(filter);
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async subscribeTransactions(filter: TransactionsFilter) {
    try {
      return await this.getProvider().subscribeTransactions(filter);
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed) {
    try {
      return await this.getProvider().estimateFee(msgs, speed);
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async gasFeeOptions() {
    try {
      return await this.getProvider().gasFeeOptions();
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async getNonce(address: string) {
    try {
      return await this.getProvider().getNonce(address);
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  async getAccount(address: string) {
    try {
      if (this.getProvider().getAccount) {
        return await this.getProvider().getAccount(address);
      }
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }

  get name(): string {
    return `${this.constructor.name},${this.providers.map((provider) => provider.name).join(',')}`;
  }

  async getAccountResource(address: string) {
    try {
      if (this.getProvider().getAccountResource) {
        return await this.getProvider().getAccountResource(address);
      }
    } catch (err) {
      this.attempts++;
      throw err;
    }
  }
}
