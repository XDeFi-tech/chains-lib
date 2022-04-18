import "reflect-metadata";
import {
  Chain,
  Coin,
  Inject,
  Injectable,
  Signer,
  Transaction,
  Msg,
} from "@xdefi/chains-core";

class Wallet {
  constructor() {
    console.log("My Wallet");
  }
}

class EthMsg extends Msg {
  public toData() {
    return this.data;
  }
}

@Signer.Decorator(Signer.SignerType.LEDGER)
class LedgerSignerProvider extends Signer.Controller {
  verifyAddress(address: string): boolean {
    return address.length > 6;
  }
  getAddress(derivation: string): Promise<string> {
    return Promise.resolve("1234567890");
  }
  sign(msg: Msg): Promise<string> {
    return Promise.resolve(JSON.stringify({ msg, key: this.key }));
  }
}

@Chain.Decorator("EthereumProvider", {
  deps: [Wallet, LedgerSignerProvider],
})
class EthereumProvider extends Chain.Controller {
  createMsg(data: Msg.Data): Msg {
    return new EthMsg(data);
  }
  getTransactions(): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
  estimateFee(msgs: Msg[]): Promise<Coin[]> {
    throw new Error("Method not implemented.");
  }
  broadcast(msgs: Msg[]): Promise<Transaction[]> {
    console.log(msgs);
    return Promise.resolve([]);
  }
  getBalance(): Promise<Coin> {
    return Promise.resolve(new Coin("ETH", "1"));
  }
}

@Injectable()
class EthereumController {
  constructor(@Inject("EthereumProvider") private provider: EthereumProvider) {
    const balance = provider.getBalance();
    console.log(balance);
  }
}

const main = async () => {
  const chain = Chain.getChainByName("EthereumProvider");
  console.log(chain.getBalance());

  const signature = await chain
    .getSigner(Signer.SignerType.LEDGER)
    .withPhrase("abcd")
    .sign({
      fromAddress: "123456",
    });

  console.log(signature);

  const address = await chain
    .getSigner(Signer.SignerType.LEDGER)
    .withPhrase("abcd")
    .getAddress("40/1/1/2");

  console.log(address);

  const validAddress = chain
    .getSigner(Signer.SignerType.LEDGER)
    .verifyAddress("1234567");
  console.log({ validAddress });

  const signers = chain.getSigners();
  console.log(signers);

  const hasSigner = chain.hasSigner(Signer.SignerType.LEDGER);
  console.log({ hasSigner });

  const signer = chain.getSigner(Signer.SignerType.LEDGER).withPhrase("abcd");
  await chain.signAndBroadcast(signer, [
    chain.createMsg({
      fromAddress: "12345",
    }),
  ]);

  // const signer = chain.getSigner(SignerType.LEDGER).withBuffer(0x00)

  // const msg = Msg.fromJson({
  //   fromAddress: '123',
  //   toAddress: '321',
  //   signature: signer.sign('Hello World'),
  // })

  const msg: Msg.Data = {
    fromAddress: "21212121",
  };
  await chain.broadcast([chain.createMsg(msg)]);

  // chain.getIntegration().bind(stream, window)
  // chain.getManifest();
  // chain.getManifest().get('logo');
  // chain.getManifest().get('description');
  // chain.getManifest().get('ui.send_tx_form');

  // const chains = getAllChains();
  // console.log(chains[0].getBalance());
};

main();
