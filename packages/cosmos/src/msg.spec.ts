import BigNumber from 'bignumber.js';
import { Asset, Coin } from '@xdefi-tech/chains-core';

import { ChainDataSource } from './datasource';
import { COSMOS_MANIFESTS } from './manifests';
import { CosmosProvider } from './chain.provider';

jest.mock('./chain.provider', () => {
  const originModule = jest.requireActual('./chain.provider');

  return {
    __esModule: true,
    ...originModule,
  };
});

describe('msg', () => {
  let provider: CosmosProvider;

  beforeEach(() => {
    provider = new CosmosProvider(
      new ChainDataSource(COSMOS_MANIFESTS.osmosis)
    );

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

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = provider.createMsg({
      from: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
    });

    const response = chainMsg.getMaxAmountToSend('invalid');

    await expect(response).rejects.toThrowError('No balance found');
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = provider.createMsg({
      from: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
    });

    const response = await chainMsg.getMaxAmountToSend();

    const feeEstimation = await chainMsg.getFee();
    const gap = provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(
      new BigNumber('1000')
        .minus(feeEstimation.fee || 0)
        .minus(gap)
        .toString()
    );
  });

  it('should return MaxAmountToSend with ibc token as fee', async () => {
    const chainMsg = provider.createMsg({
      from: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
      feeOptions: {
        gasAdjustment: 1,
        gasFee: {
          denom:
            'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
        },
      },
    });

    const response = await chainMsg.getMaxAmountToSend(
      'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2'
    );

    const feeEstimation = await chainMsg.getFee();
    const gap = provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(
      new BigNumber('1000')
        .minus(feeEstimation.fee || 0)
        .minus(gap)
        .toString()
    );
  });

  it('should reject if not hold token', async () => {
    const chainMsg = provider.createMsg({
      from: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
      feeOptions: {
        gasAdjustment: 1,
        gasFee: {
          denom:
            'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
        },
      },
    });

    await expect(
      chainMsg.getMaxAmountToSend(
        'ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518'
      )
    ).rejects.toThrowError('No balance found');
  });

  it('should return the full amount', async () => {
    const chainMsg = provider.createMsg({
      from: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      to: 'osmo1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn8ra5mf',
      amount: '0.000001',
    });

    const response = await chainMsg.getMaxAmountToSend(
      'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2'
    );

    const gap = provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(new BigNumber('1000').minus(gap).toString());
  });
});
