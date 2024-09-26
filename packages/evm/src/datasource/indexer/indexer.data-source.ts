import {
  Asset,
  DataSource,
  Coin,
  FeeOptions,
  FeeParams,
  GasFeeSpeed,
  Transaction,
  Injectable,
  Chain,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeData,
  EIP1559Fee,
  EIP1559FeeOptions,
  DefaultFeeOptions,
} from '@xdefi-tech/chains-core';
import { ethers, providers } from 'ethers';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import axios, { Axios } from 'axios';
import BigNumber from 'bignumber.js';
import { formatFixed } from '@ethersproject/bignumber';

import { parseGwei } from '../../utils';
import { EVMChains } from '../../manifests';
import { ChainMsg, TokenType } from '../../msg';
import {
  DEFAULT_CONTRACT_FEE,
  DEFAULT_TRANSACTION_FEE,
  ERC1155_SAFE_TRANSFER_METHOD,
  ERC721_SAFE_TRANSFER_METHOD,
  FACTOR_ESTIMATE,
} from '../../constants';
import { RestEstimateGasRequest } from '../../types';
import { getEvmBalance } from '../multicall/evm.multicall';
import { getBalanceByBatch } from '../batch-rpc/evm.batch-call';

import { subscribeBalances, subscribeTransactions } from './subscriptions';
import { getFees, getTransactions, getNFTBalance, getBalance } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare rpcProvider: providers.StaticJsonRpcProvider;
  public rest: Axios;

  constructor(manifest: Chain.Manifest) {
    super(manifest);
    this.rpcProvider = new providers.StaticJsonRpcProvider(
      this.manifest.rpcURL
    );
    this.rest = axios.create({ baseURL: this.manifest.rpcURL });
  }

  async getNFTBalance(address: string) {
    return getNFTBalance(this.manifest.chain, address);
  }

  async getBalance(
    filter: BalanceFilter,
    tokenAddresses?: string[]
  ): Promise<Coin[]> {
    const { address } = filter;
    let balances;
    if (!tokenAddresses) {
      balances = await getBalance(this.manifest.chain as EVMChains, address);
    } else {
      // Remove duplicate addresses
      const uniqueAddresses = Array.from(new Set(tokenAddresses));

      // Multicall contracts only call deployed contracts, so they can't query native token balances.
      const isFetchNativeTokenBalance = uniqueAddresses.some(
        (address) => address === ethers.constants.AddressZero
      );
      const nativeTokenInfo = {
        name: this.manifest.name,
        contract: null,
        decimals: this.manifest.decimals,
        symbol: this.manifest.chainSymbol,
      };
      if (
        this.manifest.multicallContractAddress &&
        !isFetchNativeTokenBalance
      ) {
        balances = await getEvmBalance(
          this.manifest.rpcURL,
          this.manifest.name,
          address,
          uniqueAddresses
        );
      } else {
        balances = await getBalanceByBatch(
          this.manifest.rpcURL,
          address,
          uniqueAddresses,
          nativeTokenInfo
        );
      }
    }

    if (!balances) {
      return [];
    }
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
        }),
        new BigNumber(amount.value)
          .integerValue()
          .dividedBy(Math.pow(10, asset.decimals))
      );
    });
  }

  async subscribeBalance(
    filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    const { address } = filter;
    return from(
      subscribeBalances(this.manifest.chain as EVMChains, address)
    ).pipe(
      map((result: any) => {
        return result?.data?.ethereumBalances; // create coin
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;

    const transactions = await getTransactions(
      this.manifest.chain as EVMChains,
      address
    );

    return transactions.map((transaction: any) => {
      return Transaction.fromData(transaction);
    });
  }

  async subscribeTransactions(
    filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    const { address } = filter;
    return from(
      subscribeTransactions(this.manifest.chain as EVMChains, address)
    ).pipe(
      map((result: any): Transaction => {
        const txData = result?.data.ethereumTransactions;
        return Transaction.fromData({
          from: txData.fromAddress,
          to: txData.toAddress,
          hash: txData.hash,
          status: txData.status,
        });
      }),
      catchError((error: any) => {
        throw new Error(error);
      })
    );
  }

  async _estimateGasLimit(
    txParams: RestEstimateGasRequest
  ): Promise<number | null> {
    try {
      const { data: response } = await this.rest.post('/', {
        method: 'eth_estimateGas',
        params: [txParams],
        id: 'dontcare',
        jsonrpc: '2.0',
      });
      if (!response.result) {
        return null;
      }
      return parseInt(response.result);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async estimateFee(
    msgs: ChainMsg[],
    speed: GasFeeSpeed = GasFeeSpeed.medium,
    options: FeeParams = { useFeeService: true }
  ): Promise<FeeData[]> {
    const fee = await this.gasFeeOptions(options);
    if (!fee) {
      throw new Error(`Cannot estimate fee for chain ${this.manifest.chain}`);
    }
    const isEIP1559 = typeof fee[speed] !== 'number';

    // gasLimit = 21000 + 68 * dataByteLength
    // https://ethereum.stackexchange.com/questions/39401/how-do-you-calculate-gas-limit-for-transaction-with-data-in-ethereum

    const feeData: FeeData[] = [];
    for (const msg of msgs) {
      const msgData = msg.toData();
      let gasLimit: number;

      if (msgData.contractAddress && msgData.nftId) {
        const { contract } = await msg.getDataFromContract();
        if (!contract) {
          throw new Error(
            `Invalid contract for address ${msgData.contractAddress}`
          );
        }
        switch (msgData.tokenType) {
          case TokenType.ERC721:
            const gasLimit721 = await contract.estimateGas[
              ERC721_SAFE_TRANSFER_METHOD
            ](msgData.from, msgData.to, msgData.nftId);
            gasLimit =
              gasLimit721.toNumber() < DEFAULT_CONTRACT_FEE
                ? DEFAULT_CONTRACT_FEE
                : gasLimit721.toNumber();
            break;
          case TokenType.ERC1155:
            const gasLimit1155 = await contract.estimateGas[
              ERC1155_SAFE_TRANSFER_METHOD
            ](msgData.from, msgData.to, msgData.nftId, 1, [], {
              from: msgData.from,
            });
            gasLimit =
              gasLimit1155.toNumber() < DEFAULT_CONTRACT_FEE
                ? DEFAULT_CONTRACT_FEE
                : gasLimit1155.toNumber();
            break;
          default:
            throw new Error(
              'Please select correct tokenType field for NFT from TokenType enum'
            );
        }
      } else if (msgData.contractAddress) {
        // ERC transaction
        const { contract, contractData } = await msg.getDataFromContract();
        if (!contract) {
          throw new Error(
            `Invalid contract for address ${msgData.contractAddress}`
          );
        }
        const calculatedGasLimit = await this._estimateGasLimit({
          from: msgData.from,
          to: contractData.to as string,
          value: contractData.value as string,
          data: contractData.data as string,
        });
        if (calculatedGasLimit) {
          gasLimit = Math.ceil(calculatedGasLimit * FACTOR_ESTIMATE);
        } else {
          gasLimit = DEFAULT_CONTRACT_FEE;
        }
      } else {
        // common transaction
        const calculatedGasLimit = await this._estimateGasLimit({
          from: msgData.from,
          to: msgData.to,
          ...(msgData.data && { data: msgData.data }),
        });
        if (calculatedGasLimit) {
          gasLimit = Math.ceil(calculatedGasLimit * FACTOR_ESTIMATE);
        } else {
          const calculateData = msgData.data;
          const feeForData =
            calculateData && calculateData !== '0x'
              ? 68 * new TextEncoder().encode(calculateData.toString()).length
              : 0;
          gasLimit = Math.ceil(
            (DEFAULT_TRANSACTION_FEE + feeForData) * FACTOR_ESTIMATE
          );
        }
      }
      const msgFeeData = isEIP1559
        ? {
            gasLimit,
            gasPrice: undefined,
            maxFeePerGas: (fee[speed] as EIP1559Fee).maxFeePerGas,
            maxPriorityFeePerGas: (fee[speed] as EIP1559Fee).priorityFeePerGas,
            baseFeePerGas: (fee[speed] as EIP1559Fee).baseFeePerGas,
          }
        : {
            gasLimit,
            gasPrice: fee[speed],
            maxFeePerGas: undefined,
            maxPriorityFeePerGas: undefined,
            baseFeePerGas: undefined,
          };
      feeData.push(msgFeeData as FeeData);
    }

    return feeData;
  }

  async gasFeeOptions(options?: FeeParams): Promise<FeeOptions | null> {
    if (options?.useFeeService) {
      return this._getFeeOptionsByFeeService();
    }
    return this._getFeeOptionsFromRpc();
  }

  private async _getFeeOptionsByFeeService(): Promise<FeeOptions | null> {
    const fee = await getFees(this.manifest.chain); // fee in gwei
    let result: FeeOptions | null = null;

    if (typeof fee.high === 'number') {
      result = {} as DefaultFeeOptions;
      result[GasFeeSpeed.high] = parseGwei(fee.high).toNumber();
      result[GasFeeSpeed.medium] = parseGwei(fee.medium).toNumber();
      result[GasFeeSpeed.low] = parseGwei(fee.low).toNumber();
    } else if (typeof fee.high === 'object') {
      result = {} as EIP1559FeeOptions;
      result[GasFeeSpeed.high] = {
        priorityFeePerGas:
          parseGwei(fee.high.priorityFeePerGas).toNumber() || 1,
        maxFeePerGas: parseGwei(fee.high.maxFeePerGas).toNumber(),
        baseFeePerGas: parseGwei(fee.high.baseFeePerGas).toNumber(),
      } as EIP1559Fee;
      result[GasFeeSpeed.medium] = {
        priorityFeePerGas:
          parseGwei(fee.medium.priorityFeePerGas).toNumber() || 1,
        maxFeePerGas: parseGwei(fee.medium.maxFeePerGas).toNumber(),
        baseFeePerGas: parseGwei(fee.medium.baseFeePerGas).toNumber(),
      } as EIP1559Fee;
      result[GasFeeSpeed.low] = {
        priorityFeePerGas: parseGwei(fee.low.priorityFeePerGas).toNumber() || 1,
        maxFeePerGas: parseGwei(fee.low.maxFeePerGas).toNumber(),
        baseFeePerGas: parseGwei(fee.low.baseFeePerGas).toNumber(),
      } as EIP1559Fee;
    }

    return result;
  }

  private async _getFeeOptionsFromRpc(): Promise<FeeOptions> {
    const fee = await this.rpcProvider.getFeeData();
    if (!fee.gasPrice || !fee.maxFeePerGas || !fee.maxPriorityFeePerGas) {
      const gasPrice = await this.rpcProvider.getGasPrice();
      return {
        [GasFeeSpeed.high]: new BigNumber(formatFixed(gasPrice))
          .multipliedBy(this.manifest.feeGasStep.high)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        [GasFeeSpeed.medium]: new BigNumber(formatFixed(gasPrice))
          .multipliedBy(this.manifest.feeGasStep.medium)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        [GasFeeSpeed.low]: new BigNumber(formatFixed(gasPrice))
          .multipliedBy(this.manifest.feeGasStep.low)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
      };
    }

    return {
      [GasFeeSpeed.high]: {
        baseFeePerGas: new BigNumber(
          formatFixed(fee?.lastBaseFeePerGas ?? fee.gasPrice)
        )
          .multipliedBy(this.manifest.feeGasStep.high)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        maxFeePerGas: new BigNumber(formatFixed(fee.maxFeePerGas))
          .multipliedBy(this.manifest.feeGasStep.high)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        priorityFeePerGas: new BigNumber(formatFixed(fee.maxPriorityFeePerGas))
          .multipliedBy(this.manifest.feeGasStep.high)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
      },
      [GasFeeSpeed.medium]: {
        baseFeePerGas: new BigNumber(
          formatFixed(fee?.lastBaseFeePerGas ?? fee.gasPrice)
        )
          .multipliedBy(this.manifest.feeGasStep.medium)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        maxFeePerGas: new BigNumber(formatFixed(fee.maxFeePerGas))
          .multipliedBy(this.manifest.feeGasStep.medium)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        priorityFeePerGas: new BigNumber(formatFixed(fee.maxPriorityFeePerGas))
          .multipliedBy(this.manifest.feeGasStep.medium)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
      },
      [GasFeeSpeed.low]: {
        baseFeePerGas: new BigNumber(
          formatFixed(fee?.lastBaseFeePerGas ?? fee.gasPrice)
        )
          .multipliedBy(this.manifest.feeGasStep.low)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        maxFeePerGas: new BigNumber(formatFixed(fee.maxFeePerGas))
          .multipliedBy(this.manifest.feeGasStep.low)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
        priorityFeePerGas: new BigNumber(formatFixed(fee.maxPriorityFeePerGas))
          .multipliedBy(this.manifest.feeGasStep.low)
          .integerValue(BigNumber.ROUND_CEIL)
          .toNumber(),
      },
    };
  }

  async getNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}
