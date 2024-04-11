import { ChainMsg } from './msg';
import { EvmProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { EVM_MANIFESTS } from './manifests';

// const ADDRESS_MOCK = {
//     address: '0xCbA98362e199c41E1864D0923AF9646d3A648451',
//     publicKey:
//         '04df00ad3869baad7ce54f4d560ba7f268d542df8f2679a5898d78a690c3db8f9833d2973671cb14b088e91bdf7c0ab00029a576473c0e12f84d252e630bb3809b',
// };

// const SIGN_MOCK = {
//     v: '1',
//     r: '2',
//     s: '3',
// };

describe('chain.provider', () => {
  let evmProvider: EvmProvider;

  beforeEach(() => {
    evmProvider = new EvmProvider(
      new IndexerDataSource(EVM_MANIFESTS.ethereum)
    );
  });

  it('createMsg(): should create message with data', () => {
    const msg = evmProvider.createMsg({});

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = evmProvider.createMsg({});

    expect(evmProvider.broadcast([msg])).rejects.toThrow();
  });

  it('should get a transaction from the blockchain', async () => {
    const txData = await evmProvider.getTransaction(
      '0x7f8650389da94aac5c70080982e027653741ec520612dbc8a111f4d2b3645b68'
    );
    expect(txData?.hash).toEqual(
      '0x7f8650389da94aac5c70080982e027653741ec520612dbc8a111f4d2b3645b68'
    );
  });

  it('should get an address nonce', async () => {
    const nonce = await evmProvider.getNonce(
      '0x0000000000000000000000000000000000000000'
    );
    expect(nonce).toEqual(0);
  });

  it('should get fee options', async () => {
    const feeOptions = await evmProvider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('should get a balance', async () => {
    const balance = await evmProvider.getBalance(
      '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.name).toEqual('Ethereum');
  });

  it('should get a token balance', async () => {
    const balance = await evmProvider.getBalance(
      '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC',
      ['0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84']
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(2);
    expect(balanceData[1].amount.toString()).toEqual('0');
    expect(balanceData[1].asset.symbol).toEqual('stETH');
    expect(balanceData[1].asset.name).toEqual('Liquid staked Ether 2.0');
  });

  it('should throw error for a non-existant address wallet', async () => {
    const getBalancePromise = evmProvider.getBalance(
      '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ['0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84']
    );
    expect((await getBalancePromise).getData).rejects.toThrow();
  });

  it('should get null for a non-existant transaction on the blockchain', async () => {
    const txData = await evmProvider.getTransaction(
      '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    );
    expect(txData).toEqual(null);
  });
});
