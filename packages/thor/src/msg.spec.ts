import { MsgEncoding } from '@xdefi-tech/chains-core';
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
                  chainId: 'thorchain-mainnet-v1',
                  name: 'Thor',
                  symbol: 'RUNE',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/thorchain/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '6.03',
                  decimals: 8,
                },
                amount: '1000',
              },
              {
                asset: {
                  chainId: 'thorchain-mainnet-v1',
                  name: 'BLZ',
                  symbol: 'BLZ',
                  icon: null,
                  native: false,
                  address: '0x935a544bf5816e3a7c13db2efe3009ffda0acda2',
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
      estimateFee: jest.fn(() =>
        Promise.resolve([
          {
            gasLimit: 2000000,
            gasPrice: 1,
            maxFeePerGas: 2000000,
            maxPriorityFeePerGas: 2000000,
          },
        ])
      ),
      manifest: {
        name: 'Thor',
        description: '',
        rpcURL: 'https://rpc-proxy.xdefi.services/thornode',
        chainSymbol: 'RUNE',
        blockExplorerURL: 'https://viewblock.io/thorchain',
        chainId: 'thorchain-mainnet-v1',
        chain: 'thorchain',
        denom: 'rune',
        prefix: 'thor',
        decimals: 8,
        feeGasStep: {
          high: 0,
          medium: 0,
          low: 0,
        },
        maxGapAmount: 0.0001,
      },
    };
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        to: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        amount: 0.000001,
        decimals: 8,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();
    const [estimateFee] = await mockProvider.estimateFee();

    expect(response.fee).toEqual(
      new BigNumber(estimateFee.gasLimit.toString())
        .multipliedBy(estimateFee.gasPrice)
        .dividedBy(10 ** mockProvider.manifest.decimals)
        .toString()
    );
    expect(response.maxFee).toBeNull();
  });

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        to: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        amount: 0.000001,
        decimals: 8,
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
        from: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        to: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        amount: 0.000001,
        decimals: 8,
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
        from: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        to: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
        amount: 0.000001,
        decimals: 8,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend(
      '0x935a544bf5816e3a7c13db2efe3009ffda0acda2'
    );
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(new BigNumber('1000').minus(gap).toString());
  });
});
