import { Coin } from '@xdefi-tech/chains-core';

import { SolanaProvider } from './chain.provider';
import { ChainDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';

describe('Test coverage Solana package', () => {
  let chainProvider: SolanaProvider;

  beforeEach(() => {
    chainProvider = new SolanaProvider(new ChainDataSource(SOLANA_MANIFEST));
  });

  it('getBalance() should return balance data', async () => {
    const balance = await chainProvider.getBalance(
      '2n7soqRhr69wcVS5nLTxYyuiZ1utGu1RL7fQV1BqqZaL'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(0);
    if (balanceData.length > 0) {
      expect(balanceData[0]).toBeInstanceOf(Coin);
      expect(balanceData[0].amount).toBeTruthy();
    }
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await chainProvider.getTransaction(
      'jHTUk2zgmknbndxWnNRsamQUkUJCHvWHFBhtmLzj85CN7EfcqcenHKV8y9YaDvbvBCQcaeEDjs3HdjFi2fUUSAM'
    );

    expect(txData?.hash).toEqual(
      'GCzkrfpxjKJkHh7yFXm1rirZGdUwS4tDoTdr3MXEr1QM'
    );
  });
});
