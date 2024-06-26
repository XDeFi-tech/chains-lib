import {
  Balance,
  Chain,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  MsgEncoding,
  Response,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import axios, { Axios } from 'axios';

import { ChainMsg, MsgBody } from './msg';
import { UTXOManifest } from './manifests';
import { UTXO } from './data-provider';

export interface UtxoProviderOptions extends Chain.IOptions {
  apiKey?: string;
}

export class UtxoProvider extends Chain.Provider {
  public rpcProvider = null;
  public rest: Axios;

  constructor(dataSource: DataSource, options?: UtxoProviderOptions) {
    super(dataSource, options);
    const manifest = this.manifest as UTXOManifest;
    this.rest = axios.create({
      baseURL: manifest.rpcURL,
    });
  }

  createMsg(
    data: MsgBody,
    encoding: MsgEncoding = MsgEncoding.object
  ): ChainMsg {
    return new ChainMsg(data, this, encoding);
  }

  async getTransactions(
    address: string,
    afterBlock?: number | string
  ): Promise<Response<Transaction[], Transaction>> {
    return new Response(
      () => this.dataSource.getTransactions({ address, afterBlock }),
      () => this.dataSource.subscribeTransactions({ address })
    );
  }

  async estimateFee(
    messages: ChainMsg[],
    speed: GasFeeSpeed
  ): Promise<FeeData[]> {
    return this.dataSource.estimateFee(messages, speed);
  }

  async getNFTBalance(address: string) {
    return this.dataSource.getNFTBalance(address);
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return this.dataSource.gasFeeOptions();
  }

  async getNonce(address: string): Promise<number> {
    return this.dataSource.getNonce(address);
  }

  async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
    return this.dataSource.broadcast(messages);
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    return this.dataSource.getTransaction(txHash);
  }

  public get manifest(): UTXOManifest {
    return this.dataSource.manifest as UTXOManifest;
  }

  /**
   * Scans for UTXOs associated with a given address. This method should be overridden in subclasses
   * that handle UTXO-based chains, providing a specific implementation for scanning UTXOs.
   *
   * @param {string} _address The address for which to scan UTXOs.
   * @returns A promise that resolves to the scanned UTXOs.
   * @throws {Error} Throws an error if the method is not implemented.
   */
  public async scanUTXOs(_address: string): Promise<UTXO[]> {
    throw new Error('Method not implemented.');
  }
}
