import { MsgEncoding, Asset, Coin, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';

import { ChainDataSource } from './datasource';
import { COSMOS_MANIFESTS } from './manifests';
import { CosmosProvider } from './chain.provider';
import { ChainMsg } from './msg';

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
});
