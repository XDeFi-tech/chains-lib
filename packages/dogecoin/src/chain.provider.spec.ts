import { ChainMsg } from './msg';
import { DogecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { DOGECOIN_MANIFEST } from './manifests';

describe('chain.provider', () => {
  let btcProvider: DogecoinProvider;

  beforeEach(() => {
    btcProvider = new DogecoinProvider(
      new IndexerDataSource(DOGECOIN_MANIFEST)
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
