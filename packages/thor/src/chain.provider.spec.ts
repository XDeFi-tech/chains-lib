import { ChainMsg } from './msg';
import { ThorProvider } from './chain.provider';
import { ChainDataSource } from './datasource';
import { THOR_MANIFEST } from './manifests';
import { Response } from '@xdefi-tech/chains-core';

describe('chain.provider', () => {
  let provider: ThorProvider;

  beforeEach(() => {
    provider = new ThorProvider(new ChainDataSource(THOR_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      from: 'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94',
      amount: 0.000001,
      decimals: 18,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      '30D580A3E1CA1D440BF2AB4081D9C0D834C833646ADE834EE52F1A255E5053B0'
    );
    expect(txData?.hash).toEqual(
      '30D580A3E1CA1D440BF2AB4081D9C0D834C833646ADE834EE52F1A255E5053B0'
    );
  });

  it('should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeDefined();
    expect(feeOptions?.medium).toBeDefined();
    expect(feeOptions?.high).toBeDefined();
  });

  it('should get a balance', async () => {
    jest.spyOn(ThorProvider.prototype, 'getBalance').mockResolvedValue(
      new Response(
        jest.fn().mockImplementation(async () => []),
        jest.fn().mockImplementation(async () => [])
      )
    );
    const balance = await provider.getBalance(
      'thor1hccrcavupf7wnl2klud40lan00zp0q3u807g94'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);
  });

  it('should throw for a non-existant transaction on the blockchain', async () => {
    expect(
      provider.getTransaction(
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      )
    ).rejects.toThrow();
  });
});
