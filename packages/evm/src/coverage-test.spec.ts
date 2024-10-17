import { GasFeeSpeed, Coin } from '@xdefi-tech/chains-core';

import { EvmProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { EVM_MANIFESTS } from './manifests';

describe('Test coverage EVM package', () => {
  let evmProvider: EvmProvider;

  beforeEach(() => {
    evmProvider = new EvmProvider(
      new IndexerDataSource(EVM_MANIFESTS.ethereum)
    );
  });

  it('should get a token balance', async () => {
    const balance = await evmProvider.getBalance(
      '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC',
      [
        '0x0000000000000000000000000000000000000000',
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
      ]
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(2);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.name).toEqual('Ethereum');
    expect(balanceData[1].amount.toString()).toEqual('0');
    expect(balanceData[1].asset.symbol).toEqual('stETH');
    expect(balanceData[1].asset.name).toEqual('Liquid staked Ether 2.0');
  });

  it('getBalance() should return balance data', async () => {
    const balance = await evmProvider.getBalance(
      '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8'
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
    const msg = evmProvider.createMsg({
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
    });

    const estimateFee = await evmProvider.estimateFee(
      [msg],
      GasFeeSpeed.medium
    );

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await evmProvider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await evmProvider.getTransaction(
      '0x62d5045a7f225387f5def7bd1f8537da7773c65911f1363dd4670039142d84f6'
    );

    expect(txData?.hash).toEqual(
      '0x62d5045a7f225387f5def7bd1f8537da7773c65911f1363dd4670039142d84f6'
    );
  });

  it('should get an address nonce', async () => {
    const nonce = await evmProvider.getNonce(
      '0x0000000000000000000000000000000000000000'
    );
    expect(nonce).toEqual(0);
  });
});
