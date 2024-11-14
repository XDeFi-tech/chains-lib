import {
  Balance,
  Chain,
  ChainDecorator,
  Coin,
  DataSource,
  FeeData,
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
  PublicKey,
  Transaction as SolanaTransaction,
  SystemProgram,
} from '@solana/web3.js';
import { some } from 'lodash';
import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import BigNumber from 'bignumber.js';

import { ChainDataSource, IndexerDataSource } from './datasource';
import { ChainMsg } from './msg';
import {
  checkMinimumBalanceForRentExemption,
  getSignatureStatus,
} from './utils';

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

  async broadcast(msgs: ChainMsg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw new Error('Some message do not have signature, sign it first');
    }

    const transactions: Transaction[] = [];
    for (const msg of msgs) {
      const serializedTx = (msg.signedTransaction as any).serializedTx;
      // helper fn to broadcast, wait 1/2 second, then check the status of the tx
      const helper = async (): Promise<string | undefined> => {
        const hash = await this.rpcProvider.sendRawTransaction(serializedTx, {
          skipPreflight: msg.data.skipPreflight ?? false,
          preflightCommitment: msg.data.preflightCommitment ?? 'confirmed',
          maxRetries: 0,
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        const statusRes = await this.rpcProvider.getSignatureStatuses([hash]);
        const status = statusRes.value?.[0];
        if (!!status?.confirmationStatus) return hash;
        if (status?.err) throw status.err;
        return undefined;
      };
      // repeat max of 150 times to get successful broadcast
      // 150 as this is the number of valid blocks this Tx could be valid for
      const hash = await utils.waitFor(helper, { interval: 1, tries: 150 });
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
