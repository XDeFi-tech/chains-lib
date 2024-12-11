import { MsgEncoding, Asset, Coin, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';

import { ChainDataSource } from './datasource';
import { COSMOS_MANIFESTS } from './manifests';
import { CosmosProvider } from './chain.provider';
import { ChainMsg } from './msg';
import { MsgAddAuthenticator } from './proto_export/osmosis/smartaccount/v1beta1/tx';

jest.mock('./chain.provider', () => {
  const originModule = jest.requireActual('./chain.provider');

  return {
    __esModule: true,
    ...originModule,
  };
});

describe('msg', () => {
  let provider: CosmosProvider;
  let mockProvider: any;

  beforeEach(() => {
    mockProvider = {
      getAccount: jest.fn(() =>
        Promise.resolve({
          account: {
            '@type': '/cosmos.auth.v1beta1.BaseAccount',
            address: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
            pub_key: {
              '@type': '/cosmos.crypto.secp256k1.PubKey',
              key: 'A92jmyLB+OLC0R2jvEUX+AtGGqafEOdh40V29PCcz6Hu',
            },
            account_number: '1895821',
            sequence: '1',
          },
        })
      ),
      getBalance: jest.fn(() =>
        Promise.resolve({
          getData: jest.fn(() =>
            Promise.resolve([
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
          ),
        })
      ),
      getFee: jest.fn(() =>
        Promise.resolve({
          high: 0.003,
          medium: 0.0025,
          low: 0.001,
        })
      ),
      estimateFee: jest.fn(() =>
        Promise.resolve([
          {
            gasLimit: 31500,
            gasPrice: 0.1,
            maxFeePerGas: 5390000000,
            maxPriorityFeePerGas: 560000000,
          },
        ])
      ),
      manifest: {
        name: 'Cosmos Hub',
        description: '',
        rpcURL: 'https://rpc-proxy.xdefi.services/cosmos/rpc/mainnet',
        lcdURL: 'https://rpc-proxy.xdefi.services/cosmos/lcd/mainnet',
        chainSymbol: 'ATOM',
        blockExplorerURL: 'https://www.mintscan.io/cosmos/account',
        chainId: 'cosmoshub-4',
        chain: 'cosmos',
        denom: 'uatom',
        decimals: 6,
        prefix: 'cosmos',
        feeGasStep: {
          high: 0.003,
          medium: 0.0025,
          low: 0.001,
        },
        maxGapAmount: 0.0001,
      },
    };
    provider = new CosmosProvider(
      new ChainDataSource(COSMOS_MANIFESTS.osmosis)
    );
  });

  it('buildTx with insufficient balance should throw an error', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '100000',
      },
      mockProvider,
      MsgEncoding.object
    );

    try {
      await chainMsg.buildTx();
    } catch (e) {
      new Error('Insufficient Balance for transaction');
    }
  });

  it('buildTx with native token x valid amount', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.0001',
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.to).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.value).toEqual('100'); // 0.0001 * 10^6 (manifests decimals)
  });

  it('buildTx with non-native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.0001',
        asset: {
          chainId: 'cosmoshub-4',
          name: 'Neutron',
          symbol: 'NTRN',
          icon: null,
          native: false,
          address: '0xf2f6671173363577a07ff3cb1e1e082f68bc2a48',
          decimals: 18,
        },
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.to).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.value).toEqual('100'); // 0.0001 * 10^6 (manifests decimals)
  });

  it('buildTx with non-native token (NFT)', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.0001',
        asset: {
          chainId: 'cosmoshub-4',
          name: 'Neutron',
          symbol: 'NTRN',
          icon: null,
          native: false,
          address: '0xf2f6671173363577a07ff3cb1e1e082f68bc2a48',
          decimals: 18,
          tokenType: 'NFT',
        },
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.to).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.value).toEqual('100'); // 0.0001 * 10^6 (manifests decimals)
  });

  it('buildTx with IBC token x valid amount', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.0001',
        feeOptions: {
          gasAdjustment: 1,
          gasFee: {
            denom:
              'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
          },
        },
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.to).toEqual(
      'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q'
    );
    expect(response.value).toEqual('100'); // 0.0001 * 10^6 (manifests decimals)
  });

  it('getFee should return fee estimation', async () => {
    CosmosProvider.prototype.getBalance = jest.fn().mockResolvedValue({
      getData: () =>
        new Promise((resolve) =>
          resolve([
            new Coin(
              new Asset({
                chainId: 'osmosis-1',
                name: 'Cosmos Hub',
                symbol: 'ATOM',
                icon: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1555657960',
                native: false,
                id: 'ffd6b64f-ce52-455b-8eb5-250e76d8fc4c',
                address:
                  'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
                price: '8.33',
              }),
              new BigNumber(1000)
            ),
            new Coin(
              new Asset({
                chainId: 'osmosis-1',
                name: 'Osmosis',
                symbol: 'OSMO',
                icon: 'https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/coin_image/tokens/token-osmosis.svg',
                native: true,
                id: '77c3401d-f6e2-41dd-8747-75afbbcaa477',
                price: '0.817933',
              }),
              new BigNumber(1000)
            ),
          ])
        ),
    });
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = provider.createMsg({
      from: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
    });

    const response = await chainMsg.getMaxAmountToSend();

    const feeEstimation = await chainMsg.getFee(GasFeeSpeed.high);
    const gap = provider.manifest?.maxGapAmount || 0;
    expect(response).toEqual(
      new BigNumber('1000')
        .minus(feeEstimation.fee || 0)
        .minus(gap)
        .toString()
    );
  });

  it('should estimate fee with dapp sign doc', async () => {
    const chainMsg = provider.createMsg(
      {
        from: 'osmo185zc74a7w2pfxkv6d06t3kdja65tngjgkn6pqg',
        to: 'osmo185zc74a7w2pfxkv6d06t3kdja65tngjgkn6pqg',
        amount: 0,
        data: '{"signDoc":{"chain_id":"osmosis-1","account_number":"741628","sequence":"689","fee":{"gas":"342048","amount":[]},"msgs":[{"type":"osmosis/smartaccount/add-authenticator","value":{"sender":"osmo185zc74a7w2pfxkv6d06t3kdja65tngjgkn6pqg","authenticator_type":"AllOf","data":"W3sidHlwZSI6IlNpZ25hdHVyZVZlcmlmaWNhdGlvbiIsImNvbmZpZyI6IkF4ekFxUjdKU2dPamhTTlVvams4d2d6YkpOTUpoNUFGeXpTbzczK1VqT1dBIn0seyJ0eXBlIjoiQ29zbXdhc21BdXRoZW50aWNhdG9yVjEiLCJjb25maWciOiJleUpqYjI1MGNtRmpkQ0k2SUNKdmMyMXZNVEI0Y1hZNGNteHdhMlpzZVhkdE9USnJOWGRrYlhCc2VuazNhMmgwWVhOc09XTXlZekE0Y0hOdGRteDFOVFF6YXpjeU5ITjVPVFJyTnpRaUxDQWljR0Z5WVcxeklqb2dJbVY1U25OaFZ6RndaRU5KTmtscVZYZE5SRUYzVFVSQmQwMUVRV2xNUTBwNVdsaE9iR1JHT1hkYVdFcHdZakpSYVU5cFNtdFpXR3RwVEVOS01HRlhNV3hZTW5od1lsZHNNRWxxY0RkSmJWWjFXa05KTmtscVJUTk5lbEV3VDFSTk0wOVVaM2ROUkVGM1RVUkJkMDFFUVdsbVdEQTlJbjA9In0seyJ0eXBlIjoiQW55T2YiLCJjb25maWciOiJXM3NpZEhsd1pTSTZJazFsYzNOaFoyVkdhV3gwWlhJaUxDSmpiMjVtYVdjaU9pSmxlVXBCWkVoc2QxcFRTVFpKYVRsMll6SXhkbU15YkhwTWJrSjJZako0ZEZsWE5XaGFNbFo1VEc1WmVGbHRWakJaVkVWMVZGaE9ibFV6WkdoalJWWTBXVmRPTUZGWE1YWmtWelV3VTFjMGFXWlJQVDBpZlN4N0luUjVjR1VpT2lKTlpYTnpZV2RsUm1sc2RHVnlJaXdpWTI5dVptbG5Jam9pWlhsS1FXUkliSGRhVTBrMlNXazVkbU15TVhaak1teDZURzVDZG1JeWVIUlpWelZvV2pKV2VVeHVXWGhaYlZZd1dWUkZkVlJZVG01Vk0wSnpZVmhTVTJJelZqQmFWazR6V1ZoQ1JtVkhSbXBrUlVaMFlqTldkV1JGYkhWSmJqQTlJbjBzZXlKMGVYQmxJam9pVFdWemMyRm5aVVpwYkhSbGNpSXNJbU52Ym1acFp5STZJbVY1U2tGa1NHeDNXbE5KTmtscE9YWmpNakYyWXpKc2VreHVRblppTW5oMFdWYzFhRm95Vm5sTWJsbDRXVzFXTUZsVVJYVlVXRTV1VlROa2FHTkZWalJaVjA0d1VWY3hkbVJYTlRCVU0xWXdTVzR3UFNKOUxIc2lkSGx3WlNJNklrMWxjM05oWjJWR2FXeDBaWElpTENKamIyNW1hV2NpT2lKbGVVcEJaRWhzZDFwVFNUWkphVGwyWXpJeGRtTXliSHBNYmtKMllqSjRkRmxYTldoYU1sWjVURzVaZUZsdFZqQlpWRVYxVkZoT2JsVXpRbk5oV0ZKVFlqTldNRnBXVGpOWldFSkdaVWRHYW1SRlJuUmlNMVoxWkVVNU1XUkRTamtpZlN4N0luUjVjR1VpT2lKTlpYTnpZV2RsUm1sc2RHVnlJaXdpWTI5dVptbG5Jam9pWlhsS1FXUkliSGRhVTBrMlNXazVkbU15TVhaak1teDZURzFPZG1KdFRteGlibEo1V1ZoU2JGcEhlSEJqV0Zad1drZHNNR1ZUTlRKTlYwcHNaRWRGZUV4ck1YcGFNV1J3WkVkb2EyTnRSak5WUnpsNllWaFNjR0l5TkdsbVVUMDlJbjBzZXlKMGVYQmxJam9pVFdWemMyRm5aVVpwYkhSbGNpSXNJbU52Ym1acFp5STZJbVY1U2tGa1NHeDNXbE5KTmtscE9YWmpNakYyWXpKc2VreHVXbWhpU0U1c1pFaENlVnBYV1hWa2FrWnBXbGhTYUUxVE5VNWpNbVJVV2xoU1YxbFhlSEJhUjBZd1lqTktWRnBZVWxGamJWWnRXbGhLYkdKdFRteEpiakE5SW4xZCJ9XQ=="}}],"memo":"OsmosisFE","timeout_height":"25467355"}}',
        tokenType: 'None',
        decimals: 6,
        gasLimit: 342048,
      },
      MsgEncoding.string
    );
    const buildTx = await chainMsg.buildTx();
    expect(buildTx.msgs.length).toEqual(1);
    expect(buildTx.msgs[0].typeUrl).toEqual(MsgAddAuthenticator.typeUrl);

    const fee = await chainMsg.getFee(GasFeeSpeed.high);
    expect(fee.fee).toBeTruthy();
  });
});
