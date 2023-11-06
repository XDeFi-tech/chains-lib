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
  TransactionData,
  MsgEncoding,
} from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';

@ChainDecorator('TronProvider', {
  deps: [],
  providerType: 'Tron',
})
export class TronProvider extends Chain.Provider {
  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    // this.rpcProvider = ;
  }

  createMsg(data: MsgData, encoding: MsgEncoding = MsgEncoding.object): Msg {
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

  async estimateFee(_msgs: Msg[], _speed: GasFeeSpeed): Promise<FeeData[]> {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error("Tron chain doesn't use nonce");
  }

  async broadcast(_msgs: Msg[]): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  async getTransaction(_txHash: string): Promise<TransactionData | null> {
    throw new Error('Method not implemented.');
  }
}
