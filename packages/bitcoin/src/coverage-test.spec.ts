import { Coin } from '@xdefi-tech/chains-core';

import { BitcoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOIN_MANIFEST } from './manifests';

describe('Test coverage Bitcoin package', () => {
  let provider: BitcoinProvider;

  beforeEach(() => {
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
  });

  it('getBalance() should return balance data', async () => {
    const balance = await provider.getBalance(
      'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(0);
    expect(balanceData[0]).toBeInstanceOf(Coin);
    expect(balanceData[0].amount).toBeTruthy();
    expect(balanceData[0].asset.symbol).toEqual('BTC');
    expect(balanceData[0].asset.price).toBeTruthy();
    expect(balanceData[0].asset.priceChange.dayPriceChange).toBeTruthy();
  });

  it('scanUTXOs() should return utxo estimation', async () => {
    const utxo = await provider.scanUTXOs(
      'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      {
        includeOrigins: true,
      }
    );

    expect(utxo.length).toBeGreaterThanOrEqual(0);
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await provider.getTransaction(
      '7ada7ded710b07257555e3445827771a4ed70a4f520d01f521861e506740351a'
    );

    expect(txData?.hash).toEqual(
      '7ada7ded710b07257555e3445827771a4ed70a4f520d01f521861e506740351a'
    );
  });
});
