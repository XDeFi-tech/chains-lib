import 'reflect-metadata';
import { BitcoinChainMessage, amount } from './bitcoinMessage';
import { BtcProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { btcManifest } from './manifests';

describe('chain.provider', () => {
  let btcProvider: BtcProvider;

  beforeEach(() => {
    btcProvider = new BtcProvider(new IndexerDataSource(btcManifest));
  });

  it('createMsg(): should create message with data', () => {
    const msg = btcProvider.createMsg({
      amount: amount(1),
      recipient: 'a',
      sender: 'b',
    });

    console.log('msg', msg);

    expect(msg).toBeInstanceOf(BitcoinChainMessage);
  });
});
