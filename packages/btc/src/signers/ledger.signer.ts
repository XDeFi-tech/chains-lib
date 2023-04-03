import App from '@ledgerhq/hw-app-btc';
import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi/chains-core';
import * as Bitcoin from 'bitcoinjs-lib';

import { BitcoinChainMessage } from '../msg';

export type Signature = {
  v: number;
  r: string;
  s: string;
};

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner<S = Signature> extends Signer.Provider<S> {
  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAddress(
    derivation: string,
    type: 'legacy' | 'p2sh' | 'bech32' | 'bech32m' | 'cashaddr' = 'legacy'
  ): Promise<string> {
    const transport = await Transport.create();
    const app = new App({ transport, currency: 'bitcoin' });

    const address = await app.getWalletPublicKey(derivation, { format: type });
    transport.close();

    return address.bitcoinAddress;
  }

  async sign(derivation: string, msg: BitcoinChainMessage): Promise<S> {
    const transport = await Transport.create();
    const app = new App({ transport, currency: 'bitcoin' });
    const { txHex } = await msg.buildTx();
    const signature = await app.signMessage(derivation, txHex);
    transport.close();

    return {
      v: signature.v,
      r: '0x' + signature.r,
      s: '0x' + signature.s,
    } as S;
  }
}

export default LedgerSigner;
