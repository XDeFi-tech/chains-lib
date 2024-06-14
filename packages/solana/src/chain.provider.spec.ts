import { Response } from '@xdefi-tech/chains-core';

import { ChainMsg } from './msg';
import { SolanaProvider } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';

describe('chain.provider', () => {
  let chainProvider: SolanaProvider;
  let indexProvider: SolanaProvider;

  beforeEach(() => {
    chainProvider = new SolanaProvider(new ChainDataSource(SOLANA_MANIFEST));
    indexProvider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
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

  it('should get a transaction from the blockchain', async () => {
    let txData = await chainProvider.getTransaction(
      '2d2QPayaPHj3ZxJ5Ws6ig67HKWLD7FyrGQjpRHz6sHEPHA1apzWqS3MzG1jWRrAgELu79cXgHxjK2V6BcFKUWKJo'
    );
    expect(txData?.hash).toEqual(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );

    txData = await indexProvider.getTransaction(
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
    let balance = await indexProvider.getBalance(
      'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'
    );

    let balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);

    balance = await chainProvider.getBalance(
      'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'
    );

    balanceData = await balance.getData();
    expect(balanceData.length).toEqual(0);
  });

  it('should throw for a non-existant transaction on the blockchain', async () => {
    expect(
      chainProvider.getTransaction(
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      )
    ).rejects.toThrow();

    expect(
      indexProvider.getTransaction(
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      )
    ).rejects.toThrow();
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
