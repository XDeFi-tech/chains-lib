import {
  Chain,
  ChainDecorator,
  DataSource,
  MsgEncoding,
  Response,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import { UtxoProvider, ChainMsg, UTXO } from '@xdefi-tech/chains-utxo';

import { ChainDataSource } from './datasource';
import { MsgBody } from './msg';

@ChainDecorator('DashProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.CUSTOM_RPC],
})
export class DashProvider extends UtxoProvider {
  declare dataSource: ChainDataSource;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  static get dataSourceList() {
    return {
      ChainDataSource: ChainDataSource,
    };
  }

  createMsg(
    data: MsgBody,
    encoding: MsgEncoding = MsgEncoding.object
  ): ChainMsg {
    return new ChainMsg(data, this, encoding);
  }

  async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
    return this.dataSource.broadcast(messages);
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

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    return this.dataSource.getTransaction(txHash);
  }

  public async scanUTXOs(address: string): Promise<UTXO[]> {
    return this.dataSource.getUnspentOutputs(address);
  }
}
