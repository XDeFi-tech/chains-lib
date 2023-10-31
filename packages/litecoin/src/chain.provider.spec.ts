import { ChainMsg } from '@xdefi-tech/chains-utxo';

import { LitecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { LITECOIN_MANIFEST } from './manifests';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('chain.provider', () => {
  let provider: LitecoinProvider;

  beforeEach(() => {
    provider = new LitecoinProvider(new IndexerDataSource(LITECOIN_MANIFEST), {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });
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

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      'bac84778220d7c2722acaf15bbc6c330f0d6c183a9b3306bd6a658ef0d2df4a8'
    );
    expect(txData?.hash).toEqual(
      'bac84778220d7c2722acaf15bbc6c330f0d6c183a9b3306bd6a658ef0d2df4a8'
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
