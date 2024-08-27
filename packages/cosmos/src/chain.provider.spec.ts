import {
  Response,
  GasFeeSpeed,
  TransactionStatus,
  MsgEncoding,
} from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { CosmosProvider } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { COSMOS_MANIFESTS } from './manifests';

describe('chain.provider', () => {
  let provider: CosmosProvider;
  const mockedGetBalance = jest.spyOn(CosmosProvider.prototype, 'getBalance');

  beforeEach(() => {
    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.cosmos)
    );
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    const msg = provider.createMsg({
      to: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      from: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('createMsg() should create a ChainMsg instance for custom token', () => {
    const msg = provider.createMsg({
      to: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      from: 'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4',
      amount: 0.000001,
      tokenAddress: '0xf2f6671173363577a07ff3cb1e1e082f68bc2a48',
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('getBalance() should return balance data', async () => {
    mockedGetBalance.mockResolvedValue(
      new Response(
        // getData
        jest.fn().mockImplementation(async () => [
          {
            asset: {
              chainId: 'cosmoshub-4',
              name: 'Cosmos Hub',
              symbol: 'ATOM',
              icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/cosmos/info/logo.png',
              native: true,
              id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
              price: '443.21',
              decimals: 18,
              priceChange: {
                dayPriceChange: '-1',
              },
            },
            amount: '1000',
          },
          {
            asset: {
              chainId: 'cosmoshub-4',
              name: 'Neutron',
              symbol: 'NTRN',
              icon: null,
              native: false,
              address: '0xf2f6671173363577a07ff3cb1e1e082f68bc2a48',
              decimals: 18,
            },
            amount: '1000',
          },
        ]),
        // getObserver
        jest.fn().mockImplementation(async () => [
          {
            asset: {
              chainId: 'cosmoshub-4',
              name: 'Cosmos Hub',
              symbol: 'ATOM',
              icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/cosmos/info/logo.png',
              native: true,
              id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
              price: '443.21',
              decimals: 18,
              priceChange: {
                dayPriceChange: '-1',
              },
            },
            amount: '1000',
          },
          {
            asset: {
              chainId: 'cosmoshub-4',
              name: 'Neutron',
              symbol: 'NTRN',
              icon: null,
              native: false,
              address: '0xf2f6671173363577a07ff3cb1e1e082f68bc2a48',
              decimals: 18,
            },
            amount: '1000',
          },
        ])
      )
    );

    const balance = await provider.getBalance(
      'cosmos1rysuxnc2qdedfxpwj4g26a59yr53kxzd2r7yd4'
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(2);
    expect(balanceData[0].amount).toEqual('1000');
    expect(balanceData[0].asset.symbol).toEqual('ATOM');
    expect(balanceData[0].asset.price).toEqual('443.21');
    expect(balanceData[0].asset.priceChange.dayPriceChange).toEqual('-1');
  });

  it('estimateFee() should return fee estimation with encoding string message using IndexerDataSource', async () => {
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

  it('estimateFee() should return fee estimation with encoding string message using ChainDataSource', async () => {
    const osmosisProvider = new CosmosProvider(
      new ChainDataSource(COSMOS_MANIFESTS.osmosis)
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

  it('estimateFee() should return fee estimation with encoding json message using IndexerDataSource', async () => {
    const provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
    const msg = provider.createMsg({
      from: 'cosmos1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn0cwydm',
      to: 'cosmos1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn0cwydm',
      amount: 0.000001,
    });

    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.medium);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('estimateFee() should return fee estimation with encoding json message using ChainDataSource', async () => {
    const provider = new CosmosProvider(
      new ChainDataSource(COSMOS_MANIFESTS.osmosis)
    );
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
    jest.spyOn(CosmosProvider.prototype, 'getTransaction').mockResolvedValue({
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

describe('chain.provider', () => {
  let provider: CosmosProvider;

  beforeEach(() => {
    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
  });

  it('getFeeTokens(): should get a list of fee tokens', async () => {
    jest.spyOn(CosmosProvider.prototype, 'estimateFee').mockResolvedValue([
      {
        gasLimit: 1,
        gasPrice: 1,
        maxFeePerGas: 1,
        baseFeePerGas: 1,
        maxPriorityFeePerGas: 1,
      },
    ]);
    jest.setTimeout(30000);
    const feeTokens = await provider.getFeeTokens();
    expect(Array.isArray(feeTokens)).toBe(true);
    expect(
      feeTokens.every(
        (token) =>
          typeof token.denom === 'string' && typeof token.poolID === 'bigint'
      )
    ).toBeTruthy();
  });

  it('estimateGas(): should get a list of fee tokens', async () => {
    const ibcToken =
      'ibc/B547DC9B897E7C3AA5B824696110B8E3D2C31E3ED3F02FF363DCBAD82457E07E'; // uxki;
    const txInput = {
      from: 'osmo1tkh70hsnd44544s4gfhu0rpfrhkxd37pfueyfs',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
      msgs: [],
      feeOptions: {
        gasAdjustment: 2,
        gasFee: {
          denom: ibcToken,
        },
      },
    };
    const msg = provider.createMsg(txInput);
    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.low);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });
});
