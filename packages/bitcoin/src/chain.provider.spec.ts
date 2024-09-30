import { Coin, Response, TransactionStatus } from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { BitcoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOIN_MANIFEST } from './manifests';
import { AssetInternalType, TokenCategory } from './gql';

describe('chain.provider', () => {
  const NETWORKED_QUERIES =
    process.env.NETWORKED_QUERIES === '1' ? true : false;

  let provider: BitcoinProvider;

  beforeEach(() => {
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    const msg = provider.createMsg({
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('createMsg() should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  jest.setTimeout(15000);

  it('getBalance() should return balance data', async () => {
    if (!NETWORKED_QUERIES) {
      jest.spyOn(BitcoinProvider.prototype, 'getBalance').mockResolvedValue(
        new Response(
          // getData
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '65000.00',
                decimals: 8,
                priceChange: {
                  dayPriceChange: '-4.187565214298426',
                },
                type: AssetInternalType.CRYPTOCURRENCY,
                categories: [TokenCategory.TRENDING_TOKEN],
              },
              amount: '100',
            },
          ]),
          // getObserver
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '65000.00',
                decimals: 8,
                priceChange: {
                  dayPriceChange: '-4.187565214298426',
                },
                type: AssetInternalType.CRYPTOCURRENCY,
                categories: [TokenCategory.TRENDING_TOKEN],
              },
              amount: '100',
            },
          ])
        )
      );

      const balance = await provider.getBalance(
        'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toEqual(1);
      expect(balanceData[0].amount).toEqual('100');
      expect(balanceData[0].asset.symbol).toEqual('BTC');
      expect(balanceData[0].asset.price).toEqual('65000.00');
      expect(balanceData[0].asset.priceChange.dayPriceChange).toEqual(
        '-4.187565214298426'
      );
      expect(balanceData[0].asset.type).toEqual(
        AssetInternalType.CRYPTOCURRENCY
      );
      expect(JSON.stringify(balanceData[0].asset.categories)).toEqual(
        JSON.stringify([TokenCategory.TRENDING_TOKEN])
      );
    } else {
      const balance = await provider.getBalance(
        'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toBeGreaterThanOrEqual(0);
      expect(balanceData[0]).toBeInstanceOf(Coin);
      expect(balanceData[0].amount).toBeTruthy();
      expect(balanceData[0].asset.symbol).toEqual('BTC');
      expect(balanceData[0].asset.price).toBeTruthy();
      expect(balanceData[0].asset.priceChange.dayPriceChange).toBeTruthy();
    }
  });

  jest.setTimeout(20000);

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    jest.spyOn(BitcoinProvider.prototype, 'getTransaction').mockResolvedValue({
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
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
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
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
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
    expect(BitcoinProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid address starts with "bc1" and 39 characters', () => {
    expect(
      BitcoinProvider.verifyAddress(
        'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid address starts with "bc1" and 59 characters', () => {
    expect(
      BitcoinProvider.verifyAddress(
        'bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid address starts with "1"', () => {
    expect(
      BitcoinProvider.verifyAddress('1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF')
    ).toBe(true);
  });

  it('should return true when verifying a valid address starts with "3"', () => {
    expect(
      BitcoinProvider.verifyAddress('34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo')
    ).toBe(true);
  });
});
