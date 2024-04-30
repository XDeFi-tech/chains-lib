import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  // Transaction,
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

  // async broadcast(messages: ChainMsg[]): Promise<Transaction[]> {
  //   const result: Transaction[] = [];
  //   for await (const message of messages) {
  //     const { signedTransaction } = message;

  //     if (!message.hasSignature) {
  //       throw new Error(`Message ${JSON.stringify(message)} is not signed`);
  //     }

  //     const {
  //       data: { txid },
  //     } = await this.rest.post('/transactions', signedTransaction);

  //     result.push(Transaction.fromData({ hash: txid }));
  //   }

  //   return result;
  // }
}
