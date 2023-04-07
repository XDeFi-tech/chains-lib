import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  FeeOptions,
  GasFeeSpeed,
  Msg,
  MsgData,
  Response,
  Transaction,
  Balance,
  FeeData,
} from '@xdefi/chains-core';

import 'reflect-metadata';
import { ChainMsg } from './msg';

@ChainDecorator('SolanaProvider', {
  deps: [],
  providerType: 'Solana',
})
export class SolanaProvider extends Chain.Provider {
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

  async estimateFee(_msgs: Msg[], _speed: GasFeeSpeed): Promise<FeeData[]> {
    throw new Error('Method not implemented.');
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async broadcast(_msgs: Msg[]): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
}
