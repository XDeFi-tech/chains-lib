import { ChainMsg } from '@xdefi-tech/chains-utxo';

import { DogecoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { DOGECOIN_MANIFEST } from './manifests';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('chain.provider', () => {
  let provider: DogecoinProvider;

  beforeEach(() => {
    provider = new DogecoinProvider(new IndexerDataSource(DOGECOIN_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      from: 'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('should get transactions for an address from the blockchain', async () => {
    const txData = await provider.getTransactions(
      'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn',
      0
    );
    expect((await txData.getData()).length).toBeGreaterThan(0);
  });

  it('should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('should get a balance', async () => {
    const balance = await provider.getBalance(
      'DPbphsB3Hgb4Q2Sz32e2NoLbmofMNrp1wn'
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
