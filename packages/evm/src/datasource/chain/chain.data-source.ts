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
  getCryptoAssets,
  FeeParams,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import * as ethers from 'ethers';
import { providers } from 'ethers';
import { capitalize, filter as lodashFilter, uniqBy } from 'lodash';
import { formatFixed } from '@ethersproject/bignumber';
import axios, { Axios } from 'axios';

import { AddressChain } from '../../gql/graphql';
import { EVM_MANIFESTS, EVMChains } from '../../manifests';
import { ChainMsg } from '../../msg';
import { DEFAULT_TRANSACTION_FEE, FACTOR_ESTIMATE } from '../../constants';
import { getGasLimitFromRPC } from '../../utils';

@Injectable()
export class ChainDataSource extends DataSource {
  declare rpcProvider: providers.StaticJsonRpcProvider;
  etherscanProvider: providers.EtherscanProvider;
  public rest: Axios;

  constructor(manifest: Chain.Manifest) {
    super(manifest);
    this.rpcProvider = new providers.StaticJsonRpcProvider(
      this.manifest.rpcURL
    );
    this.etherscanProvider = new providers.EtherscanProvider();
    this.rest = axios.create({ baseURL: this.manifest.rpcURL });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
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
    let chain = capitalize(this.manifest.chain) as AddressChain;
    if (this.manifest.chain === EVMChains.cantoevm) {
      chain = 'CantoEVM' as AddressChain;
    }
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

    // Get ETH data in case L2 is adding ETH as a token
    const {
      data: {
        assets: { cryptoAssets: ethAssets },
      },
    } = await getCryptoAssets({
      chain: AddressChain.Ethereum,
      contract: null,
    });

    const result: Coin[] = [];
    let nativeAsset = null;
    if (
      this.manifest.chainSymbol === EVM_MANIFESTS.ethereum.chainSymbol &&
      !Object.values(EVM_MANIFESTS)
        .map((manifest) => manifest.chainId)
        .includes(this.manifest.chainId) &&
      !!ethAssets?.[0]?.symbol
    ) {
      nativeAsset = ethAssets[0];
    } else if (assets && assets[0] && assets[0].id) {
      nativeAsset = assets[0]; // first is native token
    }

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
        gasLimit = await getGasLimitFromRPC(msg, this.rest);
      } else if (msgData.contractAddress) {
        gasLimit = await getGasLimitFromRPC(msg, this.rest);
        gasLimit = Math.ceil(gasLimit * FACTOR_ESTIMATE);
      } else {
        const calculatedGasLimit = await getGasLimitFromRPC(msg, this.rest);
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
      if (msg.provider.manifest.chainId === EVM_MANIFESTS.avalanche.chainId)
        gasLimit = Math.ceil(gasLimit * 1.2);
      if (msg.provider.manifest.chainId === EVM_MANIFESTS.smartchain.chainId)
        gasLimit = Math.ceil(gasLimit * 1.3);
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

  async gasFeeOptions(_options?: FeeParams): Promise<FeeOptions> {
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
        priorityFeePerGas:
          new BigNumber(formatFixed(fee.maxPriorityFeePerGas))
            .multipliedBy(this.manifest.feeGasStep.high)
            .integerValue(BigNumber.ROUND_CEIL)
            .toNumber() || 1,
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
        priorityFeePerGas:
          new BigNumber(formatFixed(fee.maxPriorityFeePerGas))
            .multipliedBy(this.manifest.feeGasStep.medium)
            .integerValue(BigNumber.ROUND_CEIL)
            .toNumber() || 1,
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
        priorityFeePerGas:
          new BigNumber(formatFixed(fee.maxPriorityFeePerGas))
            .multipliedBy(this.manifest.feeGasStep.low)
            .integerValue(BigNumber.ROUND_CEIL)
            .toNumber() || 1,
      },
    };
  }

  async getNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}
