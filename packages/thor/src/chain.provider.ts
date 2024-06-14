import {
  Balance,
  Chain,
  ChainDecorator,
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
import { some } from 'lodash';
import { bech32 } from 'bech32';

import { ChainMsg, MsgBody } from './msg';
import { ThorManifest } from './manifests';
import { AccountInfo } from './types';
import { ChainDataSource } from './datasource';

@ChainDecorator('ThorProvider', {
  deps: [],
  providerType: 'Thor',
  features: [Chain.ChainFeatures.TOKENS],
})
export class ThorProvider extends Chain.Provider {
  public rest: Axios;
  declare dataSource: any;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rest = axios.create({ baseURL: this.manifest.rpcURL });
  }

  createMsg(
    data: MsgBody,
    encoding: MsgEncoding = MsgEncoding.object
  ): ChainMsg {
    return new ChainMsg(data, this, encoding);
  }

  async getAccount(address: string): Promise<AccountInfo | null> {
    try {
      const { data: resp } = await this.rest.get(
        `/cosmos/auth/v1beta1/accounts/${address}`
      );
      return resp.account;
    } catch (err) {
      return null;
    }
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

  async broadcast(msgs: ChainMsg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }
    const transactions = [];

    for (const msg of msgs) {
      const { data } = await this.rest.post('/cosmos/tx/v1beta1/txs', {
        tx_bytes: msg.signedTransaction,
        mode: msg.toData().mode || 'BROADCAST_MODE_SYNC',
      });
      if (data.tx_response.code) {
        throw new Error(data.tx_response.raw_log);
      }
      transactions.push(
        Transaction.fromData({
          hash: data.tx_response.txhash,
        })
      );
    }

    return transactions;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const { data: response } = await this.rest.get(
      `/cosmos/tx/v1beta1/txs/${txHash}`
    );
    if (!response || !response.tx_response) {
      return null;
    }
    return {
      hash: response.tx_response.txhash,
      from: response.tx.body.messages[0].from_address,
      to: response.tx.body.messages[0].to_address,
      status:
        response.tx_response.code === 0
          ? TransactionStatus.success
          : TransactionStatus.failure,
    };
  }

  public get manifest(): ThorManifest {
    return this.dataSource.manifest as ThorManifest;
  }

  static get dataSourceList() {
    return {
      ChainDataSource: ChainDataSource,
    };
  }

  static verifyAddress(address: string, prefix = 'thor'): boolean {
    try {
      const result = bech32.decode(address);
      return result.prefix === prefix && result.words.length === 32;
    } catch (err) {
      return false;
    }
  }
}
