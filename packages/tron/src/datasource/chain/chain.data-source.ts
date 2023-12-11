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
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import TronWeb from 'tronweb';
import axios from 'axios';
import BigNumber from 'bignumber.js';

import { ChainMsg } from '../../msg';
import type { TronManifest } from '../../manifests';

@Injectable()
export class ChainDataSource extends DataSource {
  declare rpcProvider: any;
  declare manifest: TronManifest;
  constructor(manifest: TronManifest) {
    super(manifest);
    this.rpcProvider = new TronWeb({
      fullHost: manifest.rpcURL,
    });
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const nativeBalance = await this.rpcProvider.trx.getBalance(address);

    const coins: Coin[] = [];

    coins.push(
      new Coin(
        new Asset({
          id: this.manifest.name,
          name: this.manifest.name,
          chainId: this.manifest.chainId,
          symbol: this.manifest.chainSymbol,
          native: true,
        }),
        this.rpcProvider.fromSun(nativeBalance)
      )
    );

    const response = await axios.get(
      `${this.manifest.dataProviderURL}/v1/accounts/${address}`
    );

    // throw new Error(JSON.stringify(response.data));

    const tokenBalances: Record<string, string>[] = response.data.data[0].trc20
      ? response.data.data[0].trc20
      : [];

    for (let index = 0; index < tokenBalances.length; index++) {
      const token: Record<string, string> = tokenBalances[index];

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
      const contractAddress = Object.keys(token)[0];
      const contract = await this.rpcProvider.contract(abi, contractAddress);
      const balance: BigNumber = await contract.balanceOf(address).call();
      const decimals: BigNumber = await contract.decimals().call();
      const symbol: string = await contract.symbol().call();
      coins.push(
        new Coin(
          new Asset({
            id: contractAddress,
            name: contractAddress,
            chainId: this.manifest.chainId,
            symbol: symbol,
            native: false,
          }),
          balance.div(BigNumber(10).pow(decimals).toString())
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

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;
    const response = await axios.get(
      `${this.manifest.dataProviderURL}/v1/accounts/${address}/transactions`
    );

    return response.data.data.map((transaction: any) =>
      Transaction.fromData(transaction)
    );
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
}
