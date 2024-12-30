import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  Transaction as SolanaTransaction,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';

import { ChainMsg } from './msg';
import { SolanaProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';

const mockEstimateComputeUnits = 200_000;
const mockPriorityFeeEstimate = 1000;
jest
  .spyOn(IndexerDataSource.prototype, 'estimateComputeUnits')
  .mockResolvedValue(mockEstimateComputeUnits);
jest
  .spyOn(IndexerDataSource.prototype, 'getPriorityFeeEstimate')
  .mockResolvedValue({
    result: {
      priorityFeeEstimate: mockPriorityFeeEstimate,
    },
  });

jest.spyOn(SolanaProvider.prototype, 'getBalance').mockResolvedValue({
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
        amount: new BigNumber('1'),
      },
    ])
  ) as any,
  getObserver: jest.fn(),
});

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
                amount: new BigNumber('1'),
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
                amount: new BigNumber('1000'),
              },
            ])
          ),
        })
      ),
      rpcProvider: {
        getLatestBlockhash: jest.fn(() =>
          Promise.resolve({
            blockhash: 'mockBlockhash',
          })
        ),
        getBlockHeight: jest.fn(() =>
          Promise.resolve({
            blockhash: 'mockBlockhash',
          })
        ),
        getRecentPrioritizationFees: jest.fn(() => Promise.resolve([])),
        getMinimumBalanceForRentExemption: jest.fn(() =>
          Promise.resolve(890880)
        ),
      },
      gasFeeOptions: jest.fn(() =>
        Promise.resolve({
          high: 25000,
          low: 2500,
          medium: 5000,
        })
      ),
      estimateFee: jest.fn(() => Promise.resolve([{ gasLimit: 5000 }])),
      getFeeForMsg: jest.fn(() =>
        Promise.resolve({ fee: '0.000005', maxFee: null })
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
        amount: 0.001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const txBody = await chainMsg.buildTx();
    expect(txBody.from).toBe('9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh');
    expect(txBody.to).toBe('9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh');
    expect(txBody.value).toBe(1000000); // 0.001 * 10 ** 8
    expect(txBody.gasPrice).toBe(5000);
  });

  it('buildTx with native token should be fail if not enough SOL left for ren', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0.9999,
      },
      mockProvider,
      MsgEncoding.object
    );

    // 1e9 - 999900000 - 5000 < 890880
    expect(chainMsg.buildTx()).rejects.toThrowError();
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

    const fee = 0.000005; // sol per signature

    const response = await chainMsg.getMaxAmountToSend();

    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    expect(response).toEqual(
      new BigNumber('1')
        .minus(fee)
        .minus(0.00089088) // Rent balance
        .minus(gap)
        .toString()
    );
  });

  it('should return max amount to send with priority fee', async () => {
    const chainMsg = new ChainMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0.000001,
        gasPrice: 1000, // micro lamports per compute unit
        gasLimit: 200_000, // compute units
      },
      mockProvider,
      MsgEncoding.object
    );

    const fee = new BigNumber(200_000)
      .multipliedBy(new BigNumber(1000).dividedBy(1e6))
      .plus(new BigNumber(5000))
      .integerValue(BigNumber.ROUND_CEIL)
      .dividedBy(LAMPORTS_PER_SOL)
      .toString();

    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;

    const response = await chainMsg.getMaxAmountToSend();
    expect(response).toEqual(
      new BigNumber('1')
        .minus(fee)
        .minus(0.00089088) // Rent balance
        .minus(gap)
        .toString()
    );
  });

  it('Should create associated token account instruction when sending secondary token to new account', async () => {
    const provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    const msg = provider.createMsg({
      from: '5UghpDRDYPger6vqVCrvvvRQsg3NZ5CNzJWfPyKTZpf2',
      to: 'EwSJ1V4zGUbJBbURwBViezwEo8Ei8UkSDigg9dvBmQXk',
      contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      amount: '0.0001',
      gasPrice: 10_000,
      gasLimit: 200_000,
    });
    const builtMsg = await msg.buildTx();
    const tx = builtMsg.tx as SolanaTransaction;
    expect(tx.instructions.length).toBe(4);
    expect(tx.instructions[0].programId).toBe(ComputeBudgetProgram.programId);
    expect(tx.instructions[1].programId).toBe(ComputeBudgetProgram.programId);
    expect(tx.instructions[2].programId).toBe(ASSOCIATED_TOKEN_PROGRAM_ID);
    expect(tx.instructions[3].programId).toBe(TOKEN_PROGRAM_ID);
  });

  it('Should not create associated token account instruction when sending secondary token to account containing token', async () => {
    const provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    const msg = provider.createMsg({
      from: '5UghpDRDYPger6vqVCrvvvRQsg3NZ5CNzJWfPyKTZpf2',
      to: 'EwSJ1V4zGUbJBbURwBViezwEo8Ei8UkSDigg9dvBmQXk',
      contractAddress: 'Hg675ypQpBUwP3wiWjq8pFQxr6rjnT2QRH4Vi519jdiP',
      amount: '0.0001',
      gasPrice: 10_000,
      gasLimit: 200_000,
    });
    const builtMsg = await msg.buildTx();
    const tx = builtMsg.tx as SolanaTransaction;
    expect(tx.instructions.length).toBe(3);
    expect(tx.instructions[0].programId).toBe(ComputeBudgetProgram.programId);
    expect(tx.instructions[1].programId).toBe(ComputeBudgetProgram.programId);
    expect(tx.instructions[2].programId).toBe(TOKEN_PROGRAM_ID);
  });

  jest.useFakeTimers();
  it('add priority fee to common send tx', async () => {
    const provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    const msg = provider.createMsg({
      from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
      to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
      amount: 0.000001,
      gasPrice: 1000,
      gasLimit: 200_000,
    });
    const msgFee = await msg.getFee();
    const expectedFee = new BigNumber(200_000)
      .multipliedBy(new BigNumber(1000).dividedBy(1e6))
      .plus(new BigNumber(5000))
      .integerValue(BigNumber.ROUND_CEIL)
      .dividedBy(LAMPORTS_PER_SOL)
      .toString();
    expect(msgFee.fee).toBe(expectedFee);
    const builtMsg = await msg.buildTx();
    const tx = builtMsg.tx as SolanaTransaction;
    expect(tx.instructions.length).toBe(3);
    expect(tx.instructions[0].programId).toBe(ComputeBudgetProgram.programId);
    expect(tx.instructions[1].programId).toBe(ComputeBudgetProgram.programId);
    expect(tx.instructions[2].programId).toBe(SystemProgram.programId);
  });

  it('estimateFee with for tx already has priority fee', async () => {
    const computeUnitLimit = 200_000;
    const computeUnitPrice = 1000;
    const provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    const feePayer = new PublicKey(
      '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh'
    );
    const { blockhash: recentBlockhash } =
      await provider.rpcProvider.getLatestBlockhash();
    const instructions = [
      ComputeBudgetProgram.setComputeUnitLimit({
        units: computeUnitLimit,
      }),
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: computeUnitPrice,
      }),
      SystemProgram.transfer({
        fromPubkey: feePayer,
        toPubkey: feePayer,
        lamports: 1000,
      }),
    ];
    const message = new TransactionMessage({
      payerKey: feePayer,
      recentBlockhash,
      instructions,
    });
    const transaction = new VersionedTransaction(message.compileToV0Message());

    const msg = provider.createMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0,
        data: Buffer.from(transaction.serialize()).toString('base64'),
      },
      MsgEncoding.base64
    );
    const [feeEstimate] = await provider.estimateFee([msg]);
    expect(feeEstimate.gasLimit).toBe(computeUnitLimit);
    expect(feeEstimate.gasPrice).toBe(computeUnitPrice);
    const fee = await msg.getFee();
    const expectedFee = new BigNumber(computeUnitLimit)
      .multipliedBy(new BigNumber(computeUnitPrice).dividedBy(1e6)) // convert micro lamports to lamports
      .plus(new BigNumber(5000)) // add lamports for signature
      .dividedBy(LAMPORTS_PER_SOL) // convert lamports to SOL
      .toString();
    expect(fee.fee).toEqual(expectedFee);
    const builtMsg = await msg.buildTx();
    const tx = builtMsg.tx as VersionedTransaction;
    expect(tx.message.compiledInstructions.length).toBe(3);
  });

  it('estimateFee with for tx no has priority fee', async () => {
    const provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    const feePayer = new PublicKey(
      '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh'
    );
    const { blockhash: recentBlockhash } =
      await provider.rpcProvider.getLatestBlockhash();
    const instructions = [
      SystemProgram.transfer({
        fromPubkey: feePayer,
        toPubkey: feePayer,
        lamports: 1000,
      }),
    ];
    const message = new TransactionMessage({
      payerKey: feePayer,
      recentBlockhash,
      instructions,
    });
    const transaction = new VersionedTransaction(message.compileToV0Message());
    const msg = provider.createMsg(
      {
        from: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        to: '9H2zCw7ey8qJgTgyK46pbCNw4ifGKqfzWi8Sc5MeH8fh',
        amount: 0,
        data: Buffer.from(transaction.serialize()).toString('base64'),
      },
      MsgEncoding.base64
    );
    const [feeEstimate] = await provider.estimateFee([msg]);
    expect(feeEstimate.gasLimit).toBe(mockEstimateComputeUnits + 300); // add 300 for priority fee instructions
    expect(feeEstimate.gasPrice).toBe(mockPriorityFeeEstimate);
    const newMsg = provider.createMsg(
      {
        ...msg.toData(),
        gasPrice: feeEstimate.gasPrice,
        gasLimit: feeEstimate.gasLimit,
      },
      MsgEncoding.base64
    );
    const fee = await newMsg.getFee();
    expect(fee.fee).toEqual(
      new BigNumber(mockEstimateComputeUnits + 300) // add 300 for priority fee instructions
        .multipliedBy(new BigNumber(mockPriorityFeeEstimate).dividedBy(1e6)) // convert micro lamports to lamports
        .integerValue(BigNumber.ROUND_CEIL)
        .plus(new BigNumber(5000)) // add lamports for signature
        .dividedBy(LAMPORTS_PER_SOL) // convert lamports to SOL
        .toString()
    );
    const builtMsg = await newMsg.buildTx();
    const tx = builtMsg.tx as VersionedTransaction;
    expect(tx.message.compiledInstructions.length).toBe(3); // Added 2 instructions for priority fee
  });
});
