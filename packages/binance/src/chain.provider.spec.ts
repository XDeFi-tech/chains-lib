import {
  Response,
  GasFeeSpeed,
  TransactionStatus,
} from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { BinanceProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BINANCE_MANIFEST } from './manifests';

describe('chain.provider', () => {
  const NETWORKED_QUERIES =
    process.env.NETWORKED_QUERIES === '1' ? true : false;

  let provider: BinanceProvider;

  beforeEach(() => {
    provider = new BinanceProvider(new IndexerDataSource(BINANCE_MANIFEST));
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    const msg = provider.createMsg({
      from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      amount: 0.000001,
      denom: 'bnb',
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('getBalance() should return balance data', async () => {
    if (!NETWORKED_QUERIES) {
      jest.spyOn(BinanceProvider.prototype, 'getBalance').mockResolvedValue(
        new Response(
          // getData
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'Binance-Chain-Tigris',
                name: 'Andy',
                symbol: 'ANDY',
                icon: null,
                native: false,
                address: '0x1b0e27D4733b5e6499354085114F2A5D21A00C60',
                decimals: 8,
                price: '0.00008282',
                priceChange: {
                  dayPriceChange: '-0.00000001',
                },
              },
              amount: '1000',
            },
          ]),
          // getObserver
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'Binance-Chain-Tigris',
                name: 'Andy',
                symbol: 'ANDY',
                icon: null,
                native: false,
                address: '0x1b0e27D4733b5e6499354085114F2A5D21A00C60',
                decimals: 8,
                price: '0.00008282',
                priceChange: {
                  dayPriceChange: '-0.00000001',
                },
              },
              amount: '1000',
            },
          ])
        )
      );

      const balance = await provider.getBalance(
        '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toEqual(1);
      expect(balanceData[0].amount).toEqual('1000');
      expect(balanceData[0].asset.symbol).toEqual('ANDY');
      expect(balanceData[0].asset.price).toEqual('0.00008282');
      expect(balanceData[0].asset.priceChange.dayPriceChange).toEqual(
        '-0.00000001'
      );
    } else {
      const balance = await provider.getBalance(
        '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toEqual(0);
    }
  });

  it('estimateFee() should return fee estimation', async () => {
    jest.spyOn(BinanceProvider.prototype, 'estimateFee').mockResolvedValue([
      {
        gasLimit: 1,
        gasPrice: 1,
        maxFeePerGas: 1,
        baseFeePerGas: 1,
        maxPriorityFeePerGas: 1,
      },
    ]);

    const msg = provider.createMsg({
      from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      amount: 0.000001,
      denom: 'bnb',
    });

    const estimateFee = await provider.estimateFee([msg], GasFeeSpeed.medium);

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  jest.setTimeout(15000);

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    jest.spyOn(BinanceProvider.prototype, 'getTransaction').mockResolvedValue({
      hash: '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw',
      to: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      from: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      status: TransactionStatus.pending,
      amount: '1000',
    });

    const txData = await provider.getTransaction(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );

    expect(txData?.hash).toEqual(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );
  });
});
