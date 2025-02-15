import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import {
  IUtxoProvider,
  MsgBody,
  UtxoProvider,
  UtxoProviderOptions,
} from '@xdefi-tech/chains-utxo';
import bchaddr from 'bchaddrjs';

import { IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';

@ChainDecorator('BitcoinCashProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class BitcoinCashProvider
  extends UtxoProvider<ChainMsg>
  implements IUtxoProvider
{
  declare dataSource: IndexerDataSource;

  constructor(dataSource: IndexerDataSource, options?: UtxoProviderOptions) {
    super(dataSource, options);
  }

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

  static verifyAddress(address: string): boolean {
    try {
      const _address = bchaddr.toCashAddress(address);
      return bchaddr.isValidAddress(_address);
    } catch (err) {
      return false;
    }
  }
}
