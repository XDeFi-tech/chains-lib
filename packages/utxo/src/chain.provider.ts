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
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import axios, { Axios } from 'axios';

import { ChainMsg, MsgBody } from './msg';
import { UTXOManifest } from './manifests';
import {
  HaskoinDataProvider,
  UTXODataProvider,
  BlockchairDataProvider,
} from './data-provider';

export interface UtxoProviderOptions extends Chain.IOptions {
  apiKey?: string;
  customDataProvider?: UTXODataProvider;
}

export class UtxoProvider extends Chain.Provider {
  public rpcProvider = null;
  public rest: Axios;
  public utxoDataSource: UTXODataProvider;

  constructor(dataSource: DataSource, options?: UtxoProviderOptions) {
    super(dataSource, options);
    const manifest = this.manifest as UTXOManifest;
    this.rest = axios.create({
      baseURL: manifest.rpcURL,
    });
    if (manifest.dataProviderType === 'haskoin') {
      this.utxoDataSource = new HaskoinDataProvider(manifest.dataProviderURL);
    } else if (manifest.dataProviderType === 'blockchair') {
      this.utxoDataSource = new BlockchairDataProvider(
        manifest.dataProviderURL,
        options?.apiKey || ''
      );
    } else if (
      manifest.dataProviderType === 'custom' &&
      options?.customDataProvider
    ) {
      this.utxoDataSource = options.customDataProvider;
    } else {
      throw new Error('Invalid data source type');
    }
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
    return this.utxoDataSource.broadcast(messages);
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await this.utxoDataSource.getTransaction(txHash);
    return {
      hash: tx.hash,
      status: TransactionStatus.success,
      from: '',
      to: tx.outputs[0].address,
    };
  }

  public get manifest(): UTXOManifest {
    return this.dataSource.manifest as UTXOManifest;
  }
}
