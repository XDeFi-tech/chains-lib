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
  AccountMeta,
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
import {
  ConcurrentMerkleTreeAccount,
  PROGRAM_ID as COMPRESSION_PROGRAM_ID,
} from '@solana/spl-account-compression';
import {
  createTransferInstruction as createCompressedTokenTransferInstruction,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
} from '@metaplex-foundation/mpl-bubblegum';

import type { SolanaProvider } from './chain.provider';
import { DEFAULT_FEE, NOOP_PROGRAM_ADDRESS } from './constants';
import { SolanaSignature } from './types';
import {
  checkMinimumBalanceForRentExemption,
  checkTxAlreadyHasPriorityFee,
  getNftAsset,
  getNftAssetProof,
} from './utils';

export enum TokenType {
  None = 'None',
  NON_FUNGIBLE = 'NonFungible',
  FUNGIBLE = 'Fungible',
}
export interface MsgBody {
  amount: NumberIsh;
  to: string;
  from: string;
  gasLimit?: NumberIsh; // Compute Unit Budget
  gasPrice?: NumberIsh; // Compute Unit Price (micro lamport)
  decimals?: number;
  contractAddress?: string;
  tokenType?: TokenType;
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
    let contractInfo: any = {};
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
      if (msgData.tokenType === TokenType.NON_FUNGIBLE) {
        const buildResult = await this.buildNftTransferInstruction(
          senderPublicKey,
          recipientPublicKey
        );
        transaction.add(...buildResult.instructions);
        instruction = buildResult.instructions;
        decimals = buildResult.decimals;
        contractInfo = buildResult.contractInfo;
      } else {
        const buildResult = await this.buildTokenTransferInstruction(
          senderPublicKey,
          recipientPublicKey
        );
        transaction.add(...buildResult.instructions);
        instruction = buildResult.instructions;
        decimals = buildResult.decimals;
        contractInfo = buildResult.contractInfo;
      }
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
      transaction.add(instruction);
    }

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

  async buildTokenTransferInstruction(
    senderPublicKey: PublicKey,
    recipientPublicKey: PublicKey
  ) {
    const instructions: TransactionInstruction[] = [];
    const msgData = this.toData();
    const mintPublicKey = new PublicKey(msgData.contractAddress);
    const info = await this.provider.rpcProvider.getAccountInfo(
      mintPublicKey,
      'confirmed'
    );
    const programId = info?.owner ?? TOKEN_PROGRAM_ID;
    const mint = await getMint(
      this.provider.rpcProvider,
      mintPublicKey,
      'confirmed',
      programId
    );
    const value = new BigNumber(msgData.amount)
      .multipliedBy(10 ** mint.decimals)
      .toNumber();
    const [fromTokenAcc, toTokenAcc] = await Promise.all([
      getAssociatedTokenAddress(
        mint.address,
        senderPublicKey,
        undefined,
        programId
      ),
      getAssociatedTokenAddress(
        mint.address,
        recipientPublicKey,
        undefined,
        programId
      ),
    ]);
    try {
      await getAccount(
        this.provider.rpcProvider,
        toTokenAcc,
        'confirmed',
        programId
      );
    } catch (error) {
      if (
        error instanceof TokenAccountNotFoundError ||
        error instanceof TokenInvalidAccountOwnerError
      ) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            senderPublicKey,
            toTokenAcc,
            recipientPublicKey,
            mint.address,
            programId
          )
        );
      }
    }

    instructions.push(
      createTransferInstruction(
        fromTokenAcc,
        toTokenAcc,
        senderPublicKey,
        value,
        undefined,
        programId
      )
    );
    return {
      instructions: instructions,
      decimals: mint.decimals,
      contractInfo: {
        contractAddress: msgData.contractAddress,
        toTokenAddress: toTokenAcc.toBase58(),
        fromTokenAddress: fromTokenAcc.toBase58(),
      },
    };
  }

  async buildNftTransferInstruction(
    senderPublicKey: PublicKey,
    recipientPublicKey: PublicKey
  ) {
    const msgData = this.toData();
    const mintPublicKey = new PublicKey(msgData.contractAddress);
    const asset = await getNftAsset(
      this.provider.manifest.dasUrl,
      mintPublicKey
    );
    if (!asset.compression.compressed) {
      return this.buildTokenTransferInstruction(
        senderPublicKey,
        recipientPublicKey
      );
    }
    const assetProof = await getNftAssetProof(
      this.provider.manifest.dasUrl,
      mintPublicKey
    );
    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
      this.provider.rpcProvider,
      new PublicKey(assetProof.tree_id)
    );

    // extract the needed values for our transfer instruction
    const treeAuthority = treeAccount.getAuthority();
    const canopyDepth = treeAccount.getCanopyDepth();

    // parse the list of proof addresses into a valid AccountMeta[]
    const proof: AccountMeta[] = assetProof.proof
      .slice(0, assetProof.proof.length - (!!canopyDepth ? canopyDepth : 0))
      .map((node: string) => ({
        pubkey: new PublicKey(node),
        isSigner: false,
        isWritable: false,
      }));

    const transferIx = createCompressedTokenTransferInstruction(
      {
        treeAuthority,
        leafOwner: new PublicKey(asset.ownership.owner),
        leafDelegate: new PublicKey(
          asset.ownership.delegate
            ? asset.ownership.delegate
            : asset.ownership.owner
        ),
        newLeafOwner: recipientPublicKey,
        merkleTree: new PublicKey(assetProof.tree_id),
        logWrapper: new PublicKey(NOOP_PROGRAM_ADDRESS),
        anchorRemainingAccounts: proof,
        compressionProgram: COMPRESSION_PROGRAM_ID,
      },
      {
        root: [...new PublicKey(assetProof.root.trim()).toBytes()],
        dataHash: [
          ...new PublicKey(asset.compression.data_hash.trim()).toBytes(),
        ],
        creatorHash: [
          ...new PublicKey(asset.compression.creator_hash.trim()).toBytes(),
        ],
        nonce: asset.compression.leaf_id,
        index: asset.compression.leaf_id,
      },
      BUBBLEGUM_PROGRAM_ID
    );
    return {
      instructions: [transferIx],
      decimals: 0,
      contractInfo: {
        contractAddress: msgData.contractAddress,
      },
    };
  }
}
