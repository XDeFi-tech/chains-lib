import { DiContainer, Injectable } from 'common';
import { Coin } from 'core/coin';
import { Msg } from 'core/msg';
import * as Signer from 'core/signer';
import { Transaction } from 'core/transaction';
import { Network } from './interfaces';
import { Manifest } from './interfaces/manifest.interface';

/**
 * Represents abstract class for chain Provider, which provides
 * primitives for interacting with particular chain.
 *
 * Example:
 *
 * ```ts
 * @Chain.Decorator("EthereumProvider", {
 *   deps: [LedgerSigner]
 * })
 * class EthereumProvider extens Chain.Provider {
 *    ...implement abstract methods
 * }
 * ```
 */
@Injectable()
export abstract class Provider {
  abstract getManifest(): Manifest;
  abstract getBalance(): Promise<Coin>;
  abstract getTransactions(address: string, network: Network, afterBlock?: number): Promise<Transaction[]>;
  abstract estimateFee(msgs: Msg[]): Promise<Coin[]>;
  abstract broadcast(msgs: Msg[]): Promise<Transaction[]>;
  abstract createMsg(data: Msg.Data): Msg;

  public async signAndBroadcast(derivation: string, signer: Signer.Provider, msgs: Msg[]) {
    for await (let msg of msgs) {
      const signature = await signer.sign(derivation, msg.toData());
      msg.sign(signature);
    }

    return this.broadcast(msgs);
  }

  // TODO: Return list of objects with type and signer
  public getSigners() {
    return DiContainer.getAll<Signer.Provider>(Signer.SIGNER_SCOPE_NAME);
  }

  public getSigner(type: Signer.SignerType) {
    return DiContainer.getAll<Signer.Provider>(type)[0];
  }

  public hasSigner(type: Signer.SignerType) {
    const signer = this.getSigner(type);
    return signer !== undefined;
  }
}
