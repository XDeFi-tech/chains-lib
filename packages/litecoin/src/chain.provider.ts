import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  Transaction,
  TransactionData,
} from '@ctrl-tech/chains-core';
import { MsgBody, UtxoProvider } from '@ctrl-tech/chains-utxo';

import { IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';

@ChainDecorator('LitecoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class LitecoinProvider extends UtxoProvider {
  declare dataSource: IndexerDataSource;

  createMsg(
    data: MsgBody,
    encoding: MsgEncoding = MsgEncoding.object
  ): ChainMsg {
    return new ChainMsg(data, this, encoding);
  }

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
    };
  }

  async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
    return this.dataSource.broadcast(messages);
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    return this.dataSource.getTransaction(txHash);
  }

  public async scanUTXOs(address: string) {
    return this.dataSource.scanUTXOs(address);
  }
}
