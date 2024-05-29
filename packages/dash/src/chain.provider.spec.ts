import { TransactionAction, TransactionStatus } from '@xdefi-tech/chains-core';
import { ChainMsg } from '@xdefi-tech/chains-utxo';

import { DashProvider } from './chain.provider';
import { ChainDataSource } from './datasource';
import { DASH_MANIFEST } from './manifests';

describe('chain.provider', () => {
  let provider: DashProvider;

  beforeEach(() => {
    provider = new DashProvider(new ChainDataSource(DASH_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      from: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      from: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });


  it('should return a transaction', async () => {
    const tx = (await provider.getTransaction(
      'd44b011213200e873f8cfc0bcb632e246fa50df5e99c9f8dfe4326822df8ed66'
    ))!;

    expect(tx.hash).toEqual(
      'd44b011213200e873f8cfc0bcb632e246fa50df5e99c9f8dfe4326822df8ed66'
    );
    expect(tx.from).toEqual('XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk');
    expect(tx.to).toEqual('Xc86Pp9UqFAx48ejLCueSxjuDn57K21Tfa');
    expect(tx.status).toEqual(TransactionStatus.success);
    expect(tx.action).toEqual(TransactionAction.SEND);
    expect(tx.date).toEqual(1716459573000);
  });

  it('should return a coinbase transaction', async () => {
    const tx = (await provider.getTransaction(
      'c4298d352e577f01d89ff9399ebf7073721b297f27020591908814eaca2e411b'
    ))!;

    expect(tx.hash).toEqual(
      'c4298d352e577f01d89ff9399ebf7073721b297f27020591908814eaca2e411b'
    );
    expect(tx.from).toEqual('');
    expect(tx.to).toEqual('XvW5YcFFy4rrVpQfVW13yjo6SN7iKFHdF5');
    expect(tx.status).toEqual(TransactionStatus.success);
    expect(tx.action).toEqual(TransactionAction.SEND);
    expect(tx.date).toEqual(1390851454000);
  });


  it('should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });



  it('should get a balance', async () => {
    const balance = await provider.getBalance(
      'Xn2B7Fpr4dhoQS8vVXGWJkHwomVJmCtQH6'
    );

    const balanceData = await balance.getData();

    expect(balanceData.length).toEqual(0);
  });


  it('should throw for a non-existant transaction on the blockchain', async () => {
    expect(
      provider.getTransaction(
        'deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'
      )
    ).rejects.toThrow();
  });
  //
  // it('should create message with memo as string', async () => {
  //   const memo = 'Test string memo';
  //   const msg = provider.createMsg({
  //     to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
  //     from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
  //     amount: 0.000001,
  //     memo: memo,
  //   });
  //
  //   expect(msg).toBeInstanceOf(ChainMsg);
  //   expect(msg.toData().memo).toEqual(memo);
  // });
  //
  // it('should create message with memo as Uint8Array', async () => {
  //   const memo = 'Test string memo';
  //   const encodedMemo = new TextEncoder().encode(memo);
  //   const msg = provider.createMsg({
  //     to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
  //     from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
  //     amount: 0.000001,
  //     memo: encodedMemo,
  //   });
  //
  //   expect(msg).toBeInstanceOf(ChainMsg);
  //   expect(msg.toData().memo).toEqual(encodedMemo);
  //   expect(new TextDecoder().decode(msg.toData().memo as Uint8Array)).toEqual(
  //     memo
  //   );
  // });
});
