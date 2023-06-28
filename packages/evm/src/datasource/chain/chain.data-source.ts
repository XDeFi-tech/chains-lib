import {
  Asset,
  Balance,
  BalanceFilter,
  Chain,
  Coin,
  DataSource,
  EIP1559Fee,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Injectable,
  Transaction,
  TransactionsFilter,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import * as ethers from 'ethers';
import { providers } from 'ethers';
import { capitalize, filter as lodashFilter, uniqBy } from 'lodash';
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
    const { address, afterBlock } = filter;
    const balance = await this.rpcProvider.getBalance(address);
    const logs = await this.rpcProvider.getLogs({
      address: undefined,
      fromBlock: afterBlock
        ? afterBlock
        : (await this.rpcProvider.getBlockNumber()) - 1000,
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
    msgs: ChainMsg[],
    speed: GasFeeSpeed = GasFeeSpeed.medium
  ): Promise<FeeData[]> {
    const fee = await this.gasFeeOptions();
    const transactionFee = 21000; // Paid for every transaction

    const feeData: FeeData[] = [];
    if (!fee) {
      return feeData;
    }
    for (const msg of msgs) {
      const msgData = msg.toData();
      let calculateData = msgData.data;
      if (msgData.contractAddress) {
        const { contractData } = await msg.getDataFromContract();
        calculateData = contractData.data;
      }
      const feeForData =
        calculateData && calculateData !== '0x'
          ? 68 * new TextEncoder().encode(calculateData.toString()).length
          : 0;
      const gasLimit = Math.ceil((transactionFee + feeForData) * 1.5); // 1.5 -> FACTOR_ESTIMATE
      const msgFeeData = {
        gasLimit,
        gasPrice: undefined,
        maxFeePerGas: (fee[speed] as EIP1559Fee).maxFeePerGas,
        maxPriorityFeePerGas: (fee[speed] as EIP1559Fee).priorityFeePerGas,
      };
      feeData.push(msgFeeData);
    }

    return feeData;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    const feeData = await this.rpcProvider.getFeeData();
    if (
      !feeData.gasPrice ||
      !feeData.maxFeePerGas ||
      !feeData.maxPriorityFeePerGas
    ) {
      return null;
    }

    const fee = {
      gasPrice: ethers.utils.formatUnits(feeData.gasPrice, 'gwei'),
      maxFeePerGas: ethers.utils.formatUnits(feeData.maxFeePerGas, 'gwei'),
      maxPriorityFeePerGas: ethers.utils.formatUnits(
        feeData.maxPriorityFeePerGas,
        'gwei'
      ),
    };

    return {
      [GasFeeSpeed.high]: {
        baseFeePerGas: new BigNumber(fee.gasPrice)
          .multipliedBy(this.manifest.feeGasStep.high)
          .toNumber(),
        maxFeePerGas: new BigNumber(fee.maxFeePerGas)
          .multipliedBy(this.manifest.feeGasStep.high)
          .toNumber(),
        priorityFeePerGas: new BigNumber(fee.maxPriorityFeePerGas)
          .multipliedBy(this.manifest.feeGasStep.high)
          .toNumber(),
      },
      [GasFeeSpeed.medium]: {
        baseFeePerGas: new BigNumber(fee.gasPrice)
          .multipliedBy(this.manifest.feeGasStep.medium)
          .toNumber(),
        maxFeePerGas: new BigNumber(fee.maxFeePerGas)
          .multipliedBy(this.manifest.feeGasStep.medium)
          .toNumber(),
        priorityFeePerGas: new BigNumber(fee.maxPriorityFeePerGas)
          .multipliedBy(this.manifest.feeGasStep.medium)
          .toNumber(),
      },
      [GasFeeSpeed.low]: {
        baseFeePerGas: new BigNumber(fee.gasPrice)
          .multipliedBy(this.manifest.feeGasStep.low)
          .toNumber(),
        maxFeePerGas: new BigNumber(fee.maxFeePerGas)
          .multipliedBy(this.manifest.feeGasStep.low)
          .toNumber(),
        priorityFeePerGas: new BigNumber(fee.maxPriorityFeePerGas)
          .multipliedBy(this.manifest.feeGasStep.low)
          .toNumber(),
      },
    };
  }

  async getNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}
