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
          high: 0.033,
          low: 0.011,
          medium: 0.0275,
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
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.000001',
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee(GasFeeSpeed.medium);

    const [feeEstimation] = await mockProvider.estimateFee(
      [chainMsg],
      GasFeeSpeed.medium
    );

    expect(response.fee).toEqual(
      new BigNumber(feeEstimation.gasLimit.toString())
        .multipliedBy(feeEstimation.gasPrice.toString())
        .dividedBy(10 ** mockProvider.manifest.decimals)
        .toString()
    );

    expect(response.maxFee).toBeNull();
  });

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.000001',
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
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.000001',
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
        from: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        to: 'cosmos1g6qu6hm4v3s3vq7438jehn9fzxg9p720yesq2q',
        amount: '0.000001',
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend(
      '0xf2f6671173363577a07ff3cb1e1e082f68bc2a48'
    );
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(new BigNumber('1000').minus(gap).toString());
  });
});
