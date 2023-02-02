import {
  ChainDecorator,
  Chain,
  Coin,
  ConfigProvider,
  Inject,
  Msg,
  Transaction,
} from "@xdefi/chains-core";
import { providers, utils } from "ethers";
import "reflect-metadata";
import config from "./config";
import { LedgerSigner } from "./ledger.signer";
import { ChainMsg } from "./msg";
import { getTransaction, getBalance, getStatus, getFees } from './queries';
import { some } from "lodash";

export enum SupportedChains {
  ethereum = 'ethereum',
  binancesmartchain = 'binancesmartchain',
  polygon = 'polygon',
  avalanche = 'avalanche',
  fantom = 'fantom',
  arbitrum = 'arbitrum',
  aurora = 'aurora',
}
export interface ISupportedChains {
  [chain: string]: Chain.Manifest
}

export const supportedChains: ISupportedChains = {
  ethereum: {
    name: 'Ethereum',
    description: '',
    rpcURL: 'https://eth-rpc.gateway.pokt.network',
    chainSymbol: 'ETH',
    blockExplorerURL: 'https://etherscan.io',
    chainId: '1',
    chain: 'ethereum',
  },
  binancesmartchain: {
    name: 'BNB Smart Chain',
    description: '',
    rpcURL: 'https://bsc-dataseed1.defibit.io',
    chainSymbol: 'BNB',
    blockExplorerURL: 'https://bscscan.com',
    chainId: '56',
    chain: 'binancesmartchain',
  },
  polygon: {
    name: 'Polygon',
    description: '',
    rpcURL: 'https://polygon-rpc.com',
    chainSymbol: 'MATIC',
    blockExplorerURL: 'https://polygonscan.com',
    chainId: '137',
    chain: 'polygon',
  },
  avalanche: {
    name: 'Avalanche',
    description: '',
    rpcURL: 'https://api.avax.network/ext/bc/C/rpc',
    chainSymbol: 'AVAX',
    blockExplorerURL: 'https://snowtrace.io',
    chainId: '43114',
    chain: 'avalanche',
  },
  fantom: {
    name: 'Fantom',
    description: '',
    rpcURL: 'https://api.avax.network/ext/bc/C/rpc',
    chainSymbol: 'FTM',
    blockExplorerURL: 'https://rpc.ftm.tools',
    chainId: '250',
    chain: 'fantom',
  },
  arbitrum: {
    name: 'Arbitrum',
    description: '',
    rpcURL: 'https://arb1.arbitrum.io/rpc',
    chainSymbol: 'ETH',
    blockExplorerURL: 'https://arbiscan.io',
    chainId: '42161',
    chain: 'arbitrum',
  },
  aurora: {
    name: 'Aurora',
    description: '',
    rpcURL: 'https://mainnet.aurora.dev',
    chainSymbol: 'ETH',
    blockExplorerURL: 'https://aurorascan.dev',
    chainId: '1313161554',
    chain: 'aurora',
  },
}

type GasFeeSpeed = 'high' | 'medium' | 'low';

export abstract class BaseProvider { // Share base chain & call methods without any code
  protected provider: providers.StaticJsonRpcProvider;
  protected manifest: Chain.Manifest;

  constructor(manifest: Chain.Manifest) { // pass config here, get it in the provider
    this.manifest = manifest;
    this.provider = new providers.StaticJsonRpcProvider(manifest.rpcURL);
  }
  abstract getBalance(address: string): Promise<Coin[]>;
  abstract getTransactions(address: string, afterBlock?: number | string): Promise<Transaction[]>;
  abstract estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<any>;

  getManifest(): Chain.Manifest {
    return this.manifest;
  }
}

export class XdefiProvider extends BaseProvider {
  async getBalance(address: string): Promise<Coin[]> {
    const { data } = await getBalance(this.manifest.chain as SupportedChains, address);

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

  async getTransactions(address: string, afterBlock?: number | string): Promise<[]> {
    let blockRange = null;

    if (typeof afterBlock === 'number') {
      const { data } = await getStatus(this.manifest.chain);
      blockRange = {
        from: afterBlock,
        to: data[this.manifest.chain].status.lastBlock
      };
    }

    const { data } = await getTransaction(this.manifest.chain as SupportedChains, address, blockRange);

    return data[this.manifest.chain].transactions.map((transaction: any) => {
      return Transaction.fromData(transaction)
    })
  }

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<any> {
    const { data } = await getFees(this.manifest.chain);
    const fee = data[this.manifest.chain].fee;
    const feeWithSpeed = fee[speed]?.priorityFeePerGas || fee[speed];
    const gasLimit = 21000;

    return feeWithSpeed * gasLimit;
  }
}

@ChainDecorator("EthereumProvider", {
  deps: [ConfigProvider.load(config), LedgerSigner],
})
export class EvmProvider extends Chain.Provider {
  private provider: providers.StaticJsonRpcProvider;

  constructor(
      @Inject("Config") private readonly config: ConfigProvider<{
        manifest: Chain.Manifest,
      }>,
      private readonly chainProvider: XdefiProvider
  ) {
    super();
    this.config = config;
    this.chainProvider = chainProvider;
    this.provider = new providers.StaticJsonRpcProvider(this.config?.get("manifest.rpcURL"));
  }

  getManifest(): Chain.Manifest {
    return this.config.get('manifest');
  }

  createMsg(data: Msg.Data): Msg {
    return new ChainMsg(data);
  }

  static _checkAddress(address: string): void {
    if (!utils.isAddress(address)) {
      throw new Error(`Incorrect address ${address}`);
    }
  }

  async getTransactions(
    address: string,
    afterBlock?: number | string
  ): Promise<Transaction[]> {
    EvmProvider._checkAddress(address);
    return this.chainProvider.getTransactions(address, afterBlock);
  }

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<any> {
    return this.chainProvider.estimateFee(msgs, speed);
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    if (some(msgs, (msg) => !msg.hasSignature())) {
      throw  new Error("Some message do not have signature, sign it first");
    }

    const transactions = [];

    for (let msg of msgs) {
      const tx = await this.provider.sendTransaction(msgs.toString());
      transactions.push(Transaction.fromData(tx));
    }

    return transactions;
  }

  async getBalance(address: string): Promise<Coin[]> {
    EvmProvider._checkAddress(address);
    return this.chainProvider.getBalance(address);
  }
}
