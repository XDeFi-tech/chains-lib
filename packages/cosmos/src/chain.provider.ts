import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  GasFeeSpeed,
  Msg,
  MsgData,
  Response,
  Transaction,
  Balance,
  FeeData,
  FeeOptions,
} from '@xdefi-tech/chains-core';
import {
  LcdClient,
  setupBankExtension,
  setupAuthExtension,
} from '@cosmjs/launchpad';
import { StdTx } from '@cosmjs/amino';
import { some } from 'lodash';

import 'reflect-metadata';
import { ChainMsg } from './msg';

@ChainDecorator('CosmosProvider', {
  deps: [],
  providerType: 'Cosmos',
})
export class CosmosProvider extends Chain.Provider {
  declare rpcProvider: LcdClient;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = LcdClient.withExtensions(
      { apiUrl: this.manifest.rpcURL },
      setupBankExtension,
      setupAuthExtension
    );
  }

  createMsg(data: MsgData): Msg {
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

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    return this.dataSource.estimateFee(msgs, speed);
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
    // unused
    throw new Error('Method not implemented.');
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }
    const transactions = [];

    for (const msg of msgs) {
      const tx = await this.rpcProvider.broadcastTx(
        msg.signedTransaction as StdTx
      );
      transactions.push(Transaction.fromData(tx));
    }

    return transactions;
  }
}
