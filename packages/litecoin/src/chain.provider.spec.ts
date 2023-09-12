import { ChainMsg } from './msg';
import { LitecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { LITECOIN_MANIFEST } from './manifests';

describe('chain.provider', () => {
  let btcProvider: LitecoinProvider;

  beforeEach(() => {
    btcProvider = new LitecoinProvider(
      new IndexerDataSource(LITECOIN_MANIFEST)
    );
  });

  it('createMsg(): should create message with data', () => {
    const msg = btcProvider.createMsg({
      amount: 1,
      to: 'bc1q7cyrfmck2ffu2ud3rn5l5a8yv6f0chkp0zpemf',
      from: '39ACoGCp4riBaXQ5mfHMF4mi1Ztia2SZxQ',
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });
});
