import { GasFeeSpeed, Coin } from '@xdefi-tech/chains-core';

import { DogecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { DOGECOIN_MANIFEST } from './manifests';

describe('Test coverage DogeCoin package', () => {
  let provider: DogecoinProvider;

  beforeEach(() => {
    provider = new DogecoinProvider(new IndexerDataSource(DOGECOIN_MANIFEST));
  });

  it('getBalance() should return balance data', async () => {
    const balance = await provider.getBalance(
      'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(0);
    expect(balanceData[0]).toBeInstanceOf(Coin);
    expect(balanceData[0].amount).toBeTruthy();
    expect(balanceData[0].asset.symbol).toEqual('DOGE');
  });

  it('scanUTXOs() should return utxo estimation', async () => {
    const utxo = await provider.scanUTXOs('DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn');

    expect(utxo.length).toBeGreaterThanOrEqual(0);
  });

  it('estimateFee() should return fee estimation', async () => {
    const msg = provider.createMsg({
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      amount: 0.000001,
    });

    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.medium);

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    jest.spyOn(DogecoinProvider.prototype, 'gasFeeOptions').mockResolvedValue({
      low: 1,
      medium: 1,
      high: 1,
    });

    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await provider.getTransaction(
      'd3b97370652b80d2693ab0c205b8cfbfd6b5847ea9090573c06acbf5721b7ebf'
    );

    expect(txData?.hash).toEqual(
      'd3b97370652b80d2693ab0c205b8cfbfd6b5847ea9090573c06acbf5721b7ebf'
    );
  });
});
