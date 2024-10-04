import {
  Coin,
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgEncoding,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import {
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction as SolanaTransaction,
  TransactionInstruction,
  VersionedTransaction,
  Commitment,
} from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMint,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from '@solana/spl-token';
import bs58 from 'bs58';

import type { SolanaProvider } from './chain.provider';
import { DEFAULT_FEE } from './constants';
import { SolanaSignature } from './types';
import { checkMinimumBalanceForRentExemption } from './utils';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  from: string;
  gasPrice?: NumberIsh;
  decimals?: number;
  contractAddress?: string;
  memo?: string;
  data?: string; // for swaps when encoded is base64a
  priorityFeeAmount?: number;
  skipPreflight?: boolean;
  preflightCommitment?: Commitment;
}

export interface TxBody {
  tx: SolanaTransaction | VersionedTransaction;
  value: number; // in lamports
  to: string;
  from: string;
  gasPrice: number;
  decimals: number;
  programId?: PublicKey;
  contractAddress?: string;
  toTokenAddress?: string;
  fromTokenAddress?: string;
  memo?: string;
  encoding?: MsgEncoding;
  txType?: TransactionType;
}

export enum TransactionType {
  Message = 0,
  Legacy = 1,
  Versioned = 2,
}

export class ChainMsg extends BasMsg<MsgBody, TxBody> {
  declare signedTransaction: SolanaSignature;
  declare provider: SolanaProvider;
  declare blockhash?: string;

  constructor(data: MsgBody, provider: SolanaProvider, encoding: MsgEncoding) {
    super(data, provider, encoding);
  }

  public toData() {
    return this.data;
  }

  async getLatestBlockhash(): Promise<string> {
    if (this.blockhash) return this.blockhash;
    const { blockhash } = await this.provider.rpcProvider.getLatestBlockhash(
      'confirmed'
    );
    this.blockhash = blockhash;
    return this.blockhash;
  }

  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    let decimals = msgData.decimals || 9; // 9 - lamports in SOL
    let gasPrice = msgData.gasPrice;
    let programId;

    if (
      this.encoding === MsgEncoding.base64 ||
      this.encoding === MsgEncoding.base58
    ) {
      let buffer;
      if (this.encoding === MsgEncoding.base64) {
        buffer = Buffer.from(msgData.data, 'base64');
      } else {
        buffer = bs58.decode(msgData.data);
      }

      const versionedTransaction = VersionedTransaction.deserialize(buffer);

      return {
        tx: versionedTransaction,
        value: 0,
        to: msgData.to,
        from: msgData.from,
        gasPrice: 0,
        decimals: msgData.decimals || this.provider.manifest.decimals,
        encoding: this.encoding,
      };
    }

    const balance = await this.provider.getBalance(msgData.from);
    const balanceData = await balance.getData();
    let remainingBalance = new BigNumber(
      balanceData.find((b) => b.asset.native)?.amount.toNumber() || 0
    )
      .multipliedBy(LAMPORTS_PER_SOL)
      .toNumber();

    const senderPublicKey = new PublicKey(msgData.from);
    const recipientPublicKey = new PublicKey(msgData.to);
    let value;
    const contractInfo: any = {};
    const blockhash = await this.getLatestBlockhash();

    const transaction = new SolanaTransaction({
      feePayer: senderPublicKey,
      recentBlockhash: blockhash,
    });

