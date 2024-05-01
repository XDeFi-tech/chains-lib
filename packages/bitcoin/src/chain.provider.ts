import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import { UtxoProvider } from '@xdefi-tech/chains-utxo';

import { IndexerDataSource } from './datasource';
import { ChainMsg, MsgBody } from './msg';

@ChainDecorator('BitcoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class BitcoinProvider extends UtxoProvider {
  declare dataSource: IndexerDataSource;

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
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

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    return this.dataSource.getTransaction(txHash);
  }

  public async scanUTXOs(address: string) {
    return this.dataSource.scanUTXOs(address);
  }
}
