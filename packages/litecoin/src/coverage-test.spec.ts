import { GasFeeSpeed, Coin } from '@xdefi-tech/chains-core';

import { LitecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { LITECOIN_MANIFEST } from './manifests';

describe('Test coverage EVM package', () => {
  let provider: LitecoinProvider;

  beforeEach(() => {
    provider = new LitecoinProvider(new IndexerDataSource(LITECOIN_MANIFEST));
  });

  it('should get transactions for an address from the blockchain', async () => {
    const txData = await provider.getTransactions(
      'Lh5Xtrt8u2rSykk9gG8heb4xBYvKPhT3WY'
    );
    expect((await txData.getData()).length).toBeGreaterThan(0);
  });

  it('getBalance() should return balance data', async () => {
    const balance = await provider.getBalance(
      'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(0);
    if (balanceData.length > 0) {
      expect(balanceData[0]).toBeInstanceOf(Coin);
      expect(balanceData[0].amount).toBeTruthy();
      expect(balanceData[0].asset.price).toBeTruthy();
      expect(balanceData[0].asset.priceChange.dayPriceChange).toBeTruthy();
    }
  });

  it('estimateFee() should return fee estimation', async () => {
    const msg = provider.createMsg({
      from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      amount: 0.000001,
    });

    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.medium);

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await provider.getTransaction(
      '76658422dbf72f80f734ae0347407dc34fc68a911d1e48f95165b39da06d6a46'
    );

    expect(txData?.hash).toEqual(
      '76658422dbf72f80f734ae0347407dc34fc68a911d1e48f95165b39da06d6a46'
    );
  });

  it('scanUTXOs() should return utxo estimation', async () => {
    const utxo = await provider.scanUTXOs(
      'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5'
    );

    expect(utxo.length).toBeGreaterThanOrEqual(0);
  });
});
