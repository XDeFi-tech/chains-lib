import { GasFeeSpeed } from '@xdefi-tech/chains-core';

import { BinanceProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BINANCE_MANIFEST } from './manifests';

describe('Test coverage Binance package', () => {
  let provider: BinanceProvider;

  beforeEach(() => {
    provider = new BinanceProvider(new IndexerDataSource(BINANCE_MANIFEST));
  });

  it('getBalance() should return balance data', async () => {
    const balance = await provider.getBalance(
      '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);
  });

  it('estimateFee() should return fee estimation', async () => {
    const msg = provider.createMsg({
      from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      amount: 0.000001,
      denom: 'bnb',
    });

    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.medium);

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toEqual(0);
  });

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await provider.getTransaction(
      '0944D46D3D95582A5C91E4E0220B0A6718F6C8181AA391E9F206310E94EC7F74'
    );

    expect(txData?.hash).toEqual(
      '0944D46D3D95582A5C91E4E0220B0A6718F6C8181AA391E9F206310E94EC7F74'
    );
  });
});
