import { Chain, ChainDecorator, MsgEncoding } from '@xdefi-tech/chains-core';
import { MsgBody, UtxoProvider } from '@xdefi-tech/chains-utxo';

import { IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';

@ChainDecorator('DogecoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class DogecoinProvider extends UtxoProvider {
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
}
