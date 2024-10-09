/* eslint-disable @typescript-eslint/no-non-null-assertion */
import TronWeb from 'tronweb';

import { ChainMsg, TokenType } from './msg';
import { TronProvider } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { TRON_MANIFEST } from './manifests';
import PrivateKeySigner from './signers/private-key.signer';

interface TronProviders {
  chain: TronProvider;
  indexer: TronProvider;
}

global.XMLHttpRequest = XMLHttpRequest;

jest.spyOn(TronWeb, 'createAccount').mockResolvedValue({
  address: {
    base58: 'TDpBe64DqirkKWj6HWuR1pWgmnhw2wDacE',
    hex: '412A2B9F7641D0750C1E822D0E49EF765C8106524B',
  },
  privateKey:
    '427139B43028A492E2705BCC9C64172392B8DB59F3BA1AEDAE41C88924960091',
  publicKey:
    '0404B604296010A55D40000B798EE8454ECCC1F8900E70B1ADF47C9887625D8BAE3866351A6FA0B5370623268410D33D345F63344121455849C9C28F9389ED9731',
});

const mockedAccountResource = jest.spyOn(
  ChainDataSource.prototype,
  'getAccountResource'
);

describe('chain.providers.chain', () => {
  let providers: TronProviders;
  let energyPrice: number;
  let bandwidthPrice: number;
  const messageData = {
    to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
    from: 'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52',
    amount: 0.000001,
  };
  const pk = '9e30f488d7079ddcba9f012506d5dda99df9eba6e8d98aaab69e2c4ac1c6f656';

  beforeAll(async () => {
    energyPrice = await TronProvider.staticUtils.getEnergyPrice(
      TRON_MANIFEST.rpcURL
    );
    bandwidthPrice = await TronProvider.staticUtils.getBandwidthPrice(
      TRON_MANIFEST.rpcURL
    );
    expect(energyPrice).toBeTruthy();
    expect(bandwidthPrice).toBeTruthy();
  });

  beforeEach(() => {
    providers = {
      chain: new TronProvider(new ChainDataSource(TRON_MANIFEST)),
      indexer: new TronProvider(new IndexerDataSource(TRON_MANIFEST)),
    };
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    let msg = providers.chain.createMsg({});

    expect(msg).toBeInstanceOf(ChainMsg);

    msg = providers.indexer.createMsg({});

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = providers.chain.createMsg({});

    expect(providers.chain.broadcast([msg])).rejects.toThrow();
    expect(providers.indexer.broadcast([msg])).rejects.toThrow();
  });

  it('should get transactions for an address from the blockchain using a chain data source', async () => {
    const txData = await providers.chain.getTransactions(
      'TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18'
    );
    expect((await txData.getData()).length).toBeGreaterThanOrEqual(0);
  });

  jest.setTimeout(15000);

  it('should get transactions for an address from the blockchain using an indexer data source', async () => {
    const txData = await providers.indexer.getTransactions(
      'TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18'
    );
    expect((await txData.getData()).length).toBeGreaterThanOrEqual(0);
  });

  it('should estimate fees for an unsigned TRX transaction using any data source', async () => {
    let msg = new ChainMsg({ ...messageData, provider: providers.chain });

    let fees = await providers.chain.estimateFee([msg]);
    expect(fees.length).toEqual(1);
    expect(fees[0].bandwidth).toEqual(265);
    expect(fees[0].energy).toEqual(0);
    expect(fees[0].fee).toEqual(0);

    msg = new ChainMsg({ ...messageData, provider: providers.indexer });
    fees = await providers.indexer.estimateFee([msg]);
    expect(fees.length).toEqual(1);
    expect(fees[0].bandwidth).toEqual(265);
    expect(fees[0].energy).toEqual(0);
    expect(fees[0].fee).toEqual(0);
  });

  it('should estimate fees for an unsigned TRC20 transaction using any data source', async () => {
    let msg = new ChainMsg({
      ...messageData,
      contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      tokenType: TokenType.TRC20,
      decimals: 6,
      provider: providers.chain,
    });

    let fees = await providers.chain.estimateFee([msg]);
    expect(fees[0].bandwidth).toEqual(345);
    expect(fees[0].energy).toEqual(130285);
    expect(fees[0].fee).toEqual((130285 * energyPrice) / 1000000); // Free bandwidth (600) > 345, no need for bandwidth fee
    expect(fees[0].willRevert).toBeFalsy();

    msg = new ChainMsg({
      ...messageData,
      contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      tokenType: TokenType.TRC20,
      decimals: 6,
      provider: providers.indexer,
    });

    fees = await providers.indexer.estimateFee([msg]);
    expect(fees[0].bandwidth).toEqual(345);
    expect(fees[0].energy).toEqual(130285);
    expect(fees[0].fee).toEqual((130285 * energyPrice) / 1000000); // Free bandwidth (600) > 345, no need for bandwidth fee
    expect(fees[0].willRevert).toBeFalsy();
  });

  it('should estimate fees for a TRX transaction using a chain data source', async () => {
    const msg = new ChainMsg({ ...messageData, provider: providers.chain });
    const signer = new PrivateKeySigner(pk, TRON_MANIFEST);

    await signer.sign(msg);

    const fees = await providers.chain.estimateFee([msg]);
    expect(fees.length).toEqual(1);
    expect(fees[0].bandwidth).toEqual(265);
    expect(fees[0].energy).toEqual(0);
  });

  it('should estimate fees for a TRX transaction using an indexer data source', async () => {
    const msg = new ChainMsg({ ...messageData, provider: providers.indexer });
    const signer = new PrivateKeySigner(pk, TRON_MANIFEST);

    await signer.sign(msg);

    const fees = await providers.indexer.estimateFee([msg]);
    expect(fees.length).toEqual(1);
    expect(fees[0].bandwidth).toEqual(265);
    expect(fees[0].energy).toEqual(0);
  });

  it('should estimate fees for a TRC20 transaction using a chain data source', async () => {
    const msg = new ChainMsg({
      ...messageData,
      contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      tokenType: TokenType.TRC20,
      decimals: 6,
      provider: providers.chain,
    });
    const signer = new PrivateKeySigner(pk, TRON_MANIFEST);

    await signer.sign(msg);

    const fees = await providers.chain.estimateFee([msg]);
    expect(fees[0].bandwidth).toEqual(345);
    expect(fees[0].energy).toEqual(130285);
    expect(fees[0].fee).toEqual((130285 * energyPrice) / 1000000); // Free bandwidth (600) > 345, no need for bandwidth fee
    expect(fees[0].willRevert).toBeFalsy();
  });

  it('should estimate fees for a TRC20 transaction using an indexer data source', async () => {
    const msg = new ChainMsg({
      ...messageData,
      contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      tokenType: TokenType.TRC20,
      decimals: 6,
      provider: providers.indexer,
    });
    const signer = new PrivateKeySigner(pk, TRON_MANIFEST);

    await signer.sign(msg);

    const fees = await providers.indexer.estimateFee([msg]);
    expect(fees[0].bandwidth).toEqual(345);
    expect(fees[0].energy).toEqual(130285);
    expect(fees[0].fee).toEqual((130285 * energyPrice) / 1000000); // Free bandwidth (600) > 345, no need for bandwidth fee
    expect(fees[0].willRevert).toBeFalsy();
  });

  it('should subtract free bandwidth and energy when estimate fee', async () => {
    mockedAccountResource.mockResolvedValue({
      freeBandwidth: 245,
      freeEnergy: 54895,
    });

    const msg = new ChainMsg({
      ...messageData,
      contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      tokenType: TokenType.TRC20,
      decimals: 6,
      provider: providers.indexer,
    });
    const signer = new PrivateKeySigner(pk, TRON_MANIFEST);

    await signer.sign(msg);

    const fees = await providers.chain.estimateFee([msg]);
    expect(fees[0].bandwidth).toEqual(345);
    expect(fees[0].energy).toEqual(130285);
    expect(fees[0].fee).toEqual(
      ((345 - 245) * bandwidthPrice + (130285 - 54895) * energyPrice) / 1000000
    );
    expect(fees[0].willRevert).toBeFalsy();
    mockedAccountResource.mockRestore();
  });

  it('should get a token transaction from the blockchain using a chain data source', async () => {
    const txData = await providers.chain.getTransaction(
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

  it('should get all transactions from the blockchain for an address with an indexer data source', async () => {
    const txData = await (
      providers.indexer.dataSource as IndexerDataSource
    ).getTransactions({
      address: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
    });

    expect(txData.length).toBeGreaterThan(0);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tx = txData.find(
      (tx) =>
        tx.data.hash ===
        '1c905f8bf7de95f2152f7f47e2b1d9c1c9a3ca9cc15563faafc30bad3e08b363'
    )!;

    expect(tx.data.hash).toEqual(
      '1c905f8bf7de95f2152f7f47e2b1d9c1c9a3ca9cc15563faafc30bad3e08b363'
    );
    expect(tx.data.from).toEqual('TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18');
    expect(tx.data.to).toEqual('TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH');
    expect(tx.data.amount).toEqual('10000');
    expect(tx.data.action).toBe('receive');

    const txData2 = await (
      providers.chain.dataSource as ChainDataSource
    ).getTransactions({
      address: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
    });
    expect(txData2.length).toBeGreaterThan(0);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tx2 = txData2.find(
      (tx) =>
        tx.data.hash ===
        '1c905f8bf7de95f2152f7f47e2b1d9c1c9a3ca9cc15563faafc30bad3e08b363'
    )!;

    expect(tx2.data.hash).toEqual(
      '1c905f8bf7de95f2152f7f47e2b1d9c1c9a3ca9cc15563faafc30bad3e08b363'
    );
    expect(tx2.data.from).toEqual('TYCq2iBVHTKMhybfkwGeHdW72gsfYfrN18');
    expect(tx2.data.to).toEqual('TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH');
    expect(tx2.data.amount).toEqual('10000');
    expect(tx2.data.action).toBe('receive');
  });

  it('should get a transaction from the blockchain using a chain data source', async () => {
    const txData = await providers.chain.getTransaction(
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
      providers.chain.getNonce('TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52')
    ).rejects.toThrow();

    expect(
      providers.indexer.getNonce('TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52')
    ).rejects.toThrow();
  });

  it('should get a balance for a valid address using a chain data source', async () => {
    const balance = await providers.chain.getBalance(
      'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(1);
    expect(balanceData[0].amount.toNumber()).toBeGreaterThanOrEqual(0);
    expect(balanceData[0].asset.name).toEqual('Tron');
  });

  it('should get a balance for a valid address using an indexer data source', async () => {
    const balance = await providers.indexer.getBalance(
      'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(1);
    expect(balanceData[0].amount.toNumber()).toBeGreaterThanOrEqual(0);
    expect(balanceData[0].asset.name).toEqual('Tron');
  });

  it('should return false when verifying an invalid address', () => {
    expect(TronProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid address', () => {
    expect(
      TronProvider.verifyAddress('THBrvgLEVC9uR6CWfZn792qqze7A7RSpuk')
    ).toBe(true);
  });
});