    let instruction;
    if (msgData.contractAddress) {
      const mintPublicKey = new PublicKey(msgData.contractAddress);
      const mint = await getMint(
        this.provider.rpcProvider,
        mintPublicKey,
        'confirmed',
        TOKEN_PROGRAM_ID
      );
      programId = TOKEN_PROGRAM_ID;
      value = new BigNumber(msgData.amount)
        .multipliedBy(10 ** mint.decimals)
        .toNumber();
      const [fromTokenAcc, toTokenAcc] = await Promise.all([
        getAssociatedTokenAddress(mint.address, senderPublicKey),
        getAssociatedTokenAddress(mint.address, recipientPublicKey),
      ]);
      try {
        await getAccount(this.provider.rpcProvider, toTokenAcc);
      } catch (error) {
        if (
          error instanceof TokenAccountNotFoundError ||
          error instanceof TokenInvalidAccountOwnerError
        ) {
          transaction.add(
            createAssociatedTokenAccountInstruction(
              senderPublicKey,
              toTokenAcc,
              recipientPublicKey,
              mint.address
            )
          );
        }
      }
      contractInfo.contractAddress = msgData.contractAddress;
      contractInfo.toTokenAddress = toTokenAcc.toBase58();
      contractInfo.fromTokenAddress = fromTokenAcc.toBase58();

      instruction = createTransferInstruction(
        fromTokenAcc,
        toTokenAcc,
        senderPublicKey,
        value
      );
      decimals = mint.decimals;
    } else {
      value = new BigNumber(msgData.amount)
        .multipliedBy(LAMPORTS_PER_SOL)
        .toNumber();
      remainingBalance = remainingBalance - value;
      instruction = new TransactionInstruction({
        keys: [
          { pubkey: senderPublicKey, isSigner: true, isWritable: true },
          { pubkey: recipientPublicKey, isSigner: false, isWritable: true },
        ],
        programId: SystemProgram.programId, // token vs native
        data: SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPublicKey,
          lamports: value,
        }).data,
      });
      programId = SystemProgram.programId;
    }

    if (msgData.priorityFeeAmount) {
      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: msgData.priorityFeeAmount,
      });
      transaction.add(addPriorityFee);
    }
    transaction.add(instruction);

    if (msgData.memo) {
      transaction.add(
        new TransactionInstruction({
          keys: [{ pubkey: senderPublicKey, isSigner: true, isWritable: true }],
          programId: new PublicKey(
            'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
          ),
          data: Buffer.from(msgData.memo, 'utf-8'),
        })
      );
    }

    const rentBalance = await checkMinimumBalanceForRentExemption(
      this.provider.rpcProvider
    );

    if (!gasPrice) {
      const options = await this.provider.gasFeeOptions();
      gasPrice = options
        ? (options[GasFeeSpeed.medium] as number)
        : DEFAULT_FEE;
    }

    remainingBalance = remainingBalance - gasPrice;
    if (remainingBalance < rentBalance) {
      throw new Error('Not enough SOL left for rent');
    }

    return {
      tx: transaction,
      value: value,
      to: msgData.to,
      from: msgData.from,
      gasPrice: gasPrice,
      memo: msgData.data,
      decimals,
      programId,
      memoProgramId: new PublicKey(
        'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
      ),
      encoding: this.encoding,
      ...contractInfo,
    };
  }

  async getFee(speed?: GasFeeSpeed): Promise<FeeEstimation> {
    const result: FeeEstimation = {
      fee: null,
      maxFee: null,
    };
    const msgData = this.toData();

    if (msgData.gasPrice) {
      result.fee = new BigNumber(msgData.gasPrice)
        .dividedBy(LAMPORTS_PER_SOL)
        .toString();
    } else {
      const options = await this.provider.gasFeeOptions();
      result.fee = new BigNumber(
        options ? (options[speed || GasFeeSpeed.medium] as number) : DEFAULT_FEE
      )
        .dividedBy(LAMPORTS_PER_SOL)
        .toString();
    }

    return result;
  }

  async getMaxAmountToSend(contract?: string) {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);
    const rentBalance = await checkMinimumBalanceForRentExemption(
      this.provider.rpcProvider
    );

    let balance: Coin | undefined;

    if (!contract) {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId && b.asset.native
      );
    } else {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId &&
          b.asset.address === contract
      );
    }

    if (!balance) throw new Error('No balance found');

    let maxAmount: BigNumber = new BigNumber(balance.amount).minus(gap);

    if (balance.asset.native) {
      const feeEstimation = await this.getFee();
      maxAmount = maxAmount.minus(feeEstimation.fee || 0);
      maxAmount = maxAmount.minus(
        new BigNumber(rentBalance).dividedBy(LAMPORTS_PER_SOL)
      );
    }

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}
