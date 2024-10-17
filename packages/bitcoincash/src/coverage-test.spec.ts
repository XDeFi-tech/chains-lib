import { Coin } from '@xdefi-tech/chains-core';

import { BitcoinCashProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOINCASH_MANIFEST } from './manifests';

describe('Test coverage BitcoinCash package', () => {
  let provider: BitcoinCashProvider;

  beforeEach(() => {
    provider = new BitcoinCashProvider(
      new IndexerDataSource(BITCOINCASH_MANIFEST)
    );
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      'eceb6281ac75c6306c2766f15fea47ab4a7cfbc8e865d5f75a0c4b8f8256fe59'
    );
    expect(txData?.hash).toEqual(
      'eceb6281ac75c6306c2766f15fea47ab4a7cfbc8e865d5f75a0c4b8f8256fe59'
    );
  });

  it('getBalance() should return balance data', async () => {
    const balance = await provider.getBalance(
      'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(0);
    if (balanceData.length > 0) {
      expect(balanceData[0]).toBeInstanceOf(Coin);
      expect(balanceData[0].amount).toBeTruthy();
      expect(balanceData[0].asset.symbol).toEqual('BCH');
      expect(balanceData[0].asset.price).toBeTruthy();
      expect(balanceData[0].asset.priceChange.dayPriceChange).toBeTruthy();
    }
  });

  it('scanUTXOs() should return utxo estimation', async () => {
    const utxo = await provider.scanUTXOs(
      'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu'
    );

    expect(utxo.length).toBeGreaterThanOrEqual(0);
  });
});
