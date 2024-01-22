import { ChainMsg } from './msg';
import { TronProvider } from './chain.provider';
import { ChainDataSource } from './datasource';
import { TRON_MANIFEST } from './manifests';

describe('chain.provider', () => {
  let provider: TronProvider;

  beforeEach(() => {
    provider = new TronProvider(new ChainDataSource(TRON_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({});

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({});

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('should get transactions for an address from the blockchain', async () => {
    const txData = await provider.getTransactions(
      'TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18'
    );
    expect((await txData.getData()).length).toBeGreaterThanOrEqual(0);
  });

  it('should get a token transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      '992151e0fafb2e86504efbfd42074434af1ac03f460b2e96b687338471e7c79d'
    );
    expect(txData?.to).toEqual('TTd9qHyjqiUkfTxe3gotbuTMpjU8LEbpkN');
    expect(txData?.from).toEqual('TBP3zWQPLXyEJx3QuBBvC4qZxbDWq7zQuC');
    expect(txData?.hash).toEqual(
      '992151e0fafb2e86504efbfd42074434af1ac03f460b2e96b687338471e7c79d'
    );
    expect(txData?.amount).toEqual('32546790000');
    expect(txData?.contractAddress).toEqual(
      'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    );
  });

  it('should get all transactions from the blockchain for an address', async () => {
    const txData = await (
      provider.dataSource as ChainDataSource
    ).getTransactionsForAddress({
      address: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
    });

    expect(txData.length).toBeGreaterThan(0);

    const tx = txData[txData.length - 1];
    expect(tx.hash).toEqual(
      '1c905f8bf7de95f2152f7f47e2b1d9c1c9a3ca9cc15563faafc30bad3e08b363'
    );
    expect(tx.from).toEqual('TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18');
    expect(tx.to).toEqual('TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH');
    expect(tx.amount).toEqual('10000');
    expect(tx.action).toBe('receive');
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      'f8e262c3871981fcab7ae129c426ee741c61653485c9fe831b53cb891a3ff42a'
    );
    expect(txData?.to).toEqual('TDzBR3gNA9FSgQxPhzDNqXDg3DjjUbapYr');
    expect(txData?.from).toEqual('TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18');
    expect(txData?.hash).toEqual(
      'f8e262c3871981fcab7ae129c426ee741c61653485c9fe831b53cb891a3ff42a'
    );
    expect(txData?.amount).toEqual('665000000');
    expect(txData?.contractAddress).toBeFalsy();
  });

  it('should not get an address nonce', async () => {
    expect(
      provider.getNonce('TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52')
    ).rejects.toThrow();
  });

  it('should get a balance for a valid address', async () => {
    const balance = await provider.getBalance(
      'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(1);
    expect(balanceData[0].amount.toNumber()).toBeGreaterThanOrEqual(0);
    expect(balanceData[0].asset.name).toEqual('Tron');
  });
});
