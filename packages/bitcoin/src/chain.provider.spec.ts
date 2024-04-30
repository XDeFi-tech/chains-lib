import { ChainMsg } from './msg';
import { BitcoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOIN_MANIFEST } from './manifests';

jest.mock('./datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('chain.provider', () => {
  let provider: BitcoinProvider;

  beforeEach(() => {
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
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
      'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz'
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

  it('should create message with memo as string', async () => {
    const memo = 'Test string memo';
    const msg = provider.createMsg({
      to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
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
      to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      amount: 0.000001,
      memo: encodedMemo,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
    expect(msg.toData().memo).toEqual(encodedMemo);
    expect(new TextDecoder().decode(msg.toData().memo as Uint8Array)).toEqual(
      memo
    );
  });
});
