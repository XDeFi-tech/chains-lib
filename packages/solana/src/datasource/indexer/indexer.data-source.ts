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
  TransactionsFilter,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  Transaction as SolanaTransaction,
  AddressLookupTableAccount,
  VersionedTransaction,
  TransactionMessage,
  ComputeBudgetProgram,
} from '@solana/web3.js';
import axios from 'axios';
import { getSimulationComputeUnits } from '@solana-developers/helpers';

import { ChainMsg } from '../../msg';
import {
  PriorityFeeEstimateResponse,
  PriorityFeeLevelParamsMapping,
  PriorityFeeEstimateParams,
} from '../../types';
import { decodePriorityFeeInstruction } from '../../utils';

import { getBalance, getNFTBalance, getTransactions } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare rpcProvider: Connection;

  constructor(manifest: Chain.Manifest) {
    super(manifest);
    this.rpcProvider = new Connection(this.manifest.rpcURL);
  }

  async getNFTBalance(address: string) {
    return getNFTBalance(address);
  }

  async getBalance(_filter: BalanceFilter): Promise<Coin[]> {
    const { address } = _filter;
    const { data } = await getBalance(address);
    // cut off balances without asset
    const balances = data.solana.balances.filter(
      (b: any) => b.asset.symbol && b.asset.id
    );

    return balances.map((balance: any): Coin => {
      const { asset, amount } = balance;

      return new Coin(
        new Asset({
          id: asset.id,
          chainId: this.manifest.chainId,
          name: asset.name,
          symbol: asset.symbol,
          icon: asset.image,
          native: !Boolean(asset.contract),
          address: asset.contract,
          price: asset.price?.amount,
          decimals: asset.decimals,
          priceChange: {
            dayPriceChange: asset.price?.dayPriceChange,
          },
          type: asset.type,
          categories: asset.categories,
        }),
        new BigNumber(amount.value)
          .integerValue()
          .dividedBy(Math.pow(10, asset.decimals))
      );
    });
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;
    const transactions = await getTransactions(address);

    return transactions.map((transaction) => {
      return Transaction.fromData(transaction);
    });
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
          const luts = await Promise.all(
            transaction.message.addressTableLookups.map((acc) =>
              this.rpcProvider.getAddressLookupTable(acc.accountKey)
            )
          );
          const addressLookupTableAccounts = luts
            .map((lut) => lut.value)
            .filter((val) => val !== null) as AddressLookupTableAccount[];
          const messageV0 = TransactionMessage.decompile(transaction.message, {
            addressLookupTableAccounts,
          });
          const computeBudgetInstructions = [];
          for (const instruction of messageV0.instructions) {
            if (
              instruction.programId.toBase58() ===
              ComputeBudgetProgram.programId.toBase58()
            ) {
              computeBudgetInstructions.push(instruction.data);
            }
          }
          if (computeBudgetInstructions.length > 0) {
            const { computeUnitLimit, computeUnitPrice } =
              decodePriorityFeeInstruction(computeBudgetInstructions);
            result.gasLimit = computeUnitLimit ?? 200_000;
            result.gasPrice = computeUnitPrice ?? undefined;
          } else {
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
