import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import { MsgBody, UtxoProvider } from '@xdefi-tech/chains-utxo';
import * as Litecoin from 'bitcoinjs-lib';
import coininfo from 'coininfo';

import { IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';

@ChainDecorator('LitecoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class LitecoinProvider extends UtxoProvider<ChainMsg> {
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

  static verifyAddress(address: string): boolean {
    try {
      Litecoin.address.toOutputScript(
        address,
        coininfo.litecoin.main.toBitcoinJS()
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
