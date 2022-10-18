import {
  ChainDecorator,
  Chain,
  Coin,
  ConfigProvider,
  Inject,
  Msg,
  Transaction,
} from "@xdefi/chains-core";
import { providers } from "ethers";
import "reflect-metadata";
import config from "./config";
import { LedgerSigner } from "./ledger.signer";
import manifestJson from "./manifest.json";
import { ChainMsg } from "./msg";
import { getTransaction, getBalance } from "./queries";

@ChainDecorator("EthereumProvider", {
  deps: [ConfigProvider.load(config), LedgerSigner],
})
export class EthereumProvider extends Chain.Provider {
  private provider: providers.StaticJsonRpcProvider;

  constructor(
      @Inject("Config") private readonly config?: ConfigProvider,
  ) {
    super();
    this.config = config;
    this.provider = new providers.StaticJsonRpcProvider(
        this.config?.get("testnet.rpc.url")
    )
  }

  getManifest(): Chain.Manifest {
    return manifestJson;
  }

  createMsg(data: Msg.Data): Msg {
    return new ChainMsg(data);
  }

  async getTransactions(
    address: string,
    afterBlock?: number
  ): Promise<Transaction[]> {
    const tx = await getTransaction(address, '2022-01-01T13:00:00Z', '2022-10-01T13:00:00Z', afterBlock || 0);

    return tx.data.ethereum.transactions;
  }

  async estimateFee(msgs: Msg[]): Promise<Coin[]> {
    throw new Error("Method not implemented.");
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    const signedTransaction = msgs[0].sign('');
    const tx = await this.provider.sendTransaction(signedTransaction.toString());

    return [];
  }

  async getBalance(address: string): Promise<Coin> {
    // todo validate address
    const { data } = await getBalance(address);
    // convert amount.value to eth
    return data.ethereum.balances.find((balance: any) => balance.asset.symbol === 'ETH');
  }
}
