import { MsgEncoding, GasFeeSpeed } from '@ctrl-tech/chains-core';
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
                  chainId: 'dogecoin',
                  name: 'Dogecoin',
                  symbol: 'DOGE',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/dogecoin/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '443.21',
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
          high: 250000000,
          low: 25000000,
          medium: 25000000,
        })
      ),
      manifest: {
        name: 'Dogecoin',
        description: '',
        rpcURL: 'https://blockstream.info',
        chainSymbol: 'DOGE',
        blockExplorerURL: 'https://blockchair.com/dogecoin',
        chainId: 'dogecoin',
        chain: 'dogecoin',
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
        from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();
    const feeOptions = await mockProvider.gasFeeOptions();

    expect(response.fee).toEqual(
      new BigNumber(feeOptions[GasFeeSpeed.medium] as number)
        .dividedBy(10 ** mockProvider.manifest.decimals)

        .toString()
    );
    expect(response.maxFee).toBeNull();
  });

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        amount: 0.000001,
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
        from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        amount: 0.000001,
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
});
