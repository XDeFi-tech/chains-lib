import { Chain, ChainDecorator, Transaction } from '@xdefi-tech/chains-core';
import { ChainMsg, UtxoProvider } from '@xdefi-tech/chains-utxo';

import { IndexerDataSource } from './datasource';

@ChainDecorator('BitcoinCashProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class BitcoinCashProvider extends UtxoProvider {
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

      const { data: txid } = await this.rest.post<string>(
        '/transactions',
        signedTransaction
      );

      result.push(Transaction.fromData({ hash: txid }));
    }

    return result;
  }
}
