import {
  Response,
  GasFeeSpeed,
  TransactionStatus,
  Coin,
} from '@xdefi-tech/chains-core';
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';

import { ChainMsg } from './msg';
import { SolanaProvider, MultisigMsgData } from './chain.provider';
import { ChainDataSource, IndexerDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';
import { AssetInternalType, TokenCategory } from './gql';

describe('chain.provider', () => {
  const NETWORKED_QUERIES =
    process.env.NETWORKED_QUERIES === '1' ? true : false;

  let chainProvider: SolanaProvider;
  let indexProvider: SolanaProvider;

  beforeEach(() => {
    chainProvider = new SolanaProvider(new ChainDataSource(SOLANA_MANIFEST));
    indexProvider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
  });

  it('createMsg() should create a ChainMsg instance for native token', () => {
    let msg = chainProvider.createMsg({
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);

    msg = indexProvider.createMsg({
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('CreateMultisignMsg() should create a ChainMsg with multisign instruction', async () => {
    const data: MultisigMsgData[] = [
      {
        from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
        to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
        amount: 0.000001,
        decimals: 9,
      },
      {
        from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
        to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
        amount: 0.000002,
        tokenMintAddress: 'So11111111111111111111111111111111111111112',
        decimals: 9,
      },
    ];

    const feePayer = 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5';

    const msg = await chainProvider.createMultisigMsg(data, feePayer);

    expect(msg).toBeInstanceOf(ChainMsg);
    const decodedMsg = Buffer.from(msg.toData(), 'base64');
    expect(decodedMsg).toBeTruthy();
    const transaction = SolanaTransaction.from(decodedMsg);
    expect(transaction.instructions.length).toEqual(2);

    const [solInstruction, splInstruction] = transaction.instructions;

    // Check SOL transfer instruction
    expect(solInstruction).toBeInstanceOf(TransactionInstruction);
    expect(solInstruction.programId).toEqual(SystemProgram.programId);
    const solKeys = solInstruction.keys.map((key) => key.pubkey.toString());
    expect(solKeys).toContain('C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5');
    expect(solInstruction.data).toBeTruthy();

    // Check SPL token transfer instruction
    expect(splInstruction).toBeInstanceOf(TransactionInstruction);
    const splKeys = splInstruction.keys.map((key) => key.pubkey.toString());
    const tokenAccount = await getAssociatedTokenAddressSync(
      new PublicKey('So11111111111111111111111111111111111111112'),
      new PublicKey('C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5')
    );
    expect(splKeys).toContain(tokenAccount.toBase58());
    expect(splKeys).toContain('C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5');
    expect(splInstruction.data).toBeTruthy();
  });

  it('getBalance() should return balance data', async () => {
    if (!NETWORKED_QUERIES) {
      jest.spyOn(SolanaProvider.prototype, 'getBalance').mockResolvedValue(
        new Response(
          // getData
          jest.fn().mockImplementation(async () => [
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
                priceChange: {
                  dayPriceChange: '3',
                },
                type: AssetInternalType.CRYPTOCURRENCY,
                categories: [TokenCategory.TRENDING_TOKEN],
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
                type: AssetInternalType.TOKEN,
                categories: [TokenCategory.SHITCOIN],
              },
              amount: '1000',
            },
          ]),
          // getObserver
          jest.fn().mockImplementation(async () => [
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
                priceChange: {
                  dayPriceChange: '3',
                },
                type: AssetInternalType.CRYPTOCURRENCY,
                categories: [TokenCategory.TRENDING_TOKEN],
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
                type: AssetInternalType.TOKEN,
                categories: [TokenCategory.SHITCOIN],
              },
              amount: '1000',
            },
          ])
        )
      );

      const balance = await chainProvider.getBalance(
        'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toEqual(2);
      expect(balanceData[0].amount).toEqual('1000');
      expect(balanceData[0].asset.symbol).toEqual('SOL');

      expect(balanceData[0].asset.price).toEqual('123');
      expect(balanceData[0].asset.priceChange.dayPriceChange).toEqual('3');
      expect(balanceData[0].asset.type).toEqual(
        AssetInternalType.CRYPTOCURRENCY
      );
      expect(JSON.stringify(balanceData[0].asset.categories)).toEqual(
        JSON.stringify([TokenCategory.TRENDING_TOKEN])
      );
      expect(balanceData[1].amount).toEqual('1000');
      expect(balanceData[1].asset.symbol).toEqual('BONK');
      expect(balanceData[1].asset.type).toEqual(AssetInternalType.TOKEN);
      expect(JSON.stringify(balanceData[1].asset.categories)).toEqual(
        JSON.stringify([TokenCategory.SHITCOIN])
      );
    } else {
      const balance = await chainProvider.getBalance(
        'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5'
      );

      const balanceData = await balance.getData();
      expect(balanceData.length).toBeGreaterThanOrEqual(0);
      if (balanceData.length > 0) {
        expect(balanceData[0]).toBeInstanceOf(Coin);
        expect(balanceData[0].amount).toBeTruthy();
        expect(balanceData[0].asset.price).toBeTruthy();
        expect(balanceData[0].asset.priceChange.dayPriceChange).toBeTruthy();
      }
    }
  });

  it('estimateFee() should return fee estimation', async () => {
    jest.spyOn(SolanaProvider.prototype, 'estimateFee').mockResolvedValue([
      {
        gasLimit: 1,
        gasPrice: 1,
        maxFeePerGas: 1,
        baseFeePerGas: 1,
        maxPriorityFeePerGas: 1,
      },
    ]);

    const msg = chainProvider.createMsg({
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    });

    const estimateFee = await chainProvider.estimateFee(
      [msg],
      GasFeeSpeed.medium
    );

    expect(estimateFee.length).toEqual(1);
    expect(estimateFee[0].gasLimit).toBeTruthy();
  });

  it('gasFeeOptions() should get fee options', async () => {
    jest.spyOn(SolanaProvider.prototype, 'gasFeeOptions').mockResolvedValue({
      high: 0.003,
      medium: 0.0025,
      low: 0.001,
    });

    const feeOptions = await chainProvider.gasFeeOptions();

    expect(feeOptions?.low).toBeTruthy();
    expect(feeOptions?.medium).toBeTruthy();
    expect(feeOptions?.high).toBeTruthy();
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    jest.spyOn(SolanaProvider.prototype, 'getTransaction').mockResolvedValue({
      hash: '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw',
      to: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      from: '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8',
      status: TransactionStatus.pending,
      amount: '1000',
    });

    const txData = await chainProvider.getTransaction(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );

    expect(txData?.hash).toEqual(
      '6SkceyvCgfYV6bbPnvxYcgUjTqnbY5fZ3gQhFyXxYRhw'
    );
  });

  it('should return false when verifying an invalid address', () => {
    expect(SolanaProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid address', () => {
    expect(
      SolanaProvider.verifyAddress(
        'BujFXMX9ZmniuJCM2VRKQqe1enmcoFxfUBmRqCMqKGic'
      )
    ).toBe(true);
  });
});
