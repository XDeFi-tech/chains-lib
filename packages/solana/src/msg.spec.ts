import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

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
                  chainId: 'mainnet-beta',
                  name: 'Solana',
                  symbol: 'SOL',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '123',
                  decimals: 8,
                },
                amount: '1000',
              },
              {
                asset: {
                  chainId: 'mainnet-beta',
                  name: 'Bonk',
                  symbol: 'BONK',
                  icon: null,
                  native: false,
                  address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
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
          high: 25000,
          low: 2500,
          medium: 5000,
        })
      ),
      manifest: {
        name: 'Solana',
        description: '',
        rpcURL: 'https://solanalb-rpc.xdefi.services',
        chainSymbol: 'SOL',
        blockExplorerURL: 'https://explorer.solana.com/',
        chainId: 'mainnet-beta',
        chain: 'solana',
        decimals: 6,
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
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();
    const feeOptions = await mockProvider.gasFeeOptions();

    expect(response.fee).toEqual(
      new BigNumber(feeOptions[GasFeeSpeed.medium] as number)
        .dividedBy(LAMPORTS_PER_SOL)
        .toString()
    );
    expect(response.maxFee).toBeNull();
  });

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
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
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
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

  it('should return MaxAmountToSend with non-native-token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend(
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
    );
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(new BigNumber('1000').minus(gap).toString());
  });
});
