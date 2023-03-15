import { Manifest } from 'core/chain';
import { Coin, GasFee, GasFeeSpeed, Msg, Transaction } from 'core';
import { providers } from 'ethers';
import { Observable } from 'rxjs';
import { FeeData } from 'core/interfaces';

export interface BalanceFilter {
  address: string;
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
  public rpcProvider: providers.StaticJsonRpcProvider;
  public manifest: Manifest;

  constructor(manifest: Manifest) {
    // pass config here, get it in the provider
    this.manifest = manifest;
    this.rpcProvider = new providers.StaticJsonRpcProvider(manifest.rpcURL);
  }

  abstract getBalance(filter: BalanceFilter): Promise<Coin[]>;

  abstract subscribeBalance(filter: BalanceFilter): Promise<Observable<Balance[]>>;

  abstract getTransactions(filter: TransactionsFilter): Promise<Transaction[]>;

  abstract subscribeTransactions(filter: TransactionsFilter): Promise<Observable<Transaction>>;

  abstract estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]>;

  abstract gasFeeOptions(): Promise<GasFee>;

  async getNonce(_address: string): Promise<number> {
    return 0;
  }

  get name(): string {
    return this.constructor.name;
  }
}
