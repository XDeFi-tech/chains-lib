import { GasFeeSpeed, Coin } from '@xdefi-tech/chains-core';

import { ThorProvider } from './chain.provider';
import { THORCHAIN_MANIFESTS, ThorChains } from './manifests';

describe('Test coverage Thor package', () => {
  const providers: Record<ThorChains, ThorProvider> = {
    [ThorChains.thorchain]: new ThorProvider(
      new ThorProvider.dataSourceList.IndexerDataSource(
        THORCHAIN_MANIFESTS[ThorChains.thorchain]
      )
    ),
    [ThorChains.mayachain]: new ThorProvider(
      new ThorProvider.dataSourceList.IndexerDataSource(
        THORCHAIN_MANIFESTS[ThorChains.mayachain]
      )
    ),
  };

  it('should get a transaction from thorchain', async () => {
    const txData = await providers[ThorChains.thorchain].getTransaction(
      '5EC8C9F154F4BCFBA30BB5E7D67818F891ADEEDE4129D18104D40326D6BAB968'
    );
    expect(txData?.hash).toEqual(
      '5EC8C9F154F4BCFBA30BB5E7D67818F891ADEEDE4129D18104D40326D6BAB968'
    );
  });

  it('should get fee options on thorchain', async () => {
    const feeOptions = await providers[ThorChains.thorchain].gasFeeOptions();

    expect(feeOptions?.low).toBeDefined();
    expect(feeOptions?.medium).toBeDefined();
    expect(feeOptions?.high).toBeDefined();
  });

  it('should get a balance from thorchain', async () => {
    const balance = await providers[ThorChains.thorchain].getBalance(
      'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0]).toBeInstanceOf(Coin);
  });

  it('should get a transaction from mayachain', async () => {
    const txData = await providers[ThorChains.mayachain].getTransaction(
      'ED694D34F4E86FA5555A71556A1AEDB1D0D679664EC807E0D7A4A96722ABD137'
    );
    expect(txData?.hash).toEqual(
      'ED694D34F4E86FA5555A71556A1AEDB1D0D679664EC807E0D7A4A96722ABD137'
    );
  });

  it('should get fee options on mayachain', async () => {
    const feeOptions = await providers[ThorChains.mayachain].gasFeeOptions();

    expect(feeOptions?.low).toBeDefined();
    expect(feeOptions?.medium).toBeDefined();
    expect(feeOptions?.high).toBeDefined();
  });

  it('estimateFee() should return fee estimation', async () => {
    const msg = providers[ThorChains.thorchain].createMsg({
      to: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      from: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      amount: 0.000001,
      decimals: 18,
    });

    const estimateFee = await providers[ThorChains.thorchain].estimateFee(
      [msg],
      GasFeeSpeed.medium
    );

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await providers[ThorChains.thorchain].gasFeeOptions();

    expect(feeOptions?.low).toEqual(0);
    expect(feeOptions?.medium).toEqual(0);
    expect(feeOptions?.high).toEqual(0);
  });
});
