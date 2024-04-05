import { Observable } from 'rxjs';

import { Manifest } from '../chain';
import { Coin, FeeOptions, GasFeeSpeed, Msg, Transaction } from '../../core';
import { FeeData } from '../interfaces';

export interface BalanceFilter {
  address: string;
  afterBlock?: number | string;
}

export interface TransactionsFilter {
  address: string;
  afterBlock?: number | string;
}

export interface Balance {
  asset: {
    chain: string;
    contract: string;
  };
  amount: {
    value: number;
    scalingFactor: number;
  };
  address: string;
}

export interface BalancesData {
  ethereumBalances: Balance[];
}

export abstract class DataSource {
  // Share base chain & call methods without any code
  public rpcProvider: any;
  public manifest: Manifest;

  constructor(manifest: Manifest) {
    // pass config here, get it in the provider
    this.manifest = manifest;
  }

  abstract getNFTBalance(address: string): Promise<any>;

  abstract getBalance(filter: BalanceFilter): Promise<Coin[]>;

  abstract getBalance(filter: BalanceFilter, tokenAddresses: string[]): Promise<Coin[]>;

  abstract subscribeBalance(filter: BalanceFilter): Promise<Observable<Balance[]>>;

  abstract getTransactions(filter: TransactionsFilter): Promise<Transaction[]>;

  abstract subscribeTransactions(filter: TransactionsFilter): Promise<Observable<Transaction>>;

  abstract estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]>;

  abstract gasFeeOptions(): Promise<FeeOptions | null>;

  async getNonce(_address: string): Promise<number> {
    return 0;
  }

  get name(): string {
    return this.constructor.name;
  }
}
