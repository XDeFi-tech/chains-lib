import {
  Response,
  GasFeeSpeed,
  TransactionStatus,
  Coin,
} from '@xdefi-tech/chains-core';
import { BigNumber, providers } from 'ethers';

import { Eip1559Fee } from './gql/graphql';
import { ChainMsg } from './msg';
import { EvmProvider } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { EVM_MANIFESTS } from './manifests';

describe('chain.provider', () => {
  const NETWORKED_QUERIES =
    process.env.NETWORKED_QUERIES === '1' ? true : false;

  let evmProvider: EvmProvider;

  beforeEach(() => {
    evmProvider = new EvmProvider(
      new IndexerDataSource(EVM_MANIFESTS.ethereum)
    );
  });

  it('createMsg() should create a ChainMsg instance for native token (ETH)', () => {
    const msg = evmProvider.createMsg({
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
      // data: empty for a simple transfer
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('createMsg() should create a ChainMsg instance for ERC20 (USDT) token', () => {
    const msg = evmProvider.createMsg({
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
      data: '0xa9059cbb000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100', // ERC20 transfer
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should get a token balance', async () => {
    const balance = await evmProvider.getBalance(
      '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACC',
      [
        '0x0000000000000000000000000000000000000000',
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
      ]
    );
    const balanceData = await balance.getData();
    expect(balanceData.length).toEqual(2);
    expect(balanceData[0].amount.toString()).toEqual('0');
    expect(balanceData[0].asset.name).toEqual('Ethereum');
    expect(balanceData[1].amount.toString()).toEqual('0');
    expect(balanceData[1].asset.symbol).toEqual('stETH');
    expect(balanceData[1].asset.name).toEqual('Liquid staked Ether 2.0');
  });

  it('createMsg() should create a ChainMsg instance for ERC721-NFTs (CryptoKitties) token', () => {
    const msg = evmProvider.createMsg({
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 1,
      nonce: 0,
      decimals: 18,
      chainId: 1,
      contractAddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d', // CryptoKitties
      data: '0x42842e0e000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100', // ERC721 transfer
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('getBalance() should return balance data', async () => {
    if (!NETWORKED_QUERIES) {
      jest.spyOn(EvmProvider.prototype, 'getBalance').mockResolvedValue(
        new Response(
          // getData
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: '1',
                name: 'Ethereum',
                symbol: 'ETH',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '345.55',
                decimals: 18,
              },
              amount: '1000',
            },
            {
              asset: {
                chainId: '1',
                name: 'Liquid staked Ether 2.0',
                symbol: 'stETH',
                icon: null,
                native: false,
                address: '0x493c8d6a973246a7B26Aa8Ef4b1494867A825DE5',
                decimals: 18,
              },
              amount: '1000',
            },
          ]),
          // getObserver
          jest.fn().mockImplementation(async () => [
            {
              asset: {
                chainId: '1',
                name: 'Ethereum',
                symbol: 'ETH',
                icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
                native: true,
                id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                price: '345.55',
                decimals: 18,
              },
              amount: '1000',
            },
            {
              asset: {
                chainId: '1',
                name: 'Liquid staked Ether 2.0',
                symbol: 'stETH',
                icon: null,
                native: false,
                address: '0x493c8d6a973246a7B26Aa8Ef4b1494867A825DE5',
                decimals: 18,
              },
              amount: '1000',
            },
          ])
        )
      );

      const balance = await evmProvider.getBalance(
        '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toEqual(2);
      expect(balanceData[0].amount.toString()).toEqual('1000');
      expect(balanceData[0].asset.symbol).toEqual('ETH');
      expect(balanceData[1].amount.toString()).toEqual('1000');
      expect(balanceData[1].asset.symbol).toEqual('stETH');
    } else {
      const balance = await evmProvider.getBalance(
        '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toBeGreaterThanOrEqual(0);
      if (balanceData.length > 0) {
        expect(balanceData[0]).toBeInstanceOf(Coin);
        expect(balanceData[0].amount).toBeTruthy();
      }
    }
  });

  it('estimateFee() should return fee estimation', async () => {
    jest.spyOn(EvmProvider.prototype, 'estimateFee').mockResolvedValue([
      {
        gasLimit: 1,
        gasPrice: 1,
        maxFeePerGas: 1,
        baseFeePerGas: 1,
        maxPriorityFeePerGas: 1,
      },
    ]);

    const msg = evmProvider.createMsg({
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
    });

    const estimateFee = await evmProvider.estimateFee(
      [msg],
      GasFeeSpeed.medium
    );

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    const feeOptions = await evmProvider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    jest.spyOn(EvmProvider.prototype, 'getTransaction').mockResolvedValue({
      hash: '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw',
      to: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      from: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      status: TransactionStatus.pending,
      amount: '1000',
    });

    const txData = await evmProvider.getTransaction(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );

    expect(txData?.hash).toEqual(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );
  });

  it('should get an address nonce', async () => {
    const nonce = await evmProvider.getNonce(
      '0x0000000000000000000000000000000000000000'
    );
    expect(nonce).toEqual(0);
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
