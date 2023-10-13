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
import { BncClient } from '@binance-chain/javascript-sdk/lib/client';
import axios, { Axios } from 'axios';

import { IndexerDataSource } from './datasource';
import { ChainMsg, MsgBody } from './msg';

@ChainDecorator('BinanceProvider', {
  deps: [],
  providerType: 'Binance',
  features: [Chain.ChainFeatures.TOKENS],
})
export class BinanceProvider extends Chain.Provider {
  public rpcProvider: BncClient;
  public rest: Axios;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new BncClient(this.manifest.rpcURL);
    this.rest = axios.create({ baseURL: this.manifest.rpcURL });
  }

  createMsg(data: MsgBody): ChainMsg {
    return new ChainMsg(data, this);
  }

  async getAccount(address: string) {
    const { data: response } = await this.rest.get(
      `/api/v1/account/${address}`
    );
    return {
      accountNumber: response.account_number,
      address: response.address,
      balances: response.balances,
      sequence: response.sequence,
      publicKey: response.public_key ? Buffer.from(response.public_key) : null,
    };
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

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
    const result: Transaction[] = [];
    for await (const message of messages) {
      if (!message.hasSignature) {
        throw new Error(`Message ${JSON.stringify(message)} is not signed`);
      }

      const { data: response } = await this.rest.post(
        '/api/v1/broadcast?sync=true',
        message.signedTransaction,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      result.push(Transaction.fromData({ hash: response[0].hash }));
    }

    return result;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const { data: response } = await this.rest.get(
      `/api/v1/tx/${txHash}?format=json`
    );
    if (!response || !response.hash) {
      return null;
    }
    return {
      hash: response.hash,
      from: response.tx.value.msg[0].value.inputs[0].address,
      to: response.tx.value.msg[0].value.outputs[0].address,
      status:
        response.code === 0
          ? TransactionStatus.success
          : TransactionStatus.failure,
    };
  }

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
    };
  }
}
