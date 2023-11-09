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

  it('should get a transaction from the blockchain', async () => {
    const txData = await provider.getTransaction(
      'f8e262c3871981fcab7ae129c426ee741c61653485c9fe831b53cb891a3ff42a'
    );
    expect(txData?.from).toEqual('TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18');
    expect(txData?.hash).toEqual(
      'f8e262c3871981fcab7ae129c426ee741c61653485c9fe831b53cb891a3ff42a'
    );
  });

  it('should not get an address nonce', async () => {
    expect(
      provider.getNonce('TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52')
    ).rejects.toThrow();
  });

  it('should get fee options', async () => {
    expect(provider.gasFeeOptions()).rejects.toThrow();
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
