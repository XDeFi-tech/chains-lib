import { LitecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { LITECOIN_MANIFEST } from './manifests';
import { ChainMsg } from './msg';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('chain.provider', () => {
  let provider: LitecoinProvider;

  beforeEach(() => {
    provider = new LitecoinProvider(new IndexerDataSource(LITECOIN_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      from: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      from: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('should get transactions for an address from the blockchain', async () => {
    const txData = await provider.getTransactions(
      'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY'
    );
    expect((await txData.getData()).length).toBeGreaterThan(0);
  });

  it('should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('should get a balance', async () => {
    const balance = await provider.getBalance(
      'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY'
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
