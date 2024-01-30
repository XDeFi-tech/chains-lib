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
  TransactionStatus,
  TransactionAction,
} from '@xdefi-tech/chains-core';
import { AbiCoder, formatUnits } from 'ethers';
import { Observable } from 'rxjs';
import axios from 'axios';

import type { TronManifest } from '../../manifests';
import { TronEnergyEstimate } from '../../msg';

import { getBalance, getTransactions } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare manifest: TronManifest;

  constructor(manifest: TronManifest) {
    super(manifest);
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const balances = await getBalance(address);

    return balances.reduce((result, balance) => {
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
            }),
            formatUnits(amount.value, asset.decimals || 0)
          )
        );
      }
      return result;
    }, [] as Coin[]);
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactionsForAddress(
    filter: TransactionsFilter
  ): Promise<TransactionData[]> {
    const { address } = filter;
    const transactions = await getTransactions(address, null);

    const mappedTransactions: TransactionData[] = transactions.map(
      (transaction) => {
        const fromAddress =
          transaction.transfers.length > 0 &&
          transaction.fromAddress != transaction.transfers[0].fromAddress
            ? transaction.transfers[0].fromAddress
            : transaction.fromAddress;

        const toAddress =
          transaction.transfers.length > 0
            ? transaction.transfers[0].toAddress
            : '';

        return {
          hash: transaction.hash,
          from: fromAddress,
          to: toAddress,

          status: transaction.status,
          date: transaction.timestamp,
          amount:
            transaction.transfers.length > 0
              ? transaction.transfers[0].amount.value
              : 0,
          contractAddress:
            transaction.transfers.length > 0
              ? transaction.transfers[0].asset.contract
              : undefined,
          action:
            fromAddress === address
              ? TransactionAction.SEND
              : toAddress === address
              ? TransactionAction.RECEIVE
              : undefined,
        };
      }
    );

    return mappedTransactions;
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;
    const transactions = await getTransactions(address, null);

    return transactions.map((transaction) => Transaction.fromData(transaction));
  }

  async getTransaction(txHash: string): Promise<TransactionData> {
    const tx = await this.rpcProvider.trx.getTransaction(txHash);
    if (!tx) {
      throw new Error(`Transaction ${txHash} not found!`);
    }

    const result: TransactionData = {
      hash: tx.txID,
      from: '',
      to: '',
      status: tx.blockNumber
        ? TransactionStatus.success
        : TransactionStatus.pending,
      date: tx.blockTimeStamp,
      amount: '',
    };

    if (
      tx.raw_data.contract.length > 0 &&
      tx.raw_data.contract[0].type === 'TransferContract'
    ) {
      const transferData = tx.raw_data.contract[0].parameter.value;

      result.to = this.rpcProvider.address.fromHex(transferData.to_address);
      result.from = this.rpcProvider.address.fromHex(
        transferData.owner_address
      );
      result.amount = transferData.amount.toString();
    } else if (
      tx.raw_data.contract.length > 0 &&
      tx.raw_data.contract[0].type === 'TriggerSmartContract'
    ) {
      const params = await this.decodeParams(
        ['address', 'uint256'],
        tx.raw_data.contract[0].parameter.value.data,
        true
      );

      result.to = this.rpcProvider.address.fromHex(params[0]);
      result.amount = params[1].toString();
      result.from = this.rpcProvider.address.fromHex(
        tx.raw_data.contract[0].parameter.value.owner_address
      );
      result.contractAddress = this.rpcProvider.address.fromHex(
        tx.raw_data.contract[0].parameter.value.contract_address
      );
    }

    return result;
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
    const response = await axios.post(
      'https://api.trongrid.io/wallet/triggerconstantcontract',
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
}
