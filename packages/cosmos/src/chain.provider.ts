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
} from '@xdefi/chains-core';

import 'reflect-metadata';
import { ChainMsg } from './msg';

@ChainDecorator('CosmosProvider', {
  deps: [],
  providerType: 'Cosmos',
})
export class CosmosProvider extends Chain.Provider {
  declare rpcProvider: any;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    // this.rpcProvider = ;
  }

  createMsg(data: MsgData): Msg {
    return new ChainMsg(data);
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

  async gasFeeOptions(): Promise<FeeOptions> {
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async broadcast(_msgs: Msg[]): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
}
