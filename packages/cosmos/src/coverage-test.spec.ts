import { GasFeeSpeed, MsgEncoding, Coin } from '@xdefi-tech/chains-core';

import { CosmosProvider } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { COSMOS_MANIFESTS } from './manifests';

describe('Test coverage Cosmos package', () => {
  let provider: CosmosProvider;

  beforeEach(() => {
    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.cosmos)
    );
  });

  it('getBalance() should return balance data', async () => {
    const balance = await provider.getBalance(
      'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4'
    );
    const balanceData = await balance.getData();
    if (balanceData.length > 0) {
      expect(balanceData[0]).toBeInstanceOf(Coin);
      expect(balanceData[0].amount).toBeTruthy();
      expect(balanceData[0].asset.price).toBeTruthy();
      expect(balanceData[0].asset.priceChange.dayPriceChange).toBeTruthy();
    }
  });

  it('estimatFee() should return fee estimation with encoding string msg', async () => {
    const osmosisProvider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
    const msg = osmosisProvider.createMsg(
      {
        data: '{"signDoc":{"accountNumber":"2551461","chainId":"osmosis-1","fee":{"gas":"318939","amount":[{"amount":"1196","denom":"uosmo"}]},"memo":"FE","msgs":[{"typeUrl":"/osmosis.gamm.v1beta1.MsgSwapExactAmountIn","value":{"routes":[{"poolId":"1400","tokenOutDenom":"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"}],"sender":"osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf","tokenIn":{"amount":"5000000","denom":"uosmo"},"tokenOutMinAmount":"370642"}}],"sequence":"6","timeoutHeight":"18897301"},"signer":"osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf"}',
      },
      MsgEncoding.string
    );
    const estimateFee = await osmosisProvider.estimateFee(
      [msg],
      GasFeeSpeed.low
    );
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('estimateFee() should return fee estimation with encoding json msg', async () => {
    const msg = provider.createMsg({
      from: 'cosmos1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn0cwydm',
      to: 'cosmos1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn0cwydm',
      amount: 0.000001,
    });

    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.medium);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    jest.spyOn(CosmosProvider.prototype, 'gasFeeOptions').mockResolvedValue({
      high: 0.003,
      medium: 0.0025,
      low: 0.001,
    });

    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await provider.getTransaction(
      '133E48EAF6F43C8D202F388A3A00B59BDBADFB65A7E9D5F8FE35FEB8917B8AED'
    );

    expect(txData?.hash).toEqual(
      '133E48EAF6F43C8D202F388A3A00B59BDBADFB65A7E9D5F8FE35FEB8917B8AED'
    );
  });

  it('getBalance() on cronos chain', async () => {
    const provider = new CosmosProvider(
      new ChainDataSource(COSMOS_MANIFESTS.cronos)
    );
    const balance = await provider.getBalance(
      'cro1g5rjj3dsdxnmxz4ydvhxem6hddqs2hgw5wem0f'
    );
    expect(await balance.getData()).toBeTruthy();
  });

  it('getBalance() on mars chain', async () => {
    const provider = new CosmosProvider(
      new ChainDataSource(COSMOS_MANIFESTS.mars)
    );
    const balance = await provider.getBalance(
      'mars1km3nehyxu92vu2whjqhuqkmljvcd4nwvnxz8yt'
    );
    expect(await balance.getData()).toBeTruthy();
  });
});
