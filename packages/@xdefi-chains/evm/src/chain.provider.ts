import {
  ChainDecorator,
  Chain,
  Coin,
  Msg,
  Transaction,
  BaseRepository,
  GasFeeSpeed,
  GasFee,
  Asset,
} from '@xdefi/chains-core';
import { providers, utils } from "ethers";
import "reflect-metadata";
import { ChainMsg } from "./msg";
import { getTransaction, getBalance, getStatus, getFees } from './queries';
import { some } from "lodash";
import { getCryptoCurrency } from './queries/get-crypto-currency';
import { KeystoreSigner } from './signers';

export enum EVMChains {
  ethereum = 'ethereum',
  binancesmartchain = 'binancesmartchain',
  polygon = 'polygon',
  avalanche = 'avalanche',
  fantom = 'fantom',
  arbitrum = 'arbitrum',
  aurora = 'aurora',
}

export const evmManifests: {[chain: string]: Chain.Manifest} = {
  [EVMChains.ethereum]: {
    name: 'Ethereum',
    description: '',
    rpcURL: 'https://eth-rpc.gateway.pokt.network',
    chainSymbol: 'ETH',
    blockExplorerURL: 'https://etherscan.io',
    chainId: '1',
    chain: 'ethereum',
  },
  [EVMChains.binancesmartchain]: {
    name: 'BNB Smart Chain',
    description: '',
    rpcURL: 'https://bsc-dataseed1.defibit.io',
    chainSymbol: 'BNB',
    blockExplorerURL: 'https://bscscan.com',
    chainId: '56',
    chain: 'binancesmartchain',
  },
  [EVMChains.polygon]: {
    name: 'Polygon',
    description: '',
    rpcURL: 'https://polygon-rpc.com',
    chainSymbol: 'MATIC',
    blockExplorerURL: 'https://polygonscan.com',
    chainId: '137',
    chain: 'polygon',
  },
  [EVMChains.avalanche]: {
    name: 'Avalanche',
    description: '',
    rpcURL: 'https://api.avax.network/ext/bc/C/rpc',
    chainSymbol: 'AVAX',
    blockExplorerURL: 'https://snowtrace.io',
    chainId: '43114',
    chain: 'avalanche',
  },
  [EVMChains.fantom]: {
    name: 'Fantom',
    description: '',
    rpcURL: 'https://api.avax.network/ext/bc/C/rpc',
    chainSymbol: 'FTM',
    blockExplorerURL: 'https://rpc.ftm.tools',
    chainId: '250',
    chain: 'fantom',
  },
  [EVMChains.arbitrum]: {
    name: 'Arbitrum',
    description: '',
    rpcURL: 'https://arb1.arbitrum.io/rpc',
    chainSymbol: 'ETH',
    blockExplorerURL: 'https://arbiscan.io',
    chainId: '42161',
    chain: 'arbitrum',
  },
  [EVMChains.aurora]: {
    name: 'Aurora',
    description: '',
    rpcURL: 'https://mainnet.aurora.dev',
    chainSymbol: 'ETH',
    blockExplorerURL: 'https://aurorascan.dev',
    chainId: '1313161554',
    chain: 'aurora',
  },
}

export class XdefiRepository extends BaseRepository {
  async getBalance(address: string): Promise<Coin[]> {
    const { data } = await getBalance(this.manifest.chain as EVMChains, address);

    // cut off balances without asset
    const balances = data[this.manifest.chain].balances.filter((b: any) => b.asset.symbol && b.asset.id);

    return balances.map((balance: any): Coin => {
      const { asset, amount } = balance;

      return new Coin({
        id: asset.id,
        chainId: this.manifest.chainId,
        name: asset.name,
        symbol: asset.symbol,
        icon: asset.image,
        native: !Boolean(asset.contract),
        address: asset.contract,
        price: asset.price?.amount,
        decimals: asset.price?.scalingFactor,
      }, utils.formatUnits(amount.value, amount.scalingFactor))
    })
  }

  async getTransactions(address: string, afterBlock?: number | string): Promise<Transaction[]> {
    let blockRange = null;

    if (typeof afterBlock === 'number' || typeof afterBlock === 'string') {
      const { data } = await getStatus(this.manifest.chain);
      blockRange = {
        from: parseInt(String(afterBlock)),
        to: data[this.manifest.chain].status.lastBlock
      };
    }

    const { data } = await getTransaction(this.manifest.chain, address, blockRange);

    return data[this.manifest.chain].transactions.map((transaction: any) => {
      return Transaction.fromData(transaction)
    })
  }

