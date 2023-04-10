import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  FeeOptions,
  GasFeeSpeed,
  Response,
  Transaction,
  Balance,
  FeeData,
} from '@xdefi/chains-core';
import { Axios } from 'axios';

import 'reflect-metadata';
import { BitcoinChainMessage, BitcoinMessageBody } from './msg';
import { UTXODataSource } from './datasource/utxo/utxo.data-source';
import { DEFAULT_BLOCKSTREAM_URL } from './manifests';

interface BitcoinOptions extends Chain.IOptions {
  blockstreamBaseUrl?: string;
  utxoDataSource: UTXODataSource;
}

@ChainDecorator('BtcProvider', {
  deps: [],
  providerType: 'btc',
})
export class BtcProvider extends Chain.Provider {
  public rpcProvider = null;
  private api: Axios;
  private utxoDataSource: UTXODataSource;

  constructor(dataSource: DataSource, options: BitcoinOptions) {
    super(dataSource, options);
    this.api = new Axios({
      baseURL: options?.blockstreamBaseUrl ?? DEFAULT_BLOCKSTREAM_URL,
    });
    this.utxoDataSource = options.utxoDataSource;
  }

  createMsg(data: BitcoinMessageBody): BitcoinChainMessage {
    return new BitcoinChainMessage(this.utxoDataSource, data);
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
      const tx = await this.utxoDataSource.getTransaction(txid);

      result.push(Transaction.fromData(tx));
    }

    return result;
  }
}
