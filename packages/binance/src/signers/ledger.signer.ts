import * as crypto from '@binance-chain/javascript-sdk/lib/crypto';
import * as types from '@binance-chain/javascript-sdk/lib/types';
import LedgerApp from '@binance-chain/javascript-sdk/lib/ledger/ledger-app';
import Transaction from '@binance-chain/javascript-sdk/lib/tx';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  verifyAddress(address: string, prefix = 'bnb'): boolean {
    return crypto.checkAddress(address, prefix);
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string, prefix = 'bnb'): Promise<string> {
    const app = new LedgerApp(this.transport);
    const derivationArray = derivation
      .replace(/'/g, '')
      .split('/')
      .map(Number);
    const publicKey = await app.getPublicKey(derivationArray);
    if (publicKey.pk) {
      const address = crypto.getAddressFromPublicKey(
        publicKey.pk.toString('hex'),
        prefix
      );

      return address;
    } else {
      throw new Error(`Cant get address from Ledger`);
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const txData = await msg.buildTx();
    const coin = {
      denom: txData.denom,
      amount: txData.value,
    };
    // do not touch messages
    /* eslint-disable */
    const msgToSend = {
      inputs: [
        {
          address: crypto.decodeAddress(txData.from),
          coins: [coin],
        },
      ],
      outputs: [
        {
          address: crypto.decodeAddress(txData.to),
          coins: [coin],
        },
      ],
      aminoPrefix: types.AminoPrefix.MsgSend,
    };
    const msgToSign = {
      inputs: [
        {
          address: txData.from,
          coins: [
            {
              amount: txData.value,
              denom: txData.denom,
            },
          ],
        },
      ],
      outputs: [
        {
          address: txData.to,
          coins: [
            {
              amount: txData.value,
              denom: txData.denom,
            },
          ],
        },
      ],
    };

    const app = new LedgerApp(this.transport as Transport);
    const tx = new Transaction({
      accountNumber: txData.accountNumber,
      chainId: txData.chainId,
      memo: txData.memo || '',
      msg: msgToSend,
      sequence: txData.sequence,
      source: txData.source,
    });

    const derivationArray = derivation
      .replace(/'/g, '')
      .split('/')
      .map(Number);
    await app.showAddress('bnb', derivationArray);
    const signedTx = await app.sign(tx.getSignBytes(), derivationArray);

    msg.sign(signedTx.signature);
  }
}

export default LedgerSigner;
