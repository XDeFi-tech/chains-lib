import {
  Balance,
  Chain,
  ChainDecorator,
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

import { BitcoinChainMessage, BitcoinMessageBody } from './msg';
import {
  DEFAULT_BLOCKSTREAM_URL,
  DEFAULT_HASKOIN_URL,
  UTXOManifest,
} from './manifests';
import { HaskoinDataSource, UTXODataSource } from './datasource';

@ChainDecorator('BtcProvider', {
  deps: [Chain.ChainFeatures.TOKENS],
  providerType: 'btc',
})
export class BtcProvider extends Chain.Provider {
  public rpcProvider = null;
  private api: Axios;
  public chainDataSource: UTXODataSource;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    const manifest = this.manifest as UTXOManifest;
    this.api = axios.create({
      baseURL: manifest.rpcURL || DEFAULT_BLOCKSTREAM_URL,
    });
    this.chainDataSource = new HaskoinDataSource(
      manifest.chainDataSourceURL || DEFAULT_HASKOIN_URL
    );
  }

  createMsg(data: BitcoinMessageBody): BitcoinChainMessage {
    return new BitcoinChainMessage(data, this);
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
    messages: BitcoinChainMessage[],
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

  async broadcast(messages: BitcoinChainMessage[]): Promise<Transaction[]> {
    const result: Transaction[] = [];
    for await (const message of messages) {
      const { signedTransaction } = message;

      if (!message.hasSignature) {
        throw new Error(`Message ${message} is not signed`);
      }

      const { data: txid } = await this.api.post<string>(
        '/api/tx',
        signedTransaction
      );

      result.push(Transaction.fromData({ hash: txid }));
    }

    return result;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await this.chainDataSource.getTransaction(txHash);
    return {
      hash: tx.txid,
      status: TransactionStatus.success,
      from: '',
      to: tx.outputs[0].address,
    };
  }
}
