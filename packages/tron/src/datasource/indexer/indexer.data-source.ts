import {
  Asset,
  DataSource,
  Coin,
  GasFeeSpeed,
  Transaction,
  Injectable,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeData,
  DefaultFeeOptions,
  TransactionData,
  TransactionAction,
  TransactionStatus,
} from '@xdefi-tech/chains-core';
import { AbiCoder } from 'ethers';
import { Observable } from 'rxjs';
import TronWeb from 'tronweb';
import axios, { AxiosInstance } from 'axios';
import BigNumber from 'bignumber.js';

import { CryptoAsset } from '../../gql/graphql';
import type { TronManifest } from '../../manifests';
import { TronEnergyEstimate } from '../../msg';

import { getBalance, getTransactions } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare manifest: TronManifest;
  declare rpcProvider: TronWeb;
  declare httpProvider: AxiosInstance;

  constructor(manifest: TronManifest) {
    super(manifest);

    this.httpProvider = axios.create({ baseURL: manifest.dataProviderURL });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const balances = await getBalance(address);

    return balances.reduce(
      (result: Coin[], balance: { asset: any; amount: any }) => {
        const { asset, amount } = balance;
        if (asset.id && asset.symbol && asset.name) {
          result.push(
            new Coin(
              new Asset({
                id: asset.id,
                chainId: this.manifest.chainId,
                name: asset.name,
                symbol: asset.symbol,
                icon: asset.image,
                native: asset.contract === null || asset.contract === undefined,
                address: asset.contract,
                price: asset.price?.amount,
                decimals: asset.decimals || 0,
                priceChange: {
                  dayPriceChange: asset.price?.dayPriceChange,
                },
                type: asset.type,
                categories: asset.categories,
              }),
              new BigNumber(amount.value)
                .dividedBy(10 ** (asset.decimals || 0))
                .toString()
            )
          );
        }
        return result;
      },
      [] as Coin[]
    );
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(
    filter: TransactionsFilter
  ): Promise<Transaction<TransactionData>[]> {
    const { address } = filter;
    const transactions = await getTransactions(address, null);

    return transactions.map((transaction) => {
      const asset = transaction.transfers[0].asset as CryptoAsset;

      return Transaction.fromData({
        hash: transaction.hash,
        from: transaction.fromAddress,
        to: transaction.toAddress,
        status: TransactionStatus[transaction.status as 'success' | 'failure'],
        date: transaction.timestamp,
        amount:
          transaction.transfers.length > 0 &&
          transaction.transfers[0].amount.value
            ? transaction.transfers[0].amount.value
            : '0',
        contractAddress:
          (transaction.transfers[0]?.asset as CryptoAsset).contract ??
          undefined,
        action:
          transaction.fromAddress === address
            ? TransactionAction.SEND
            : transaction.toAddress === address
            ? TransactionAction.RECEIVE
            : undefined,
        rawTransaction: transaction,
        asset: new Asset({
          id: asset.id || '',
          chainId: this.manifest.chainId,
          name: asset.name || '',
          symbol: asset.symbol || '',
          icon: asset.image,
          native: asset.contract === null || asset.contract === undefined,
          address: asset.contract,
          price: asset.price?.amount,
          decimals: asset.decimals || 0,
        }),
      });
    });
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(_msgs: [], _speed: GasFeeSpeed): Promise<FeeData[]> {
    return [];
  }

  // https://developers.tron.network/v3.7/docs/parameter-and-return-value-encoding-and-decoding-1#parameter-decoding
  async decodeParams(
    types: string[],
    output: string,
    ignoreMethodHash: boolean
  ) {
    const ADDRESS_PREFIX = '41';
    if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
      output = '0x' + output.replace(/^0x/, '').substring(8);

    const abiCoder = new AbiCoder();

    if (output.replace(/^0x/, '').length % 64)
      throw new Error(
        'The encoded string is not valid. Its length must be a multiple of 64.'
      );
    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
      if (types[index] == 'address')
        arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
      obj.push(arg);
      return obj;
    }, []);
  }

  async estimateEnergy(
    sender: string,
    contractAddress: string,
    selector: string,
    params: string
  ): Promise<TronEnergyEstimate> {
    const response = await this.httpProvider.post(
      '/wallet/triggerconstantcontract',
      JSON.stringify({
        owner_address: sender,
        contract_address: contractAddress,
        function_selector: selector,
        parameter: params,
        visible: true,
      }),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 && response.data.energy_used) {
      return {
        energy: parseInt(response.data.energy_used),
        willRevert:
          response.data.transaction.ret[0].ret === 'FAILED' ? true : false,
      };
    } else {
      throw new Error('Error Estimating Energy!');
    }
  }

  async gasFeeOptions(): Promise<DefaultFeeOptions | null> {
    throw new Error('TRON does not use variable gas fees');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async getAccountResource(address: string) {
    try {
      const response = await this.httpProvider.post(
        `/wallet/getaccountresource`,
        JSON.stringify({ address, visible: true }),
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      const {
        freeNetLimit,
        freeNetUsed = 0,
        NetUsed = 0,
        NetLimit = 0,
        EnergyUsed = 0,
        EnergyLimit = 0,
      } = response.data;

      return {
        freeBandwidth: NetLimit + freeNetLimit - NetUsed - freeNetUsed,
        freeEnergy: EnergyLimit - EnergyUsed,
      };
    } catch (error) {
      throw new Error('Error getting account resource!');
    }
  }
}
