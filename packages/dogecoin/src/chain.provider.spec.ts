import {
  Response,
  GasFeeSpeed,
  TransactionStatus,
  Coin,
} from '@xdefi-tech/chains-core';

import { DogecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { DOGECOIN_MANIFEST } from './manifests';
import { ChainMsg } from './msg';

describe('chain.provider', () => {
  const NETWORKED_QUERIES =
    process.env.NETWORKED_QUERIES === '1' ? true : false;

  let provider: DogecoinProvider;

  beforeEach(() => {
    provider = new DogecoinProvider(new IndexerDataSource(DOGECOIN_MANIFEST));
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    const msg = provider.createMsg({
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('createMsg should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('getBalance() should return balance data', async () => {
    if (!NETWORKED_QUERIES) {
      jest.spyOn(DogecoinProvider.prototype, 'getBalance').mockResolvedValue(
        new Response(
          // getData
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'dogecoin',
                name: 'Dogecoin',
                symbol: 'DOGE',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/dogecoin/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '443.21',
                decimals: 8,
              },
              amount: '1000',
            },
          ]),
          // getObserver
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'dogecoin',
                name: 'Dogecoin',
                symbol: 'DOGE',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/dogecoin/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '443.21',
                decimals: 8,
              },
              amount: '1000',
            },
          ])
        )
      );

      const balance = await provider.getBalance(
        'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toBeGreaterThanOrEqual(0);
    } else {
      const balance = await provider.getBalance(
        'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toBeGreaterThanOrEqual(0);
      expect(balanceData[0]).toBeInstanceOf(Coin);
      expect(balanceData[0].amount).toBeTruthy();
      expect(balanceData[0].asset.symbol).toEqual('DOGE');
    }
  });

  it('estimateFee() should return fee estimation', async () => {
    jest.spyOn(DogecoinProvider.prototype, 'estimateFee').mockResolvedValue([
      {
        gasLimit: 1,
        gasPrice: 1,
        maxFeePerGas: 1,
        baseFeePerGas: 1,
        maxPriorityFeePerGas: 1,
      },
    ]);

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
    jest.spyOn(DogecoinProvider.prototype, 'getTransaction').mockResolvedValue({
      hash: '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw',
      to: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      from: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      status: TransactionStatus.pending,
      amount: '1000',
    });

    const txData = await provider.getTransaction(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );

    expect(txData?.hash).toEqual(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );
  });

  it('should create message with memo as string', async () => {
    const memo = 'Test string memo';
    const msg = provider.createMsg({
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
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
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
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
    expect(DogecoinProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid dogecoin address', () => {
    expect(
      DogecoinProvider.verifyAddress('D9z79s25depHTjWpFRt9X3S5KD7ivPze3e')
    ).toBe(true);
  });

  it('should return false when verifying a valid bitcoin address', () => {
    expect(
      DogecoinProvider.verifyAddress(
        'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
      )
    ).toBe(false);
  });
});
