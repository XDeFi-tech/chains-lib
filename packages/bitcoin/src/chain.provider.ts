import { Chain, ChainDecorator } from '@xdefi-tech/chains-core';
import { UtxoProvider } from '@xdefi-tech/chains-utxo';

import { IndexerDataSource } from './datasource';

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
}
