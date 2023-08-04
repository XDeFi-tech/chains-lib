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
} from '@solana/web3.js';

import type { SolanaProvider } from './chain.provider';
import { DEFAULT_FEE, LAMPORTS_SCALING_FACTOR } from './constants';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  from: string;
  data?: string;
  gasPrice?: NumberIsh;
}

export interface TxBody {
  tx: SolanaTransaction;
  value: number; // in lamports
  to: string;
  from: string;
  gasPrice: number;
  data?: any;
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
    let gasPrice = msgData.gasPrice;
    const senderPublicKey = new PublicKey(msgData.from);
    const recipientPublicKey = new PublicKey(msgData.to);
    const value = BigNumber(msgData.amount)
      .multipliedBy(10 ** LAMPORTS_SCALING_FACTOR)
      .toNumber();
    const { blockhash } = await this.provider.rpcProvider.getRecentBlockhash();
    const instruction = new TransactionInstruction({
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
    const transaction = new SolanaTransaction({
      feePayer: senderPublicKey,
      recentBlockhash: blockhash,
    });
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
      data: msgData.data,
      gasPrice: gasPrice,
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
        .dividedBy(10 ** LAMPORTS_SCALING_FACTOR)
        .toString();
    } else {
      const options = await this.provider.gasFeeOptions();
      result.fee = BigNumber(
        options ? (options[speed || GasFeeSpeed.medium] as number) : DEFAULT_FEE
      )
        .dividedBy(10 ** LAMPORTS_SCALING_FACTOR)
        .toString();
    }

    return result;
  }
}
