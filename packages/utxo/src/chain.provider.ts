import {
  Balance,
  Chain,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
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

  createMsg(data: MsgBody): ChainMsg {
    return new ChainMsg(data, this);
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
    const result: Transaction[] = [];
    for await (const message of messages) {
      const { signedTransaction } = message;

      if (!message.hasSignature) {
        throw new Error(`Message ${JSON.stringify(message)} is not signed`);
      }

      if (this.manifest.dataProviderType === 'blockchair') {
        const dataSource: BlockchairDataProvider = this
          .utxoDataSource as BlockchairDataProvider;
        const hash = await dataSource.broadcast(signedTransaction as string);

        result.push(Transaction.fromData({ hash: hash }));
      } else {
        const { data: txid } = await this.rest.post<string>(
          '/api/tx',
          signedTransaction
        );

        result.push(Transaction.fromData({ hash: txid }));
      }
    }

    return result;
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
