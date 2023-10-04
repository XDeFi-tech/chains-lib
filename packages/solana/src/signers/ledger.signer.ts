import Solana from '@ledgerhq/hw-app-solana';
import { PublicKey } from '@solana/web3.js';
import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    try {
      const publicKey = new PublicKey(address);
      return publicKey.toBase58() === address;
    } catch (error) {
      return false;
    }
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string): Promise<string> {
    const transport = await Transport.create();
    try {
      const app = new Solana(transport);
      const addressBuffer = await app.getAddress(derivation);
      const address = new PublicKey(addressBuffer.address).toBase58();

      return address;
    } finally {
      transport.close();
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const transport = await Transport.create();
    try {
      const app = new Solana(transport);
      /* eslint-enable */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { tx } = await msg.buildTx();
      const signedTx = await app.signTransaction(
        derivation,
        tx.serializeMessage()
      );

      msg.sign(signedTx.signature);
    } finally {
      transport.close();
    }
  }
}

export default LedgerSigner;
