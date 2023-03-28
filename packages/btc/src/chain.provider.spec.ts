import 'reflect-metadata';
import { BitcoinChainMessage } from './msg';
import { BtcProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { btcManifest } from './manifests';
import { HaskoinDataSource } from './datasource/haskoin/haskoin.data-source';
import BigNumber from 'bignumber.js';

describe('chain.provider', () => {
  let btcProvider: BtcProvider;

  beforeEach(() => {
    btcProvider = new BtcProvider(new IndexerDataSource(btcManifest), {
      utxoDataSource: new HaskoinDataSource(),
    });
  });

  it('createMsg(): should create message with data', () => {
    const msg = btcProvider.createMsg({
      amount: new BigNumber(1),
      recipient: 'bc1q7cyrfmck2ffu2ud3rn5l5a8yv6f0chkp0zpemf',
      sender: '39ACoGCp4riBaXQ5mfHMF4mi1Ztia2SZxQ',
    });

    expect(msg).toBeInstanceOf(BitcoinChainMessage);
  });
});
