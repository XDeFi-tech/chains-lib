import {
  Asset,
  Balance,
  BalanceFilter,
  Chain,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Injectable,
  MsgEncoding,
  Transaction,
  TransactionData,
  TransactionStatus,
  TransactionsFilter,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import axios, { Axios } from 'axios';
import {
  AddressLookupTableAccount,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction as SolanaTransaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, AccountLayout, getMint } from '@solana/spl-token';
import { Metadata, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { getSimulationComputeUnits } from '@solana-developers/helpers';

import { checkTxAlreadyHasPriorityFee } from '../../utils';
import { ChainMsg } from '../../msg';
import {
  PriorityFeeEstimateParams,
  PriorityFeeEstimateResponse,
  PriorityFeeLevelParamsMapping,
} from '../../types';

@Injectable()
export class ChainDataSource extends DataSource {
  declare rpcProvider: Connection;
  public rest: Axios;

  constructor(manifest: Chain.Manifest) {
    super(manifest);
    this.rpcProvider = new Connection(this.manifest.rpcURL);
    this.rest = axios.create({ baseURL: this.manifest.rpcURL });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const balance = await this.rpcProvider.getBalance(
      new PublicKey(filter.address)
    );

    const result: Coin[] = [];
    const nativeToken = new Coin(
      new Asset({
        id: this.manifest.name,
        chainId: this.manifest.chainId,
        name: this.manifest.name,
        symbol: this.manifest.chainSymbol,
        icon: null,
        native: true,
        address: null,
        price: undefined,
        decimals: this.manifest.decimals,
      }),
      new BigNumber(balance.toString()).dividedBy(10 ** this.manifest.decimals)
    );

    result.push(nativeToken);

    const tokens = await this.rpcProvider.getTokenAccountsByOwner(
      new PublicKey(filter.address), // owner here
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    for (const token of tokens.value) {
      const accountInfo = AccountLayout.decode(token.account.data);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          PROGRAM_ID.toBuffer(),
          accountInfo.mint.toBuffer(),
        ],
        PROGRAM_ID
      );

      const metadata = await Metadata.fromAccountAddress(
        this.rpcProvider,
        metadataPDA[0]
      );

      const tokenName = metadata.data.name;
      const tokenSymbol = metadata.data.symbol;
      const mint = await getMint(this.rpcProvider, accountInfo.mint);
      const tokenDecimals = mint.decimals;
      const tokenBalance = accountInfo.amount;

      const coin = new Coin(
        new Asset({
          chainId: this.manifest.chainId,
          name: tokenName,
          symbol: tokenSymbol,
          address: accountInfo.mint.toBase58(),
          decimals: tokenDecimals,
          native: accountInfo.isNativeOption === 1,
          icon: null,
          id: `${this.manifest.chain}+`,
          price: undefined,
        }),
        new BigNumber(tokenBalance.toString()).dividedBy(10 ** tokenDecimals)
      );
      result.push(coin);
    }

    return result;
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const signaturesList = await this.rpcProvider.getSignaturesForAddress(
      new PublicKey(filter.address)
    );

    const signatureList = signaturesList.map(
      (transaction) => transaction.signature
    );
    const transactionDetails = await this.rpcProvider.getParsedTransactions(
      signatureList,
      { maxSupportedTransactionVersion: 0 }
    );

    const txList: Transaction[] = [];

    for (let i = 0; i < transactionDetails.length; i++) {
      const tx: TransactionData = {
        hash: signatureList[i],
        to:
          transactionDetails[
            i
          ]?.transaction.message.instructions[0].programId.toBase58() ?? '',
        from: filter.address,
        status: transactionDetails[i]?.blockTime
          ? transactionDetails[i]?.meta?.err
            ? TransactionStatus.failure
            : TransactionStatus.success
          : TransactionStatus.pending,
      };

      txList.push(Transaction.fromData(tx));
    }

    return txList;
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  /**
   * Estimate the priority fee for a transaction
   * @param transactions - The transactions to estimate the priority fee in base64
   * @param priorityLevel - (optional) The priority level to estimate the fee for
   */
  async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed = GasFeeSpeed.medium) {
    const results: FeeData[] = [];
    for (const msg of msgs) {
      const result: FeeData = {
        gasLimit: 200_000,
      };
      const { tx, encoding } = await msg.buildTx();
      let transaction: VersionedTransaction | SolanaTransaction;

      const processTransaction = async (
        transaction: VersionedTransaction | SolanaTransaction,
        instructions: TransactionInstruction[],
        payerKey: PublicKey
      ) => {
        const [units, priorityFee] = await Promise.allSettled([
          this.estimateComputeUnits(instructions, payerKey),
          this.getPriorityFeeEstimate({
            transaction: Buffer.from(
              transaction.serialize({ requireAllSignatures: false })
            ).toString('base64'),
            options: {
              transactionEncoding: 'base64',
              priorityLevel: PriorityFeeLevelParamsMapping[speed],
            },
          }),
        ]);
        if (units.status === 'fulfilled') {
          // add 300 units for priority fee instructions
          result.gasLimit = units.value ? units.value + 300 : 200_000; // default to 200_000 units
        }
        if (priorityFee.status === 'fulfilled' && priorityFee.value.result) {
          if (
            typeof priorityFee.value.result.priorityFeeEstimate === 'number'
          ) {
            result.gasPrice = priorityFee.value.result.priorityFeeEstimate;
          } else {
            result.gasPrice =
              priorityFee.value.result.priorityFeeEstimate[speed];
          }
        }
      };

      switch (encoding) {
        case MsgEncoding.base64:
        case MsgEncoding.base58:
          transaction = tx as VersionedTransaction;
          if (
            checkTxAlreadyHasPriorityFee(Buffer.from(transaction.serialize()))
          ) {
            results.push({
              gasLimit: 0,
              gasPrice: 0,
            });
          } else {
            const luts = await Promise.all(
              transaction.message.addressTableLookups.map((acc) =>
                this.rpcProvider.getAddressLookupTable(acc.accountKey)
              )
            );
            const addressLookupTableAccounts = luts
              .map((lut) => lut.value)
              .filter((val) => val !== null) as AddressLookupTableAccount[];
            const messageV0 = TransactionMessage.decompile(
              transaction.message,
              {
                addressLookupTableAccounts,
              }
            );
            await processTransaction(
              transaction,
              messageV0.instructions,
              new PublicKey(messageV0.payerKey)
            );
          }
          break;
        case MsgEncoding.object:
          transaction = tx as SolanaTransaction;
          await processTransaction(
            transaction,
            transaction.instructions,
            transaction.feePayer!
          );
          break;
        default:
          throw new Error('Invalid encoding for solana transaction');
      }
      results.push(result);
    }
    return results;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return null;
  }

  async getNonce(address: string): Promise<number> {
    return (
      await this.rpcProvider.getSignaturesForAddress(new PublicKey(address))
    ).length;
  }

  async getPriorityFeeEstimate(
    params: PriorityFeeEstimateParams
  ): Promise<PriorityFeeEstimateResponse> {
    if (!params.transaction && !params.accountKeys) {
      throw new Error('One of transaction or accountKeys must be provided');
    }

    if (params.transaction && params.accountKeys) {
      throw new Error('Transaction and accountKeys cannot both be provided');
    }

    const { data } = await axios.post(this.rpcProvider.rpcEndpoint, {
      jsonrpc: '2.0',
      id: 'dontcare',
      method: 'getPriorityFeeEstimate',
      params: [params],
    });
    return data;
  }

  /**
   * Estimate the compute units for a transaction
   * @param transactions - The transactions to estimate the compute units in base64
   */
  async estimateComputeUnits(
    instructions: TransactionInstruction[],
    payerPublickey: PublicKey,
    lookupTable: AddressLookupTableAccount[] = []
  ): Promise<number | null> {
    // Remove ComputeBudgetProgram instructions
    const filteredInstructions = instructions.filter(
      (instruction) =>
        instruction.programId.toBase58() !==
        ComputeBudgetProgram.programId.toBase58()
    );
    return getSimulationComputeUnits(
      this.rpcProvider,
      filteredInstructions,
      payerPublickey,
      lookupTable
    );
  }
}
