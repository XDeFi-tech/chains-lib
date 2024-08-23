import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';

import { ChainMsg } from './msg';
import { SolanaProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';

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

  it('Should create associated token account instruction when sending secondary token to new account', async () => {
    const provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    const msg = provider.createMsg({
      from: '5UghpDRDYPger6vqVCrvvvRQsg3NZ5CNzJWfPyKTZpf2',
      to: 'EwSJ1V4zGUbJBbURwBViezwEo8Ei8UkSDigg9dvBmQXk',
      contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      amount: '0.0001',
    });
    const builtMsg = await msg.buildTx();
    const tx = builtMsg.tx as SolanaTransaction;
    expect(tx.instructions.length).toBe(2);
    expect(tx.instructions[0].programId).toBe(ASSOCIATED_TOKEN_PROGRAM_ID);
    expect(tx.instructions[1].programId).toBe(TOKEN_PROGRAM_ID);
  });

  it('Should not create associated token account instruction when sending secondary token to account containing token', async () => {
    const provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    const msg = provider.createMsg({
      from: '5UghpDRDYPger6vqVCrvvvRQsg3NZ5CNzJWfPyKTZpf2',
      to: 'EwSJ1V4zGUbJBbURwBViezwEo8Ei8UkSDigg9dvBmQXk',
      contractAddress: 'Hg675ypQpBUwP3wiWjq8pFQxr6rjnT2QRH4Vi519jdiP',
      amount: '0.0001',
    });
    const builtMsg = await msg.buildTx();
    const tx = builtMsg.tx as SolanaTransaction;
    expect(tx.instructions.length).toBe(1);
    expect(tx.instructions[0].programId).toBe(TOKEN_PROGRAM_ID);
  });
});
