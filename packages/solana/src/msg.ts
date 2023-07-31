import { Msg as BasMsg, NumberIsh } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  from: string;
  data?: string;
}

export interface FeeEstimation {
  fee: null | BigNumber;
  maxFee: null | BigNumber;
}

export class ChainMsg extends BasMsg<MsgBody, SolanaTransaction> {
  declare signedTransaction: Buffer;

  public toData() {
    return this.data;
  }

  async buildTx(): Promise<SolanaTransaction> {
    const data = this.toData();
    const senderPublicKey = new PublicKey(data.from);
    const recipientPublicKey = new PublicKey(data.to);
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: senderPublicKey, isSigner: true, isWritable: true },
        { pubkey: recipientPublicKey, isSigner: false, isWritable: true },
      ],
      programId: SystemProgram.programId, // token vs native
      data: SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports: data.amount,
      }).data,
    });
    const transaction = new SolanaTransaction();
    transaction.add(instruction);
    return transaction;
  }

  getFee() {
    return this.data;
  }

  static fromData(data: MsgBody) {
    return new ChainMsg(data);
  }
}
