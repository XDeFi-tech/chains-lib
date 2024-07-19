import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  Transaction,
  TransactionData,
} from '@xdefi-tech/chains-core';
import { UtxoProvider } from '@xdefi-tech/chains-utxo';
import * as Bitcoin from 'bitcoinjs-lib';

import { IndexerDataSource } from './datasource';
import { ChainMsg, MsgBody } from './msg';

@ChainDecorator('BitcoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class BitcoinProvider extends UtxoProvider<ChainMsg> {
  declare dataSource: IndexerDataSource;

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
    };
  }

  createMsg(data: MsgBody, encoding: MsgEncoding = MsgEncoding.object) {
    return new ChainMsg(data, this, encoding);
  }

  async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
    return this.dataSource.broadcast(messages);
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    return this.dataSource.getTransaction(txHash);
  }

  public async scanUTXOs(
    address: string,
    options?: { includeOrigins: boolean }
  ) {
    const utxos = await this.dataSource.scanUTXOs(address);
    if (options?.includeOrigins) {
      return utxos;
    }
    const ordinals = await this.getNFTBalance(address);
    return utxos.filter((utxo) =>
      (ordinals as any[]).every(
        (ordinals) =>
          !String(ordinals.location).startsWith(`${utxo.hash}:${utxo.index}`)
      )
    );
  }

  static verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }
}
