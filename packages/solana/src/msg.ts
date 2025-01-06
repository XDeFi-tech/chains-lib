import {
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
  AddressLookupTableAccount,
  TransactionMessage,
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
import {
  checkMinimumBalanceForRentExemption,
  checkTxAlreadyHasPriorityFee,
} from './utils';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  from: string;
  gasLimit?: NumberIsh; // Compute Unit Budget
  gasPrice?: NumberIsh; // Compute Unit Price (micro lamport)
  decimals?: number;
  contractAddress?: string;
  memo?: string;
  data?: string; // for swaps when encoded is base64a
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
    const { blockhash } = await this.provider.rpcProvider.getLatestBlockhash(
      'confirmed'
    );
    return blockhash;
  }

  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    let decimals = msgData.decimals || 9; // 9 - lamports in SOL
    let gasPrice = msgData.gasPrice;
    let programId;

    const blockHeight = await this.provider.rpcProvider.getBlockHeight(
      'confirmed'
    );

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

      let versionedTransaction = VersionedTransaction.deserialize(buffer);
      // Check if the transaction has priority fee
      if (checkTxAlreadyHasPriorityFee(Buffer.from(buffer))) {
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
      const luts = await Promise.all(
        versionedTransaction.message.addressTableLookups.map((acc) =>
          this.provider.rpcProvider.getAddressLookupTable(acc.accountKey)
        )
      );
      const addressLookupTableAccounts = luts
        .map((lut) => lut.value)
        .filter((val) => val !== null) as AddressLookupTableAccount[];
      const messageV0 = TransactionMessage.decompile(
        versionedTransaction.message,
        {
          addressLookupTableAccounts,
        }
      );
      const alreadyAddPriorityFee = messageV0.instructions.some(
        (instruction) =>
          instruction.programId.toBase58() ===
          ComputeBudgetProgram.programId.toBase58()
      );
      // if not already add priority fee for dapp tx, add it
      if (
        !alreadyAddPriorityFee &&
        msgData.gasPrice &&
        msgData.gasLimit &&
        Number(msgData.gasPrice) > 0
      ) {
        versionedTransaction = new VersionedTransaction(
          new TransactionMessage({
            payerKey: messageV0.payerKey,
            recentBlockhash: messageV0.recentBlockhash,
            instructions: [
              ...messageV0.instructions,
              ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: msgData.gasPrice,
              }),
              ComputeBudgetProgram.setComputeUnitLimit({
                units: msgData.gasLimit,
              }),
            ],
          }).compileToV0Message()
        );
      }

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

    // 120 blocks is about 1 min, setting this means this tx can be broadcasted within 1min of being signed
    const lastValidBlockHeight = blockHeight + 120;
    const transaction = new SolanaTransaction({
      feePayer: senderPublicKey,
      blockhash,
      lastValidBlockHeight,
    });
    // Set priority fee and gas limit if provided and gasPrice is greater than 0
    // If have AdvanceNonce instruction, it should be added before this
    if (msgData.gasPrice && msgData.gasLimit && Number(msgData.gasPrice) > 0) {
      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: msgData.gasPrice,
      });
      transaction.add(addPriorityFee);
      const addComputeUnitLimit = ComputeBudgetProgram.setComputeUnitLimit({
        units: msgData.gasLimit,
      });
      transaction.add(addComputeUnitLimit);
    }

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

  async getFee(_speed?: GasFeeSpeed): Promise<FeeEstimation> {
    return this.provider.getFeeForMsg(this);
  }

  async getMaxAmountToSend() {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);
    const rentBalance = await checkMinimumBalanceForRentExemption(
      this.provider.rpcProvider
    );

    const balance = (await balances.getData()).find(
      (b) =>
        b.asset.chainId === this.provider.manifest.chainId && b.asset.native
    );

    if (!balance) throw new Error('No balance found');

    let maxAmount: BigNumber = new BigNumber(balance.amount).minus(gap);

    let fee = 5000; // lamports per signature
    // add priority fee
    if (msgData.gasPrice && msgData.gasLimit) {
      fee += new BigNumber(msgData.gasPrice)
        .multipliedBy(msgData.gasLimit / 1_000_000)
        .integerValue(BigNumber.ROUND_CEIL)
        .toNumber();
    }
    maxAmount = maxAmount.minus(new BigNumber(fee).dividedBy(LAMPORTS_PER_SOL));
    maxAmount = maxAmount.minus(
      new BigNumber(rentBalance).dividedBy(LAMPORTS_PER_SOL)
    );

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}
