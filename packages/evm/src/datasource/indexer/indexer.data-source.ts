import {
  Asset,
  DataSource,
  Coin,
  FeeOptions,
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
import { utils, providers } from 'ethers';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import axios, { Axios } from 'axios';

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

import { subscribeBalances, subscribeTransactions } from './subscriptions';
import {
  getBalance,
  getFees,
  getStatus,
  getTransactions,
  getNFTBalance,
} from './queries';

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
    if (!tokenAddresses) {
      return [];
    }
    const { address } = filter;
    const balances = await getEvmBalance(
      this.manifest.rpcURL,
      '0xcA11bde05977b3631167028862bE2a173976CA11', // tmp hardcode, TODO: get from manifest
      address,
      this.manifest.chainSymbol,
      tokenAddresses
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
        }),
        utils.formatUnits(amount.value, asset.decimals)
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
    const { afterBlock, address } = filter;
    let blockRange = null;

    if (typeof afterBlock === 'number' || typeof afterBlock === 'string') {
      const status = await getStatus(this.manifest.chain);
      blockRange = {
        from: parseInt(String(afterBlock)),
        to: status.lastBlock,
      };
    }

    const transactions = await getTransactions(
      this.manifest.chain as EVMChains,
      address,
      blockRange
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

  private async _estimateGasLimit(
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
    speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    const fee = await this.gasFeeOptions();
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
          gasLimit = calculatedGasLimit;
        } else {
          gasLimit = DEFAULT_CONTRACT_FEE;
        }
      } else {
        const { contractData } = await msg.getDataFromContract();
        const calculatedGasLimit = await this._estimateGasLimit({
          from: msgData.from,
          to: msgData.to,
          value: contractData.value as string,
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
          }
        : {
            gasLimit,
            gasPrice: fee[speed],
            maxFeePerGas: undefined,
            maxPriorityFeePerGas: undefined,
          };
      feeData.push(msgFeeData as FeeData);
    }

    return feeData;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
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
        priorityFeePerGas: parseGwei(fee.high.priorityFeePerGas).toNumber(),
        maxFeePerGas: parseGwei(fee.high.maxFeePerGas).toNumber(),
        baseFeePerGas: parseGwei(fee.high.baseFeePerGas).toNumber(),
      } as EIP1559Fee;
      result[GasFeeSpeed.medium] = {
        priorityFeePerGas: parseGwei(fee.medium.priorityFeePerGas).toNumber(),
        maxFeePerGas: parseGwei(fee.medium.maxFeePerGas).toNumber(),
        baseFeePerGas: parseGwei(fee.medium.baseFeePerGas).toNumber(),
      } as EIP1559Fee;
      result[GasFeeSpeed.low] = {
        priorityFeePerGas: parseGwei(fee.low.priorityFeePerGas).toNumber(),
        maxFeePerGas: parseGwei(fee.low.maxFeePerGas).toNumber(),
        baseFeePerGas: parseGwei(fee.low.baseFeePerGas).toNumber(),
      } as EIP1559Fee;
    }

    return result;
  }

  async getNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}
