import {
  Chain,
  ChainDecorator,
  MsgEncoding,
  Transaction,
} from '@xdefi-tech/chains-core';
import { MsgBody, UtxoProvider } from '@xdefi-tech/chains-utxo';

import { IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';

@ChainDecorator('BitcoinCashProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class BitcoinCashProvider extends UtxoProvider {
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
    const result: Transaction[] = [];
    for await (const message of messages) {
      const { signedTransaction } = message;

      if (!message.hasSignature) {
        throw new Error(`Message ${JSON.stringify(message)} is not signed`);
      }

      const { data: response } = await this.rest.post('', {
        jsonrpc: '2.0',
        method: 'sendrawtransaction',
        params: [signedTransaction],
        id: '',
      });

      if (response.error) {
        throw new Error(response.error);
      }

      result.push(Transaction.fromData({ hash: response.result }));
    }

    return result;
  }
}
