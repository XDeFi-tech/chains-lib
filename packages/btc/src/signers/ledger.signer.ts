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
export class LedgerSigner extends Signer.Provider {
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

  async sign(derivation: string, msg: BitcoinChainMessage) {
    const transport = await Transport.create();
    const app = new App({ transport, currency: 'bitcoin' });
    const { txHex } = await msg.buildTx();
    const result = await app.signMessage(derivation, txHex);
    await transport.close();

    const v = result['v'] + 27 + 4;

    const signature = Buffer.from(
      v.toString(16) + result['r'] + result['s'],
      'hex'
    ).toString('base64');
    msg.sign(signature);
  }
}

export default LedgerSigner;