  async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<Msg[]> {
    const { data } = await getFees(this.manifest.chain);
    const fee = data[this.manifest.chain].fee;
    const isEIP1559 = typeof fee[speed]?.priorityFeePerGas === 'number';
    const transactionFee = 21000; // Paid for every transaction

    // gasLimit = 21000 + 68 * dataByteLength
    // https://ethereum.stackexchange.com/questions/39401/how-do-you-calculate-gas-limit-for-transaction-with-data-in-ethereum

    return msgs.map((msg) => {
      const msgData = msg.toData().data
      let feeForData = msgData && msgData !== '0x' ? 68 * (new TextEncoder().encode(msgData.toString())).length : 0
      const gasLimit = transactionFee + feeForData;
      const feeData = isEIP1559 ? {
        gasLimit,
        gasPrice: fee[speed]?.baseFeePerGas,
        maxFeePerGas: fee[speed]?.maxFeePerGas,
        maxPriorityFeePerGas: fee[speed]?.priorityFeePerGas,
      } : {
        gasLimit,
        gasPrice: fee[speed],
        maxFeePerGas: null,
        maxPriorityFeePerGas: null
      }

      return new ChainMsg({
        ...msg.toData(),
        ...feeData,
      })
    });
  }

  async gasFeeOptions(): Promise<GasFee> {
    const { data } = await getFees(this.manifest.chain);
    return data[this.manifest.chain].fee;
  }

  async getNative(): Promise<Asset> {
    const response = await getCryptoCurrency(this.manifest.chainSymbol);
    const asset =  response.data.assets.cryptoCurrencies.page.edges[0]?.node;

    return new Asset({
      id: asset.id,
      chainId: this.manifest.chainId,
      name: asset.name,
      symbol: asset.symbol,
      icon: asset.icon,
      native: !Boolean(asset.contract),
      address: asset.contract,
      price: asset.price?.amount,
      decimals: asset.price?.scalingFactor,
      priceHistory: asset.priceHistory,
    })
  }

  async calculateNonce(address: string): Promise<number> {
    return this.rpcProvider.getTransactionCount(address);
  }
}

@ChainDecorator("EthereumProvider", {
  deps: [KeystoreSigner],
  providerType: 'EVM'
})
export class EvmProvider extends Chain.Provider {
  private rpcProvider: providers.StaticJsonRpcProvider;

  constructor(
      private readonly chainRepository: BaseRepository,
  ) {
    super();
    this.chainRepository = chainRepository;
    this.rpcProvider = new providers.StaticJsonRpcProvider(this.manifest.rpcURL);
  }

  createMsg(data: Msg.Data): Msg {
    return new ChainMsg(data);
  }

  async getTransactions(address: string, afterBlock?: number | string): Promise<Transaction[]> {
    if (!EvmProvider.verifyAddress(address)) {
      throw new Error(`Incorrect address ${address}`); // create new IncorrectAddressError with code and message
    }
    return this.chainRepository.getTransactions(address, afterBlock);
  }

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<Msg[]> {
    return this.chainRepository.estimateFee(msgs, speed);
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature)) {
      throw  new Error("Some message do not have signature, sign it first");
    }

    const transactions = [];

    for (let msg of msgs) {
      const tx = await this.rpcProvider.sendTransaction(msg.signature as string);
      transactions.push(Transaction.fromData(tx));
    }

    return transactions;
  }

  async getBalance(address: string): Promise<Coin[]> {
    if (!EvmProvider.verifyAddress(address)) {
      throw new Error(`Incorrect address ${address}`);
    }
    return this.chainRepository.getBalance(address);
  }

  async gasFeeOptions(): Promise<GasFee> {
    return this.chainRepository.gasFeeOptions();
  }

  async getNative(): Promise<Asset> {
    return this.chainRepository.getNative();
  }

  static verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  get manifest(): Chain.Manifest {
    return this.chainRepository.getManifest();
  }

  get repositoryName(): string {
    return this.chainRepository.constructor.name;
  }

  async calculateNonce(address: string): Promise<number> {
    return this.chainRepository.calculateNonce(address);
  }
}
