import {
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
import { Repository } from "./repository";

@Chain.Decorator("EthereumProvider", {
  deps: [LedgerSigner, ConfigProvider.load(config)],
})
export class EthereumProvider extends Chain.Provider {
  private providers: { [k in Chain.Network]: providers.StaticJsonRpcProvider };

  constructor(
    @Inject("Repository") public readonly repository: Repository,
    @Inject("Config") public readonly config: ConfigProvider
  ) {
    super();

    this.providers = {
      [Chain.Network.Mainnet]: new providers.StaticJsonRpcProvider(
        config.get("mainnet.rpc.url")
      ),
      [Chain.Network.Testnet]: new providers.StaticJsonRpcProvider(
        config.get("testnet.rpc.url")
      ),
    };
  }

  getManifest(): Chain.Manifest {
    return manifestJson;
  }

  createMsg(data: Msg.Data): Msg {
    return new ChainMsg(data);
  }

  getTransactions(
    address: string,
    network: Chain.Network,
    afterBlock?: number
  ): Promise<Transaction[]> {
    return this.repository.getTransactions(address, network, afterBlock);
  }

  estimateFee(msgs: Msg[]): Promise<Coin[]> {
    throw new Error("Method not implemented.");
  }

  broadcast(msgs: Msg[]): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }

  getBalance(): Promise<Coin> {
    throw new Error("Method not implemented.");
  }
}
