import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';

import { ChainMsg } from './msg';

describe('msg', () => {
  let mockProvider: any;

  beforeEach(() => {
    mockProvider = {
      getBalance: jest.fn(() =>
        Promise.resolve({
          getData: jest.fn(() =>
            Promise.resolve([
              {
                asset: {
                  chainId: 'Binance-Chain-Tigris',
                  name: 'Binance Coin',
                  symbol: 'BNB',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '594.61',
                  decimals: 8,
                },
                amount: '1000',
              },
              {
                asset: {
                  chainId: 'Binance-Chain-Tigris',
                  name: 'Andy',
                  symbol: 'ANDY',
                  icon: null,
                  native: false,
                  address: '0x1b0e27D4733b5e6499354085114F2A5D21A00C60',
                  decimals: 8,
                },
                amount: '1000',
              },
            ])
          ),
        })
      ),
      gasFeeOptions: jest.fn(() =>
        Promise.resolve({
          high: 7500,
          low: 7500,
          medium: 7500,
        })
      ),
      manifest: {
        name: 'Binance',
        description: '',
        rpcURL: 'https://bbc-dex.xdefiservices.com',
        chainSymbol: 'BNB',
        blockExplorerURL: 'https://explorer.bnbchain.org',
        chainId: 'Binance-Chain-Tigris',
        chain: 'binance',
        decimals: 8,
        feeGasStep: {
          high: 1,
          medium: 1,
          low: 1,
        },
        maxGapAmount: 0.0001,
      },
    };
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        amount: 0.000001,
        denom: 'bnb',
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();

    const fee = await mockProvider.gasFeeOptions();

    expect(response.fee).toEqual(
      new BigNumber(fee[GasFeeSpeed.medium] as number)
        .dividedBy(10 ** mockProvider.manifest.decimals)
        .toString()
    );
    expect(response.maxFee).toBeNull();
  });

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        amount: 0.000001,
        denom: 'bnb',
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = chainMsg.getMaxAmountToSend('invalid');

    await expect(response).rejects.toThrowError();
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        amount: 0.000001,
        denom: 'bnb',
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend();

    const feeEstimation = await chainMsg.getFee();
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(
      new BigNumber('1000')
        .minus(feeEstimation.fee || 0)
        .minus(gap)
        .toString()
    );
  });

  it('should return MaxAmountToSend with non-native-token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        amount: 0.000001,
        denom: 'bnb',
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend(
      '0x1b0e27D4733b5e6499354085114F2A5D21A00C60'
    );
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(new BigNumber('1000').minus(gap).toString());
  });
});
