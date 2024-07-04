import {
  Response,
  GasFeeSpeed,
  TransactionStatus,
  Coin,
} from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { SolanaProvider } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';

describe('chain.provider', () => {
  const NETWORKED_QUERIES =
    process.env.NETWORKED_QUERIES === '1' ? true : false;

  let chainProvider: SolanaProvider;
  let indexProvider: SolanaProvider;

  beforeEach(() => {
    chainProvider = new SolanaProvider(new ChainDataSource(SOLANA_MANIFEST));
    indexProvider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    let msg = chainProvider.createMsg({
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);

    msg = indexProvider.createMsg({
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('getBalance() should return balance data', async () => {
    if (!NETWORKED_QUERIES) {
      jest.spyOn(SolanaProvider.prototype, 'getBalance').mockResolvedValue(
        new Response(
          // getData
          jest.fn().mockImplementation(async () => [
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
          ]),
          // getObserver
          jest.fn().mockImplementation(async () => [
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
        )
      );

      const balance = await chainProvider.getBalance(
        'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toEqual(2);
      expect(balanceData[0].amount).toEqual('1000');
      expect(balanceData[0].asset.symbol).toEqual('SOL');
      expect(balanceData[1].amount).toEqual('1000');
      expect(balanceData[1].asset.symbol).toEqual('BONK');
    } else {
      const balance = await chainProvider.getBalance(
        'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toBeGreaterThanOrEqual(0);
      if (balanceData.length > 0) {
        expect(balanceData[0]).toBeInstanceOf(Coin);
        expect(balanceData[0].amount).toBeTruthy();
      }
    }
  });

  it('estimateFee() should return fee estimation', async () => {
    jest.spyOn(SolanaProvider.prototype, 'estimateFee').mockResolvedValue([
      {
        gasLimit: 1,
        gasPrice: 1,
        maxFeePerGas: 1,
        baseFeePerGas: 1,
        maxPriorityFeePerGas: 1,
      },
    ]);

    const msg = chainProvider.createMsg({
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    });

    const estimateFee = await chainProvider.estimateFee(
      [msg],
      GasFeeSpeed.medium
    );

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    jest.spyOn(SolanaProvider.prototype, 'gasFeeOptions').mockResolvedValue({
      high: 0.003,
      medium: 0.0025,
      low: 0.001,
    });

    const feeOptions = await chainProvider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    jest.spyOn(SolanaProvider.prototype, 'getTransaction').mockResolvedValue({
      hash: '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw',
      to: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      from: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      status: TransactionStatus.pending,
      amount: '1000',
    });

    const txData = await chainProvider.getTransaction(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );

    expect(txData?.hash).toEqual(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );
  });

  it('should return false when verifying an invalid address', () => {
    expect(SolanaProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid address', () => {
    expect(
      SolanaProvider.verifyAddress(
        'BujFXMX9ZmniuJCM2VRKQqe1enmcoFxfUBmRqCMqKGic'
      )
    ).toBe(true);
  });
});
