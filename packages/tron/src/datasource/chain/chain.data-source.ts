import {
  DataSource,
  Coin,
  FeeOptions,
  GasFeeSpeed,
  Transaction,
  Injectable,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeData,
  Asset,
  TransactionData,
  TransactionStatus,
  TransactionAction,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import TronWeb from 'tronweb';
import axios, { AxiosInstance } from 'axios';
import BigNumber from 'bignumber.js';
import { AbiCoder } from 'ethers';

import { ChainMsg } from '../../msg';
import type { TronManifest } from '../../manifests';

@Injectable()
export class ChainDataSource extends DataSource {
  declare rpcProvider: any;
  declare manifest: TronManifest;
  declare httpProvider: AxiosInstance;

  constructor(manifest: TronManifest) {
    super(manifest);
    this.rpcProvider = new TronWeb({
      fullHost: manifest.rpcURL,
    });

    this.httpProvider = axios.create({ baseURL: manifest.dataProviderURL });
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const nativeBalance = await this.rpcProvider.trx.getBalance(address);

    const coins: Coin[] = [];

    coins.push(
      new Coin(
        new Asset({
          id: this.manifest.chain,
          name: this.manifest.name,
          chainId: this.manifest.chainId,
          symbol: this.manifest.chainSymbol,
          native: true,
        }),
        this.rpcProvider.fromSun(nativeBalance)
      )
    );

    const response = await this.httpProvider.get(`/v1/accounts/${address}`);

    const tokenBalances: Record<string, string>[] = response.data.data[0]?.trc20
      ? response.data.data[0]?.trc20
      : [];

    const abi = [
      {
        outputs: [{ type: 'uint256' }],
        constant: true,
        inputs: [{ name: 'who', type: 'address' }],
        name: 'balanceOf',
        stateMutability: 'View',
        type: 'Function',
      },
      {
        outputs: [{ type: 'bool' }],
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        stateMutability: 'Nonpayable',
        type: 'Function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    this.rpcProvider.setAddress(address);

    for (let index = 0; index < tokenBalances.length; index++) {
      const token: Record<string, string> = tokenBalances[index];

      const contractAddress = Object.keys(token)[0];
      const contract = await this.rpcProvider.contract(abi, contractAddress);
      const balance: BigNumber = await contract.balanceOf(address).call();
      const decimals: BigNumber = await contract.decimals().call();
      const symbol: string = await contract.symbol().call();

      coins.push(
        new Coin(
          new Asset({
            id: `${this.manifest.chain}+${contractAddress}`,
            name: contractAddress,
            chainId: this.manifest.chainId,
            symbol: symbol,
            native: false,
          }),
          balance.div(new BigNumber(10).pow(decimals).toString()).toString()
        )
      );
    }

    return coins;
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getNFTBalance(_address: string) {
    throw new Error('Method not implemented.');
  }

  async getTransactions(
    filter: TransactionsFilter
  ): Promise<Transaction<TransactionData>[]> {
    const { address } = filter;
    const { data } = await this.httpProvider.get(
      `/v1/accounts/${address}/transactions`
    );

    const transactions: Transaction<TransactionData>[] = [];

    if (data && data.data) {
      for (let i = 0; i < data.data.length; i++) {
        const tx = await this.getTransaction(data.data[i].txID);
        if (tx) {
          if (tx.from === address) {
            tx.action = TransactionAction.SEND;
          } else if (tx.to === address) {
            tx.action = TransactionAction.RECEIVE;
          }
          transactions.push(Transaction.fromData(tx));
        }
      }
    }

    return transactions;
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
      status: TransactionStatus.pending,
      date: tx.raw_data.timestamp,
      amount: '',
    };

    const txStatus = tx.ret && tx.ret[0];

    if (txStatus.contractRet === 'SUCCESS') {
      result.status = TransactionStatus.success;
    } else if (txStatus.contractRet === 'REVERT') {
      result.status = TransactionStatus.failure;
    }

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

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(
    _msgs: ChainMsg[],
    _speed: GasFeeSpeed
  ): Promise<FeeData[]> {
    return [];
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    throw new Error('Method not implemented.');
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
