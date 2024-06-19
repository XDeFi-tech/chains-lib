import { BigNumber, providers } from 'ethers';
import { Eip1559Fee } from '@xdefi-tech/chains-graphql';

import { ChainMsg } from './msg';
import { EvmProvider } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { EVM_MANIFESTS } from './manifests';

describe('chain.provider', () => {
  let evmProvider: EvmProvider;
  let arbitrumProvider: EvmProvider;
  let polygonProvider: EvmProvider;

  beforeEach(() => {
    evmProvider = new EvmProvider(
      new IndexerDataSource(EVM_MANIFESTS.ethereum)
    );
    arbitrumProvider = new EvmProvider(
      new IndexerDataSource(EVM_MANIFESTS.arbitrum)
    );
    polygonProvider = new EvmProvider(
      new IndexerDataSource(EVM_MANIFESTS.polygon)
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
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.symbol).toEqual('stETH');
    expect(balanceData[0].asset.name).toEqual('Liquid staked Ether 2.0');
  });

  it('should throw error for a non-existant address wallet', async () => {
    const getBalancePromise = evmProvider.getBalance(
      '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC',
      ['0xae7ab96520DE3A18E5e111B5EaAb095312D7fE8ssaass4']
    );
    expect((await getBalancePromise).getData).rejects.toThrow();
  });

  it('should throw error for an invalid token address', async () => {
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

  it('should get a ethereum provider', async () => {
    const provider = evmProvider.rpcProvider;
    expect(provider).toBeInstanceOf(providers.StaticJsonRpcProvider);
    expect(provider.connection.url).toEqual(EVM_MANIFESTS.ethereum.rpcURL);
  });

  it('[Arbitrum]should get a balance', async () => {
    const balance = await arbitrumProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020D239f178dd7Ab13fc99e6'
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.name).toEqual('Arbitrum');
  });

  it('[Arbitrum] should get a token balance', async () => {
    const balance = await arbitrumProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020D239f178dd7Ab13fc99e6',
      ['0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8']
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.symbol).toEqual('PENDLE');
    expect(balanceData[0].asset.name).toEqual('Pendle');
  });

  it('[Arbitrum] should throw error for a non-existant address wallet', async () => {
    const getBalancePromise = arbitrumProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020D239f178dd7Ab13fc99e6aaaa',
      ['0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84']
    );
    expect((await getBalancePromise).getData).rejects.toThrow();
  });

  it('[Arbitrum] should throw error for an invalid token address', async () => {
    const getBalancePromise = arbitrumProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020D239f178dd7Ab13fc99e6',
      ['0xae7ab96520DE3A18E5e111sasasaB5EaAb095312D7fE84']
    );
    expect((await getBalancePromise).getData).rejects.toThrow();
  });

  it('[Polygon]should get a balance', async () => {
    const balance = await polygonProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020D239f178dd7Ab13fc99e6'
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.name).toEqual('Polygon');
  });

  it('[Polygon] should get a token balance', async () => {
    const balance = await polygonProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020D239f178dd7Ab13fc99e6',
      ['0x714DB550b574b3E927af3D93E26127D15721D4C2']
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(1);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.symbol).toEqual('GMT');
    expect(balanceData[0].asset.name).toEqual('GreenMetaverseToken');
  });

  it('[Polygon] should throw error for a non-existant address wallet', async () => {
    const getBalancePromise = polygonProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020asdasdD239f178dd7Ab13fc99e6',
      ['0x714DB550b574b3E927af3D93E26127D15721D4C2']
    );
    expect((await getBalancePromise).getData).rejects.toThrow();
  });

  it('[Polygon] should throw error for an invalid token address', async () => {
    const getBalancePromise = polygonProvider.getBalance(
      '0xC8c16Bb40c03D2Bf020D239f178dd7Ab13fc99e6',
      ['0x714DB550b574b3Easkdj927af3D93E26127D15721D4C2']
    );
    expect((await getBalancePromise).getData).rejects.toThrow();
  });

  it('should return false when verifying an invalid address', () => {
    expect(EvmProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid address', () => {
    expect(
      EvmProvider.verifyAddress('0x74EeF25048bA28542600804F68fBF71cCf520C59')
    ).toBe(true);
  });
});

jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');
  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('chain.provider gas fee', () => {
  describe('ChainDataSource get fee options', () => {
    let provider: EvmProvider;
    let originalGetFeeData: () => Promise<providers.FeeData>;

    beforeEach(() => {
      originalGetFeeData = providers.Provider.prototype.getFeeData;
      provider = new EvmProvider(new ChainDataSource(EVM_MANIFESTS.ethereum));
    });

    afterEach(() => {
      providers.Provider.prototype.getFeeData = originalGetFeeData;
    });

    it('Should return EIP-1559 transaction fee options', async () => {
      providers.Provider.prototype.getFeeData = jest.fn().mockResolvedValue({
        lastBaseFeePerGas: BigNumber.from('0x019653bedb'),
        maxFeePerGas: BigNumber.from('0x03860facb6'),
        maxPriorityFeePerGas: BigNumber.from('0x59682f00'),
        gasPrice: BigNumber.from('0x01a1d320c9'),
      });
      const gasFeeOptions = await provider.gasFeeOptions();
      expect(gasFeeOptions).not.toBeNull();
      expect(gasFeeOptions?.high).toBeInstanceOf(Object);
      expect((gasFeeOptions?.high as Eip1559Fee).baseFeePerGas).toBeTruthy();
      expect((gasFeeOptions?.high as Eip1559Fee).maxFeePerGas).toBeTruthy();
      expect(
        (gasFeeOptions?.high as Eip1559Fee).priorityFeePerGas
      ).toBeTruthy();
    });

    it('Should return legacy transaction fee options', async () => {
      providers.Provider.prototype.getFeeData = jest.fn().mockResolvedValue({
        lastBaseFeePerGas: null,
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
        gasPrice: null,
      });
      const gasFeeOptions = await provider.gasFeeOptions();
      expect(gasFeeOptions).not.toBeNull();
      expect(typeof gasFeeOptions?.high).toBe('number');
    });
  });

  describe('IndexedDataSource get fee options', () => {
    let provider: EvmProvider;
    let originalGetFeeData: () => Promise<providers.FeeData>;

    beforeEach(() => {
      originalGetFeeData = providers.Provider.prototype.getFeeData;
      provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));
    });

    afterEach(() => {
      providers.Provider.prototype.getFeeData = originalGetFeeData;
    });

    it('Should call to RPC to get fee', async () => {
      providers.Provider.prototype.getFeeData = jest.fn().mockResolvedValue({
        lastBaseFeePerGas: BigNumber.from('0x019653bedb'),
        maxFeePerGas: BigNumber.from('0x03860facb6'),
        maxPriorityFeePerGas: BigNumber.from('0x59682f00'),
        gasPrice: BigNumber.from('0x01a1d320c9'),
      });
      const gasFeeOptions = await provider.gasFeeOptions();
      expect(providers.Provider.prototype.getFeeData).toHaveBeenCalled();
      expect(gasFeeOptions).not.toBeNull();
    });

    it('Should call to fee service to get fee', async () => {
      providers.Provider.prototype.getFeeData = jest.fn().mockResolvedValue({
        lastBaseFeePerGas: BigNumber.from('0x019653bedb'),
        maxFeePerGas: BigNumber.from('0x03860facb6'),
        maxPriorityFeePerGas: BigNumber.from('0x59682f00'),
        gasPrice: BigNumber.from('0x01a1d320c9'),
      });
      await provider.gasFeeOptions({
        useFeeService: true,
      });
      expect(providers.Provider.prototype.getFeeData).not.toHaveBeenCalled();
    });
  });
});
