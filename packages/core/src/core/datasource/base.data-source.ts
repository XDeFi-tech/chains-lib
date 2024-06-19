import { Observable } from 'rxjs';

import { Manifest } from '../chain';
import { Coin, FeeOptions, GasFeeSpeed, Msg, Transaction, TransactionData } from '../../core';
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

  abstract getBalance(filter: BalanceFilter, tokenAddresses?: string[]): Promise<Coin[]>;

  abstract subscribeBalance(filter: BalanceFilter): Promise<Observable<Balance[]>>;

  abstract getTransactions(filter: TransactionsFilter): Promise<Transaction[]>;

  abstract subscribeTransactions(filter: TransactionsFilter): Promise<Observable<Transaction>>;

  abstract estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]>;

  abstract gasFeeOptions(options?: { useFeeService: boolean }): Promise<FeeOptions | null>;

  async getNonce(_address: string): Promise<number> {
    return 0;
  }

  get name(): string {
    return this.constructor.name;
  }

  async getAccount(_address: string): Promise<any> {
    return;
  }

  /**
   * Broadcasts a list of messages. Subclasses should override this method to implement
   * specific logic for broadcasting messages based on the underlying blockchain technology.
   *
   * @param {Msg[]} _msgs Array of messages to be broadcasted.
   * @returns {Promise<Transaction[]>} A promise that resolves to an array of transactions.
   * @throws {Error} Will throw an error if the method is not implemented.
   */
  public async broadcast(_msgs: Msg[]): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  /**
   * Retrieves transaction data based on the transaction hash.
   * This method should be overridden in subclasses to provide specific implementation details.
   *
   * @param {string} _txHash - The hash of the transaction to retrieve.
   * @returns {Promise<TransactionData | null>} The transaction data or null if not found.
   * @throws {Error} Throws an error if the method is not implemented.
   */
  public async getTransaction(_txHash: string): Promise<TransactionData | null> {
    throw new Error('Method not implemented.');
  }
}
