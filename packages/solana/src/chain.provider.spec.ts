import { Response } from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { SolanaProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';

describe('chain.provider', () => {
  let provider: SolanaProvider;

  beforeEach(() => {
    provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      '2d2QPayaPHj3ZxJ5Ws6ig67HKWLD7FyrGQjpRHz6sHEPHA1apzWqS3MzG1jWRrAgELu79cXgHxjK2V6BcFKUWKJo'
    );
    expect(txData?.hash).toEqual(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );
  });

  it('should get a balance', async () => {
    jest.spyOn(SolanaProvider.prototype, 'getBalance').mockResolvedValue(
      new Response(
        jest.fn().mockImplementation(async () => []),
        jest.fn().mockImplementation(async () => [])
      )
    );
    const balance = await provider.getBalance(
      'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'
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
