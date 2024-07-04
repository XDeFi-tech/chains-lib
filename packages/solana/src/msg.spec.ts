import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import {
  getMint,
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';

import { ChainMsg } from './msg';

// Mock dependencies
jest.mock('@solana/spl-token', () => ({
  ...jest.requireActual('@solana/spl-token'),
  getMint: jest.fn(),
  getAssociatedTokenAddress: jest.fn(),
  createTransferInstruction: jest.fn(),
}));

describe('msg', () => {
  let mockProvider: any;

  beforeEach(() => {
    mockProvider = {
      getBalance: jest.fn(() =>
        Promise.resolve({
          getData: jest.fn(() =>
            Promise.resolve([
              {
                asset: {
                  chainId: 'mainnet-beta',
                  name: 'Solana',
                  symbol: 'SOL',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '123',
                  decimals: 8,
                },
                amount: '1000',
              },
              {
                asset: {
                  chainId: 'mainnet-beta',
                  name: 'Bonk',
                  symbol: 'BONK',
                  icon: null,
                  native: false,
                  address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
                  decimals: 8,
                },
                amount: '1000',
              },
            ])
          ),
        })
      ),
      rpcProvider: {
        getRecentBlockhash: jest.fn(() =>
          Promise.resolve({
            blockhash: 'mockBlockhash',
          })
        ),
      },
      gasFeeOptions: jest.fn(() =>
        Promise.resolve({
          high: 25000,
          low: 2500,
          medium: 5000,
        })
      ),
      manifest: {
        name: 'Solana',
        description: '',
        rpcURL: 'https://solanalb-rpc.xdefi.services',
        chainSymbol: 'SOL',
        blockExplorerURL: 'https://explorer.solana.com/',
        chainId: 'mainnet-beta',
        chain: 'solana',
        decimals: 6,
        feeGasStep: {
          high: 1,
          medium: 1,
          low: 1,
        },
        maxGapAmount: 0.0001,
      },
    };
  });

  it('buildTx with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const txBody = await chainMsg.buildTx();
    expect(txBody.from).toBe('9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh');
    expect(txBody.to).toBe('9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh');
    expect(txBody.value).toBe(1000); // 0.000001 * 10 ** 8
    expect(txBody.gasPrice).toBe(5000);
  });

  it('buildTx with non-native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
        to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
        amount: 0.000001,
        contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
      },
      mockProvider,
      MsgEncoding.object
    );

    const decimals = 8;
    const value = new BigNumber('0.000001')
      .multipliedBy(10 ** decimals)
      .toNumber();

    (getMint as jest.Mock).mockResolvedValue({ decimals });
    const fromTokenAcc = new PublicKey(
      'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU6'
    );
    const toTokenAcc = new PublicKey(
      'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU6'
    );

    (getAssociatedTokenAddress as jest.Mock).mockResolvedValueOnce(
      fromTokenAcc
    );
    (getAssociatedTokenAddress as jest.Mock).mockResolvedValueOnce(toTokenAcc);

    const mockInstruction = new TransactionInstruction({
      keys: [
        { pubkey: fromTokenAcc, isSigner: false, isWritable: true },
        { pubkey: toTokenAcc, isSigner: false, isWritable: true },
        {
          pubkey: new PublicKey('C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'),
          isSigner: true,
          isWritable: false,
        },
      ],
      programId: TOKEN_PROGRAM_ID,
      data: Buffer.from([]),
    });

    (createTransferInstruction as jest.Mock).mockReturnValue(mockInstruction);

    const txBody = await chainMsg.buildTx();
    expect(txBody.value).toBe(value);
    expect(txBody.to).toBe('C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5');
    expect(txBody.from).toBe('C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5');
    expect(txBody.gasPrice).toBe(5000);
    expect(txBody.decimals).toBe(decimals);
    expect(txBody.programId).toEqual(TOKEN_PROGRAM_ID);
    expect(txBody.toTokenAddress).toBe(toTokenAcc.toBase58());
    expect(txBody.fromTokenAddress).toBe(fromTokenAcc.toBase58());
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();
    const feeOptions = await mockProvider.gasFeeOptions();

    expect(response.fee).toEqual(
      new BigNumber(feeOptions[GasFeeSpeed.medium] as number)
        .dividedBy(LAMPORTS_PER_SOL)
        .toString()
    );
    expect(response.maxFee).toBeNull();
  });

  it('getMaxAmountToSend should throw an error with invalid token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = chainMsg.getMaxAmountToSend('invalid');

    await expect(response).rejects.toThrowError();
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend();

    const feeEstimation = await chainMsg.getFee();
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(
      new BigNumber('1000')
        .minus(feeEstimation.fee || 0)
        .minus(gap)
        .toString()
    );
  });

  it('should return MaxAmountToSend with non-native-token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend(
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
    );
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(new BigNumber('1000').minus(gap).toString());
  });
});
