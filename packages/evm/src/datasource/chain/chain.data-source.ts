import {
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
  Asset,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import * as ethers from 'ethers';
import { providers } from 'ethers';
import { capitalize, uniqBy, filter as lodashFilter } from 'lodash';
import { AddressChain, getCryptoAssets } from '@xdefi-tech/chains-graphql';

import { EVMChains } from '../../manifests';
import { ChainMsg } from '../../msg';

@Injectable()
export class ChainDataSource extends DataSource {
  declare rpcProvider: providers.StaticJsonRpcProvider;
  etherscanProvider: providers.EtherscanProvider;

  constructor(manifest: Chain.Manifest) {
    super(manifest);
    this.rpcProvider = new providers.StaticJsonRpcProvider(
      this.manifest.rpcURL
    );
    this.etherscanProvider = new providers.EtherscanProvider();
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const balance = await this.rpcProvider.getBalance(address);
    const logs = await this.rpcProvider.getLogs({
      address: undefined,
      fromBlock: 0,
      toBlock: 'latest',
      topics: [
        ethers.utils.id('Transfer(address,address,uint256)'),
        null,
        ethers.utils.hexZeroPad(address, 32),
      ],
    });
    const chain = capitalize(this.manifest.chain) as AddressChain;
    const uniqAddresses = uniqBy(
      lodashFilter(logs, (log) => log.topics.length === 3),
      'address'
    ).map((log) => log.address);
    const cryptoAssetsInput = [null, ...uniqAddresses].map((address) => ({
      chain: chain,
      contract: address,
    }));

    let assets = null;
    if (
      Object.keys(EVMChains).some(
        (c) => c === this.manifest.chain.toLowerCase()
      )
    ) {
      const {
        data: {
          assets: { cryptoAssets: cryptoAssets },
        },
      } = await getCryptoAssets(cryptoAssetsInput);
      assets = cryptoAssets;
    }

    const result: Coin[] = [];
    const nativeAsset = assets && assets[0] && assets[0].id ? assets[0] : null; // first is native token
    const nativeToken = new Coin(
      new Asset({
        id: nativeAsset ? (nativeAsset.id as string) : this.manifest.name,
        chainId: this.manifest.chainId,
        name: nativeAsset ? (nativeAsset.name as string) : this.manifest.name,
        symbol: nativeAsset
          ? (nativeAsset.symbol as string)
          : this.manifest.chainSymbol,
        icon: nativeAsset ? nativeAsset.image : null,
        native: true,
        address: null,
        price:
          nativeAsset && nativeAsset.price
            ? nativeAsset.price.amount
            : undefined,
        decimals: nativeAsset
          ? (nativeAsset.decimals as number)
          : this.manifest.decimals,
      }),
      new BigNumber(balance.toString()).dividedBy(10 ** this.manifest.decimals)
    );

    result.push(nativeToken);

    for (let i = 0; i < uniqAddresses.length; i++) {
      const tokenAddress = uniqAddresses[i];
      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          'function balanceOf(address account) view returns (uint256)',
          'function decimals() view returns (uint8)',
          'function symbol() view returns (string)',
          'function name() view returns (string)',
        ],
        this.rpcProvider
      );
      const asset =
        assets && assets[i + 1] && assets[i + 1].id ? assets[i + 1] : null;
      const tokenName = asset ? asset.name : await tokenContract.name();
      const tokenSymbol = asset ? asset.symbol : await tokenContract.symbol();
      const tokenDecimals = asset
        ? asset.decimals
        : await tokenContract.decimals();
      const tokenBalance = await tokenContract.balanceOf(address);

      const coin = new Coin(
        new Asset({
          chainId: this.manifest.chainId,
          name: tokenName,
          symbol: tokenSymbol,
          address: tokenAddress,
          decimals: tokenDecimals,
          native: false,
          icon: (asset && asset.image) || null,
          id: asset ? (asset?.id as string) : '',
          price:
            asset && asset.price ? (asset.price.amount as string) : undefined,
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
    const { address, afterBlock } = filter;
    const history = await this.etherscanProvider.getHistory(
      address,
      afterBlock
    );
    return history.map((transaction: any) => Transaction.fromData(transaction));
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(
    _msgs: ChainMsg[],
    _speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    throw new Error('Method not implemented.');
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    throw new Error('Method not implemented.');
  }

  async getNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}
