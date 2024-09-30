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
import { AssetInternalType, TokenCategory } from './gql';

describe('chain.provider', () => {
  let provider: CosmosProvider;
  const mockedGetBalance = jest.spyOn(CosmosProvider.prototype, 'getBalance');

  beforeEach(() => {
    provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.axelar)
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
              type: AssetInternalType.CRYPTOCURRENCY,
              categories: [TokenCategory.TRENDING_TOKEN],
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
              type: AssetInternalType.TOKEN,
              categories: [TokenCategory.TRENDING_TOKEN],
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
              type: AssetInternalType.CRYPTOCURRENCY,
              categories: [TokenCategory.TRENDING_TOKEN],
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
              type: AssetInternalType.TOKEN,
              categories: [TokenCategory.TRENDING_TOKEN],
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
    mockedGetBalance.mockRestore();
    expect(balanceData[0].asset.type).toEqual(AssetInternalType.CRYPTOCURRENCY);
    expect(JSON.stringify(balanceData[0].asset.categories)).toEqual(
      JSON.stringify([TokenCategory.TRENDING_TOKEN])
    );
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
    const balanceData = await balance.getData();
    expect(balanceData.some((data) => data.asset.native === true)).toBe(true);
  });

  it('getBalance() on mars chain', async () => {
    const provider = new CosmosProvider(
      new ChainDataSource(COSMOS_MANIFESTS.mars)
    );
    const balance = await provider.getBalance(
      'mars1km3nehyxu92vu2whjqhuqkmljvcd4nwvnxz8yt'
    );
    const balanceData = await balance.getData();
    expect(balanceData.some((data) => data.asset.native === true)).toBe(true);
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

  it('estimateGas(): for IBC ', async () => {
    const txInput = {
      from: 'osmo185zc74a7w2pfxkv6d06t3kdja65tngjgkn6pqg',
      addresses: {
        cronos: '0x8d8dC7e30407778532052330dBAC3D3186411e0D',
        cosmos: 'cosmos185zc74a7w2pfxkv6d06t3kdja65tngjg7gf3k6',
        stargaze: 'stars185zc74a7w2pfxkv6d06t3kdja65tngjg257vat',
        akash: 'akash185zc74a7w2pfxkv6d06t3kdja65tngjgnnyk0q',
        kujira: 'kujira185zc74a7w2pfxkv6d06t3kdja65tngjg0qtfms',
        sei: 'sei185zc74a7w2pfxkv6d06t3kdja65tngjgnyc8sm',
        stride: 'stride185zc74a7w2pfxkv6d06t3kdja65tngjgarfdzk',
        mars: 'mars185zc74a7w2pfxkv6d06t3kdja65tngjgr4sgrp',
        osmosis: 'osmo185zc74a7w2pfxkv6d06t3kdja65tngjgkn6pqg',
        axelar: 'axelar1qjn7k284m7ym6rxd2v6h7magwtectyxvhlals0',
      },
      amountIn: '0.01',
      destAssetChain: 'axelar',
      sourceAssetDenom:
        'ibc/903A61A498756EA560B85A85132D3AEE21B5DEDD41213725D22ABF276EA6945E',
      sourceAssetChain: 'osmosis',
    };
    const msg = provider.createMsg(txInput);
    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.low);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });
  it('test sanitiseMsg with tx from routing API', async () => {
    const data = {
      chainId: 'osmosis-1',
      signer: 'osmo1lzmdpu0vkav73wx2tv3qgyfmcansf8f7hd9vxt',
      signDoc: {
        chain_id: 'osmosis-1',
        account_number: '856691',
        sequence: '11',
        fee: { amount: [{ denom: 'uosmo', amount: 20000 }], gas: 500000 },
        msgs: [
          {
            '@type': '/cosmos.bank.v1beta1.MsgSend',
            amount: [{ amount: '15', denom: 'UION' }],
            fromAddress: 'osmo1lzmdpu0vkav73wx2tv3qgyfmcansf8f7hd9vxt',
            toAddress: 'osmo13djgqp5mmxvcgsr3ykt2pd8c5l4vr5gzz7pyqj',
          },
          {
            '@type': '/osmosis.gamm.v1beta1.MsgSwapExactAmountIn',
            routes: [
              { poolId: '1013', tokenOutDenom: 'uosmo' },
              {
                poolId: '1086',
                tokenOutDenom:
                  'ibc/71F11BC0AF8E526B80E44172EBA9D3F0A8E03950BB882325435691EBC9450B1D',
              },
            ],
            sender: 'osmo1lzmdpu0vkav73wx2tv3qgyfmcansf8f7hd9vxt',
            tokenIn: { amount: '4985', denom: 'UION' },
            tokenOutMinAmount: '2896449',
          },
        ],
        memo: '',
      },
      signOptions: { preferNoSetFee: false },
    };
    const osmosis = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
    const msg = osmosis.createMsg(
      { data: JSON.stringify(data) },
      MsgEncoding.string
    );
    const estimateFee = await osmosis.estimateFee([msg], GasFeeSpeed.high);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });
  it('test with msg containing MsgExecuteContract', async () => {
    const data = {
      chainId: 'osmosis-1',
      signer: 'osmo1lzmdpu0vkav73wx2tv3qgyfmcansf8f7hd9vxt',
      signDoc: {
        chain_id: 'osmosis-1',
        account_number: '856691',
        sequence: '12',
        fee: { amount: [{ denom: 'uosmo', amount: 20000 }], gas: 500000 },
        msgs: [
          {
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: {
              sender: 'osmo1lzmdpu0vkav73wx2tv3qgyfmcansf8f7hd9vxt',
              contract:
                'osmo15jw7xccxaxk30lf4xgag8f7aeg53pgkh74e39rv00xfnymldjaas2fk627',
              msg: [
                123, 34, 115, 119, 97, 112, 95, 119, 105, 116, 104, 95, 97, 99,
                116, 105, 111, 110, 34, 58, 32, 123, 34, 115, 119, 97, 112, 95,
                109, 115, 103, 34, 58, 32, 123, 34, 116, 111, 107, 101, 110, 95,
                111, 117, 116, 95, 109, 105, 110, 95, 97, 109, 111, 117, 110,
                116, 34, 58, 32, 34, 49, 50, 50, 48, 49, 53, 34, 44, 32, 34,
                112, 97, 116, 104, 34, 58, 32, 91, 123, 34, 112, 111, 111, 108,
                95, 105, 100, 34, 58, 32, 34, 49, 49, 49, 52, 34, 44, 32, 34,
                116, 111, 107, 101, 110, 95, 111, 117, 116, 95, 100, 101, 110,
                111, 109, 34, 58, 32, 34, 117, 111, 115, 109, 111, 34, 125, 44,
                32, 123, 34, 112, 111, 111, 108, 95, 105, 100, 34, 58, 32, 34,
                49, 34, 44, 32, 34, 116, 111, 107, 101, 110, 95, 111, 117, 116,
                95, 100, 101, 110, 111, 109, 34, 58, 32, 34, 105, 98, 99, 47,
                50, 55, 51, 57, 52, 70, 66, 48, 57, 50, 68, 50, 69, 67, 67, 68,
                53, 54, 49, 50, 51, 67, 55, 52, 70, 51, 54, 69, 52, 67, 49, 70,
                57, 50, 54, 48, 48, 49, 67, 69, 65, 68, 65, 57, 67, 65, 57, 55,
                69, 65, 54, 50, 50, 66, 50, 53, 70, 52, 49, 69, 53, 69, 66, 50,
                34, 125, 93, 125, 44, 32, 34, 97, 102, 116, 101, 114, 95, 115,
                119, 97, 112, 95, 97, 99, 116, 105, 111, 110, 34, 58, 32, 123,
                34, 105, 98, 99, 95, 116, 114, 97, 110, 115, 102, 101, 114, 34,
                58, 32, 123, 34, 114, 101, 99, 101, 105, 118, 101, 114, 34, 58,
                32, 34, 99, 111, 115, 109, 111, 115, 49, 108, 122, 109, 100,
                112, 117, 48, 118, 107, 97, 118, 55, 51, 119, 120, 50, 116, 118,
                51, 113, 103, 121, 102, 109, 99, 97, 110, 115, 102, 56, 102, 55,
                108, 107, 107, 117, 115, 101, 34, 44, 32, 34, 99, 104, 97, 110,
                110, 101, 108, 34, 58, 32, 34, 99, 104, 97, 110, 110, 101, 108,
                45, 48, 34, 125, 125, 44, 32, 34, 108, 111, 99, 97, 108, 95,
                102, 97, 108, 108, 98, 97, 99, 107, 95, 97, 100, 100, 114, 101,
                115, 115, 34, 58, 32, 34, 111, 115, 109, 111, 49, 108, 122, 109,
                100, 112, 117, 48, 118, 107, 97, 118, 55, 51, 119, 120, 50, 116,
                118, 51, 113, 103, 121, 102, 109, 99, 97, 110, 115, 102, 56,
                102, 55, 104, 100, 57, 118, 120, 116, 34, 125, 125,
              ],
              funds: [
                {
                  denom:
                    'ibc/71F11BC0AF8E526B80E44172EBA9D3F0A8E03950BB882325435691EBC9450B1D',
                  amount: '1994000',
                },
              ],
            },
          },
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              amount: [
                {
                  amount: '6000',
                  denom:
                    'ibc/71F11BC0AF8E526B80E44172EBA9D3F0A8E03950BB882325435691EBC9450B1D',
                },
              ],
              fromAddress: 'osmo1lzmdpu0vkav73wx2tv3qgyfmcansf8f7hd9vxt',
              toAddress: 'osmo13djgqp5mmxvcgsr3ykt2pd8c5l4vr5gzz7pyqj',
            },
          },
        ],
        memo: '',
      },
      signOptions: { preferNoSetFee: false },
    };
    const osmosis = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
    );
    const msg = osmosis.createMsg(
      { data: JSON.stringify(data) },
      MsgEncoding.string
    );
    const estimateFee = await osmosis.estimateFee([msg], GasFeeSpeed.high);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });
});
