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
                  chainId: '1',
                  name: 'Ethereum',
                  symbol: 'ETH',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '345.55',
                  decimals: 18,
                },
                amount: '1000',
              },
              {
                asset: {
                  chainId: '1',
                  name: 'NuLink',
                  symbol: 'NLINK',
                  icon: null,
                  native: false,
                  address: '0x493c8d6a973246a7B26Aa8Ef4b1494867A825DE5',
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
          fee: '0.000167265',
          maxFee: '0.000169785',
        })
      ),
      estimateFee: jest.fn(() =>
        Promise.resolve([
          {
            baseFeePerGas: 22000000000,
            gasLimit: 31500,
            gasPrice: undefined,
            maxFeePerGas: 28330000000,
            maxPriorityFeePerGas: 70000000,
          },
        ])
      ),
      manifest: {
        name: 'Ethereum',
        description: '',
        rpcURL: 'https://ethereum-mainnet.xdefiservices.com',
        chainSymbol: 'ETH',
        blockExplorerURL: 'https://etherscan.io',
        chainId: '1',
        chain: 'ethereum',
        decimals: 18,
        feeGasStep: {
          high: 1.5,
          medium: 1.25,
          low: 1,
        },
        multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        maxGapAmount: 0.0001,
      },
    };
  });

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 0.000001,
        nonce: 0,
        decimals: 18,
        chainId: 1,
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
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 0.000001,
        nonce: 0,
        decimals: 18,
        chainId: 1,
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
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 0.000001,
        nonce: 0,
        decimals: 18,
        chainId: 1,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend(
      '0x493c8d6a973246a7B26Aa8Ef4b1494867A825DE5'
    );
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(new BigNumber('1000').minus(gap).toString());
  });
});
