import { Coin } from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { BitcoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOIN_MANIFEST } from './manifests';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [
      {
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        amount: {
          value: '0',
        },
        asset: {
          chain: 'Bitcoin',
          contract: null,
          id: 'bcafa2bf-d442-483a-96a4-0199f4371678',
          name: 'Bitcoin',
          symbol: 'BTC',
          image:
            'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
          decimals: 8,
          price: {
            amount: '67310',
          },
          type: 'CRYPTOCURRENCY',
        },
      },
    ];
  },
}));

describe('chain.provider', () => {
  let provider: BitcoinProvider;

  beforeEach(() => {
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      'e8c12eae2a7f9a2421f991fab4a617c16fd261d0c67b497260a97895a811b81b'
    );
    expect(txData?.hash).toEqual(
      'e8c12eae2a7f9a2421f991fab4a617c16fd261d0c67b497260a97895a811b81b'
    );
  });

  it('should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('should get a balance', async () => {
    const balance = await provider.getBalance(
      'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0]).toBeInstanceOf(Coin);
  });

  it('should throw for a non-existant transaction on the blockchain', async () => {
    expect(
      provider.getTransaction(
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      )
    ).rejects.toThrow();
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
