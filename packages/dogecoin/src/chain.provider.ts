import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import { MsgBody, UtxoProvider } from '@xdefi-tech/chains-utxo';
import coininfo from 'coininfo';
import * as btc from '@scure/btc-signer';

import { IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';

@ChainDecorator('DogecoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class DogecoinProvider extends UtxoProvider {
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
      const _address = btc
        .Address(coininfo.dogecoin.main.toBitcoinJS())
        .decode(address);
      return Boolean(_address);
    } catch (err) {
      return false;
    }
  }
}
