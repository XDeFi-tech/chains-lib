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
                  chainId: '0x2b6653dc',
                  name: 'Tron',
                  symbol: 'TRX',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '0.13',
                  decimals: 18,
                },
                amount: '1000',
              },
              {
                asset: {
                  chainId: '0x2b6653dc',
                  name: 'WINkLink',
                  symbol: 'WIN',
                  icon: null,
                  native: false,
                  address: 'TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7',
                  decimals: 18,
                },
                amount: '1000',
              },
            ])
          ),
        })
      ),
      gasFeeOptions: jest.fn(() =>
        Promise.resolve({
          high: 5000,
          low: 500,
          medium: 1000,
        })
      ),
      estimateFee: jest.fn(() =>
        Promise.resolve([
          {
            bandwidth: 1000,
            energy: 0,
            fee: 0,
            willRevert: false,
          },
        ])
      ),
      manifest: {
        name: 'Tron',
        description: '',
        rpcURL: 'https://api.trongrid.io',
        chainSymbol: 'TRX',
        blockExplorerURL: 'https://tronscan.org',
        dataProviderType: 'trongrid',
        dataProviderURL: 'https://api.trongrid.io',
        chainId: '0x2b6653dc',
        chain: 'tron',
        decimals: 16,
        feeGasStep: {
          high: 1,
          medium: 1,
          low: 1,
        },
        maxGapAmount: 0.0001,
      },
    };
  });

  it('buildTx with native token x valid amount', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52',
        to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
        amount: 1000,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response).toHaveProperty('txID');
    expect(response).toHaveProperty('raw_data_hex');
    expect(response).toHaveProperty('raw_data');
  });

  it('buildTx with non-native token (TRC10)', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52',
        to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
        decimals: 18,
        tokenId: '10',
        amount: 1000,
        contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response).toHaveProperty('txID');
    expect(response).toHaveProperty('raw_data_hex');
    expect(response).toHaveProperty('raw_data');
  });

  it('buildTx with non-native token (TRC20)', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52',
        to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
        decimals: 18,
        tokenId: '1002000',
        amount: 1000,
        contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response).toHaveProperty('txID');
    expect(response).toHaveProperty('raw_data_hex');
    expect(response).toHaveProperty('raw_data');
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
});
