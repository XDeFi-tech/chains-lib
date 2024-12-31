import {
  Balance,
  Chain,
  ChainDecorator,
  Coin,
  DataSource,
  FeeData,
  FeeEstimation,
  FeeOptions,
  GasFeeSpeed,
  Msg,
  MsgData,
  MsgEncoding,
  Response,
  Transaction,
  TransactionData,
  TransactionStatus,
  utils,
} from '@xdefi-tech/chains-core';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction as SolanaTransaction,
  SystemProgram,
  VersionedTransaction,
} from '@solana/web3.js';
import { some } from 'lodash';
import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import BigNumber from 'bignumber.js';

import { ChainDataSource, IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';
import { checkMinimumBalanceForRentExemption } from './utils';
import { BroadcastOptions, DEFAULT_BROADCAST_OPTIONS } from './constants';

export interface MultisigMsgData {
  from: string;
  to: string;
  amount: number;
  decimals?: number;
  tokenMintAddress?: string;
}
@ChainDecorator('SolanaProvider', {
  deps: [],
  providerType: 'Solana',
  features: [Chain.ChainFeatures.TOKENS],
})
export class SolanaProvider extends Chain.Provider<ChainMsg> {
  declare rpcProvider: Connection;

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options);
    this.rpcProvider = new Connection(this.manifest.rpcURL);
  }

  createMsg(data: MsgData, encoding: MsgEncoding = MsgEncoding.object) {
    return new ChainMsg(data, this, encoding);
  }

  /**
   * Create a multisig transaction to transfer sol and spl token
   * @param {MultisigMsgData[]} data - The data to be sent
   * @param {string} feePayer - The fee payer address
   * @returns {Promise<ChainMsg>} The msg encoded in base64
   */
  async createMultisigMsg(
    data: MultisigMsgData[],
    feePayer: string
  ): Promise<ChainMsg> {
    const transaction = new SolanaTransaction();
    const { blockhash, lastValidBlockHeight } =
      await this.rpcProvider.getLatestBlockhash('confirmed');
    transaction.feePayer = new PublicKey(feePayer);
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;

    for (const msgData of data) {
      const { from, to, amount, tokenMintAddress, decimals } = msgData;
      const fromPubkey = new PublicKey(from);
      const toPubkey = new PublicKey(to);
      const lamports = new BigNumber(amount)
        .multipliedBy(10 ** (decimals ?? this.manifest.decimals))
        .toNumber();

      if (!tokenMintAddress) {
        const txInstruction = SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        });
        transaction.add(txInstruction);
      } else {
        const tokenSenderAccount = getAssociatedTokenAddressSync(
          new PublicKey(tokenMintAddress),
          fromPubkey
        );

        const tokenReceiverAccount = getAssociatedTokenAddressSync(
          new PublicKey(tokenMintAddress),
          toPubkey
        );

        const txInstruction = createTransferInstruction(
          tokenSenderAccount,
          tokenReceiverAccount,
          fromPubkey,
          lamports
        );
        transaction.add(txInstruction);
      }
    }

    return this.createMsg(
      transaction
        .serialize({
          requireAllSignatures: false,
        })
        .toString('base64'),
      MsgEncoding.base64
    );
  }

  async getTransactions(
    address: string,
    afterBlock?: number | string
  ): Promise<Response<Transaction[], Transaction>> {
    return new Response(
      () => this.dataSource.getTransactions({ address, afterBlock }),
      () => this.dataSource.subscribeTransactions({ address })
    );
  }

  async estimateFee(
    msgs: Msg[],
    speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    return this.dataSource.estimateFee(msgs, speed);
  }

  async getNFTBalance(address: string) {
    return this.dataSource.getNFTBalance(address);
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    );
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return this.dataSource.gasFeeOptions();
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async broadcast(
    msgs: ChainMsg[],
    options?: Chain.BroadcastOptions
  ): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }

    const broadcastOptions: BroadcastOptions = {
      ...DEFAULT_BROADCAST_OPTIONS,
      ...options,
    };

    const transactions: Transaction[] = [];
    for (const msg of msgs) {
      const serializedTx = (msg.signedTransaction as any).serializedTx;

      const checkIsTransactionProcessed = async (
        hash: string
      ): Promise<string | undefined> => {
        const statusRes = await this.rpcProvider.getSignatureStatuses([hash]);
        const status = statusRes.value?.[0];
        if (!!status?.confirmationStatus) return hash;
        if (status?.err) throw status.err;
        return undefined;
      };
      let hash: string | undefined = undefined;
      // helper fn to broadcast, wait 1.5 second, then check the status of the tx
      const broadcastAndCheckStatus = async (): Promise<string | undefined> => {
        try {
          hash = await this.rpcProvider.sendRawTransaction(
            serializedTx,
            broadcastOptions
          );
        } catch (e: any) {
          if (
            e?.message?.includes?.(
              'This transaction has already been processed'
            )
          ) {
            if (hash) return hash;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        for (let count = 0; count < 20; count++) {
          try {
            if (hash) {
              const res = await checkIsTransactionProcessed(hash);
              if (res) return;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (e) {
            return undefined;
          }
        }
        return undefined;
      };
      // repeat max of 4 times to get successful broadcast
      await utils.waitFor(broadcastAndCheckStatus, {
        interval: 1,
        tries: 4,
      });
      if (hash) {
        transactions.push(Transaction.fromData({ hash }));
      }
    }

    return transactions;
  }

  async getTransaction(txHash: string): Promise<TransactionData | null> {
    const tx = await this.rpcProvider.getTransaction(txHash);
    if (!tx) {
      return null;
    }
    const result = {
      hash: tx.transaction.message.recentBlockhash,
      status: TransactionStatus.pending,
      from: '',
      to: '',
    };

    if (tx.meta?.err) {
      result.status = TransactionStatus.failure;
    } else if (tx.slot) {
      result.status = TransactionStatus.success;
    }

    return result;
  }

  async getFeeForMsg(msg: ChainMsg): Promise<FeeEstimation> {
    const txData = await msg.buildTx();
    let dataForEstimate = null;
    switch (txData.encoding) {
      case MsgEncoding.object:
        const transaction = txData.tx as SolanaTransaction;
        dataForEstimate = transaction.compileMessage();
        break;
      case MsgEncoding.base64:
      case MsgEncoding.base58:
        const versionedTransaction = txData.tx as VersionedTransaction;
        dataForEstimate = versionedTransaction.message;
        const slot = await this.rpcProvider.getSlot('finalized');
        // get the latest block (allowing for v0 transactions)
        const block = await this.rpcProvider.getBlock(slot, {
          maxSupportedTransactionVersion: 0,
        });
        if (block) {
          dataForEstimate.recentBlockhash = block.blockhash;
        }
        break;
      default:
        throw new Error('Invalid encoding for solana transaction');
    }
    const fee = await this.rpcProvider.getFeeForMessage(
      dataForEstimate,
      'confirmed'
    );
    return {
      fee: fee.value
        ? new BigNumber(fee.value.toString())
            .dividedBy(LAMPORTS_PER_SOL)
            .toString()
        : null,
      maxFee: null,
    };
  }

  static get dataSourceList() {
    return {
      IndexerDataSource: IndexerDataSource,
      ChainDataSource: ChainDataSource,
    };
  }

  static verifyAddress(address: string): boolean {
    try {
      const publicKey = new PublicKey(address);
      return publicKey.toBase58() === address;
    } catch (error) {
      return false;
    }
  }

  static get staticUtils() {
    return {
      checkMinimumBalanceForRentExemption,
    };
  }
}
