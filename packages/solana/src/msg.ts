import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import {
  PublicKey,
  SystemProgram,
  Transaction as SolanaTransaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  getMint,
  createMintToInstruction,
} from '@solana/spl-token';

import type { SolanaProvider } from './chain.provider';
import { DEFAULT_FEE } from './constants';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  from: string;
  gasPrice?: NumberIsh;
  decimals?: number;
  contractAddress?: string;
}

export interface TxBody {
  tx: SolanaTransaction;
  value: number; // in lamports
  to: string;
  from: string;
  gasPrice: number;
  decimals: number;
  programId: PublicKey;
}

export class ChainMsg extends BasMsg<MsgBody, TxBody> {
  declare signedTransaction: Buffer;
  declare provider: SolanaProvider;

  constructor(data: MsgBody, provider: SolanaProvider) {
    super(data, provider);
  }

  public toData() {
    return this.data;
  }

  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    let decimals = msgData.decimals || 9; // 9 - lamports in SOL
    let gasPrice = msgData.gasPrice;
    let programId;
    const senderPublicKey = new PublicKey(msgData.from);
    const recipientPublicKey = new PublicKey(msgData.to);
    let value;
    const { blockhash } = await this.provider.rpcProvider.getRecentBlockhash();

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
      value = BigNumber(msgData.amount)
        .multipliedBy(10 ** mint.decimals)
        .toNumber();
      instruction = createMintToInstruction(
        mint.address,
        recipientPublicKey,
        senderPublicKey,
        value
      );
      decimals = mint.decimals;
    } else {
      value = BigNumber(msgData.amount)
        .multipliedBy(LAMPORTS_PER_SOL)
        .toNumber();
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

    transaction.add(instruction);

    if (!gasPrice) {
      const options = await this.provider.gasFeeOptions();
      gasPrice = options
        ? (options[GasFeeSpeed.medium] as number)
        : DEFAULT_FEE;
    }

    return {
      tx: transaction,
      value: value,
      to: msgData.to,
      from: msgData.from,
      gasPrice: gasPrice,
      decimals,
      programId,
    };
  }

  async getFee(speed?: GasFeeSpeed): Promise<FeeEstimation> {
    const result: FeeEstimation = {
      fee: null,
      maxFee: null,
    };
    const msgData = this.toData();

    if (msgData.gasPrice) {
      result.fee = BigNumber(msgData.gasPrice)
        .dividedBy(LAMPORTS_PER_SOL)
        .toString();
    } else {
      const options = await this.provider.gasFeeOptions();
      result.fee = BigNumber(
        options ? (options[speed || GasFeeSpeed.medium] as number) : DEFAULT_FEE
      )
        .dividedBy(LAMPORTS_PER_SOL)
        .toString();
    }

    return result;
  }
}
