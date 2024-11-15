import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

import erc20ABI from './consts/erc20.json';
import erc721ABI from './consts/erc721.json';
import erc1155ABI from './consts/erc1155.json';
import { ChainMsg, MsgBody } from './msg';

describe('msg', () => {
  let mockProvider: any;

  beforeEach(() => {
    mockProvider = {
      getNonce: jest.fn(() => Promise.resolve(0)),
      getBalance: jest.fn(() =>
        Promise.resolve({
          getData: jest.fn(() =>
            Promise.resolve([
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
                  name: 'NuLink',
                  symbol: 'NLINK',
                  icon: null,
                  native: false,
                  address: '0x493c8d6a973246a7B26Aa8Ef4b1494867A825DE5',
                  decimals: 18,
                },
                amount: '1000',
              },
            ])
          ),
        })
      ),
      gasFeeOptions: jest.fn(() =>
        Promise.resolve({
          high: {
            priorityFeePerGas: 1110000000,
            maxFeePerGas: 54180000000,
            baseFeePerGas: 37960000000,
          },
          medium: {
            priorityFeePerGas: 33000000,
            maxFeePerGas: 53100000000,
            baseFeePerGas: 36880000000,
          },
          low: {
            priorityFeePerGas: 18000000,
            maxFeePerGas: 53090000000,
            baseFeePerGas: 36860000000,
          },
        })
      ),
      estimateFee: jest.fn(() =>
        Promise.resolve([
          {
            baseFeePerGas: 22000000000,
            gasLimit: 31500,
            gasPrice: 100,
            maxFeePerGas: 28330000000,
            maxPriorityFeePerGas: 70000000,
          },
        ])
      ),
      manifest: {
        name: 'Ethereum',
        description: '',
        rpcURL: 'https://ethereum-mainnet.xdefiservices.com',
        chainSymbol: 'ETH',
        blockExplorerURL: 'https://etherscan.io',
        chainId: '1',
        chain: 'ethereum',
        decimals: 18,
        feeGasStep: {
          high: 1.5,
          medium: 1.25,
          low: 1,
        },
        multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        maxGapAmount: 0.0001,
      },
    };
  });

  it('buildTx with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 0.000001,
        nonce: 0,
        decimals: 18,
        chainId: 1,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response.to).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response).toHaveProperty('nonce');
    expect(response).toHaveProperty('value');
    expect(response).toHaveProperty('chainId');
    expect(response).toHaveProperty('maxFeePerGas');
  });

  it('buildTx with non-native token (ERC-20)', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 0.000001,
        nonce: 0,
        decimals: 18,
        chainId: 1,
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT - ERC20
        data: '0xa9059cbb000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100', // transfer(address,uint256)
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response.to).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response).toHaveProperty('nonce');
    expect(response).toHaveProperty('value');
    expect(response).toHaveProperty('chainId');
    expect(response).toHaveProperty('maxFeePerGas');
    expect(response.data).toEqual(
      '0xa9059cbb000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100'
    );
  });

  it('buildTx with non-native token (ERC-721)', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 1,
        nonce: 0,
        decimals: 18,
        chainId: 1,
        contractAddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d', // CryptoKitties - ERC721
        data: '0x42842e0e000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100', // transferFrom(address,address,uint256)
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response.to).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response).toHaveProperty('nonce');
    expect(response).toHaveProperty('value');
    expect(response).toHaveProperty('chainId');
    expect(response).toHaveProperty('maxFeePerGas');
    expect(response.data).toEqual(
      '0x42842e0e000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100'
    );
  });

  it('buildTx with non-native token (ERC-1155)', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 1,
        nonce: 0,
        decimals: 18,
        chainId: 1,
        contractAddress: '0x0e3a2a1f2146d86a604adc220b4967a898d7fe07', // EnjinCoin - ERC1155
        data: '0x42842e0e000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100', // safeTransferFrom(address,address,uint256,uint256,bytes)
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response).toBeDefined();
    expect(response.from).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response.to).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response).toHaveProperty('nonce');
    expect(response).toHaveProperty('value');
    expect(response).toHaveProperty('chainId');
    expect(response).toHaveProperty('maxFeePerGas');
    expect(response.data).toEqual(
      '0x42842e0e000000000000000000000000aa09df2673e1ae3fc8ed875c131b52449cf958100'
    );
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 0.000001,
        nonce: 0,
        decimals: 18,
        chainId: 1,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee(GasFeeSpeed.medium);

    const [feeEstimation] = await mockProvider.estimateFee(
      [chainMsg],
      GasFeeSpeed.medium
    );

    expect(response.fee).toEqual(
      ethers.utils
        .formatUnits(
          new BigNumber(feeEstimation.baseFeePerGas)
            .multipliedBy(feeEstimation.gasLimit)
            .toString(),
          'ether'
        )
        .toString()
    );

    const maxFeeWithPriority = new BigNumber(feeEstimation.baseFeePerGas).plus(
      feeEstimation.maxPriorityFeePerGas
    );

    expect(response.maxFee).toEqual(
      ethers.utils
        .formatUnits(
          new BigNumber(maxFeeWithPriority)
            .multipliedBy(feeEstimation.gasLimit)
            .toString(),
          'ether'
        )
        .toString()
    );
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
        amount: 0.000001,
        nonce: 0,
        decimals: 18,
        chainId: 1,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend();

    const feeEstimation = await chainMsg.getFee(GasFeeSpeed.high);
    const feeWithRatio = ((feeEstimation.fee || 0) as number) * 1.005;
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(
      new BigNumber('1000').minus(feeWithRatio).minus(gap).toString()
    );
  });

  it('buildTx with ERC-20 approve', async () => {
    const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT
    const spenderAddress = '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581';
    const erc20Interface = new ethers.utils.Interface(erc20ABI);

    const erc20ApproveData = erc20Interface.encodeFunctionData('approve', [
      spenderAddress,
      ethers.utils.parseUnits('1.0', 18),
    ]);

    const msgBody: MsgBody = {
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: contractAddress,
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
      contractAddress: contractAddress,
      data: erc20ApproveData, // approve(address,uint256)
    };

    const chainMsg = new ChainMsg(msgBody, mockProvider, MsgEncoding.object);

    const response = await chainMsg.buildTx();

    // Assertions
    expect(response).toBeDefined();
    expect(response.from).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response.to).toEqual(contractAddress);
    expect(response).toHaveProperty('nonce');
    expect(response).toHaveProperty('value');
    expect(response).toHaveProperty('chainId');
    expect(response).toHaveProperty('maxFeePerGas');
    expect(response.data).toEqual(erc20ApproveData);
  });

  it('buildTx with ERC-721 approve', async () => {
    const contractAddress = '0x06012c8cf97bead5deae237070f9587f8e7a266d'; // CryptoKitties - ERC721
    const spenderAddress = '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581';
    const erc721Interface = new ethers.utils.Interface(erc721ABI);

    const erc721ApproveData = erc721Interface.encodeFunctionData(
      'setApprovalForAll',
      [spenderAddress, true]
    );

    const msgBody: MsgBody = {
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: contractAddress,
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
      contractAddress: contractAddress,
      data: erc721ApproveData,
    };

    const chainMsg = new ChainMsg(msgBody, mockProvider, MsgEncoding.object);

    const response = await chainMsg.buildTx();

    // Assertions
    expect(response).toBeDefined();
    expect(response.from).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response.to).toEqual(contractAddress);
    expect(response).toHaveProperty('nonce');
    expect(response).toHaveProperty('value');
    expect(response).toHaveProperty('chainId');
    expect(response).toHaveProperty('maxFeePerGas');
    expect(response.data).toEqual(erc721ApproveData);
  });

  it('buildTx with ERC-1155 approve', async () => {
    const contractAddress = '0x0e3a2a1f2146d86a604adc220b4967a898d7fe07'; // EnjinCoin - ERC1155
    const spenderAddress = '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581';
    const erc1155Interface = new ethers.utils.Interface(erc1155ABI);

    const erc1155ApproveData = erc1155Interface.encodeFunctionData(
      'setApprovalForAll',
      [spenderAddress, true]
    );
    // Creating the data for ERC-1155 approve
    const msgBody: MsgBody = {
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: contractAddress,
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
      contractAddress: contractAddress,
      data: erc1155ApproveData,
    };

    const chainMsg = new ChainMsg(msgBody, mockProvider, MsgEncoding.object);

    const response = await chainMsg.buildTx();

    // Assertions
    expect(response).toBeDefined();
    expect(response.from).toEqual('0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581');
    expect(response.to).toEqual(contractAddress);
    expect(response).toHaveProperty('nonce');
    expect(response).toHaveProperty('value');
    expect(response).toHaveProperty('chainId');
    expect(response).toHaveProperty('maxFeePerGas');
    expect(response.data).toEqual(erc1155ApproveData);
  });

  it('should throw error if custom fee is less than the lowest fee', async () => {
    const msgData = {
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
      maxPriorityFeePerGas: '1',
      maxFeePerGas: '2',
    };
    const chainMsg = new ChainMsg(msgData, mockProvider, MsgEncoding.object);
    expect(chainMsg.buildTx()).rejects.toThrow('Tip is too low');
    const lowMaxFeeMsg = new ChainMsg(
      {
        ...msgData,
        maxPriorityFeePerGas: '18000000',
        maxFeePerGas: '18000001',
      },
      mockProvider,
      MsgEncoding.object
    );
    expect(lowMaxFeeMsg.buildTx()).rejects.toThrow('MaxFeePerGas is too low');
  });
});
