import { Response, Coin, TransactionStatus } from '@xdefi-tech/chains-core';

import { BitcoinCashProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOINCASH_MANIFEST } from './manifests';
import { ChainMsg } from './msg';

describe('chain.provider', () => {
  const NETWORKED_QUERIES =
    process.env.NETWORKED_QUERIES === '1' ? true : false;

  let provider: BitcoinCashProvider;

  beforeEach(() => {
    provider = new BitcoinCashProvider(
      new IndexerDataSource(BITCOINCASH_MANIFEST)
    );
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    const msg = provider.createMsg({
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('createMsg() should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      'eceb6281ac75c6306c2766f15fea47ab4a7cfbc8e865d5f75a0c4b8f8256fe59'
    );
    expect(txData?.hash).toEqual(
      'eceb6281ac75c6306c2766f15fea47ab4a7cfbc8e865d5f75a0c4b8f8256fe59'
    );
  });

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  jest.setTimeout(20000);

  it('getBalance() should return balance data', async () => {
    if (!NETWORKED_QUERIES) {
      jest.spyOn(BitcoinCashProvider.prototype, 'getBalance').mockResolvedValue(
        new Response(
          // getData
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'bitcoincash',
                name: 'Bitcoin Cash',
                symbol: 'BCH',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoincash/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '443.21',
                decimals: 8,
              },
              amount: '1000',
            },
          ]),
          // getObserver
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'bitcoincash',
                name: 'Bitcoin Cash',
                symbol: 'BCH',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoincash/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '443.21',
                decimals: 8,
              },
              amount: '1000',
            },
          ])
        )
      );

      const balance = await provider.getBalance(
        'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toEqual(1);
      expect(balanceData[0].amount).toEqual('1000');
      expect(balanceData[0].asset.symbol).toEqual('BCH');
    } else {
      const balance = await provider.getBalance(
        'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toBeGreaterThanOrEqual(0);
      if (balanceData.length > 0) {
        expect(balanceData[0]).toBeInstanceOf(Coin);
        expect(balanceData[0].amount).toBeTruthy();
        expect(balanceData[0].asset.symbol).toEqual('BCH');
      }
    }
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    jest
      .spyOn(BitcoinCashProvider.prototype, 'getTransaction')
      .mockResolvedValue({
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

  it('should create message with memo as string', async () => {
    const memo = 'Test string memo';
    const msg = provider.createMsg({
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
      memo: memo,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
    expect(msg.toData().memo).toEqual(memo);
  });

  it('should create message with memo as Uint8Array', async () => {
    const memo = 'Test string memo';
    const encodedMemo = new TextEncoder().encode(memo);
    const msg = provider.createMsg({
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
      memo: encodedMemo,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
    expect(msg.toData().memo).toEqual(encodedMemo);
    expect(new TextDecoder().decode(msg.toData().memo as Uint8Array)).toEqual(
      memo
    );
  });

  it('should return false when verifying an invalid address', () => {
    expect(BitcoinCashProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid address with network prefix', () => {
    expect(
      BitcoinCashProvider.verifyAddress(
        'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid address without network prefix', () => {
    expect(
      BitcoinCashProvider.verifyAddress(
        'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid legacy address', () => {
    expect(
      BitcoinCashProvider.verifyAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR')
    ).toBe(true);
  });
});
