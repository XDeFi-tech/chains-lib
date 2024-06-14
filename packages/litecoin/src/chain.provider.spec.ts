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

  it('should create message with memo as string', async () => {
    const memo = 'Test string memo';
    const msg = provider.createMsg({
      to: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      from: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      amount: 0.000001,
      memo: memo,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
    expect(msg.toData().memo).toEqual(memo);
  });

  it('should create message with memo as Uint8Array', async () => {
    const memo = 'Test string memo';
    const encodedMemo = new TextEncoder().encode(memo);
    const msg = provider.createMsg({
      to: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      from: 'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY',
      amount: 0.000001,
      memo: encodedMemo,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
    expect(msg.toData().memo).toEqual(encodedMemo);
    expect(new TextDecoder().decode(msg.toData().memo as Uint8Array)).toEqual(
      memo
    );
  });

  it('should return false when verifying an invalid address', () => {
    expect(LitecoinProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid litecoin address', () => {
    expect(
      LitecoinProvider.verifyAddress(
        'ltc1qldh5lt4kw63rl9s8d6wfm438ekwswf6d2ucrat'
      )
    ).toBe(true);
  });

  it('should return false when verifying a valid bitcoin address', () => {
    expect(
      LitecoinProvider.verifyAddress(
        'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
      )
    ).toBe(false);
  });
});
