import { BitcoinCashProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOINCASH_MANIFEST } from './manifests';
import { ChainMsg } from './msg';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('chain.provider', () => {
  let provider: BitcoinCashProvider;

  beforeEach(() => {
    provider = new BitcoinCashProvider(
      new IndexerDataSource(BITCOINCASH_MANIFEST)
    );
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      'eceb6281ac75c6306c2766f15fea47ab4a7cfbc8e865d5f75a0c4b8f8256fe59'
    );
    expect(txData?.hash).toEqual(
      'eceb6281ac75c6306c2766f15fea47ab4a7cfbc8e865d5f75a0c4b8f8256fe59'
    );
  });

  it('should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('should get a balance', async () => {
    const balance = await provider.getBalance(
      'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);
  });

  it('should throw for a non-existant transaction on the blockchain', async () => {
    expect(
      provider.getTransaction(
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      )
    ).rejects.toThrow();
  });
});
