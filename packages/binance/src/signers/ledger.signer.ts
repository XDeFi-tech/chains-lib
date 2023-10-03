import * as crypto from '@binance-chain/javascript-sdk/lib/crypto';
import * as types from '@binance-chain/javascript-sdk/lib/types';
import LedgerApp from '@binance-chain/javascript-sdk/lib/ledger/ledger-app';
import Transaction from '@binance-chain/javascript-sdk/lib/tx';
import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  verifyAddress(address: string, prefix = 'bnb'): boolean {
    return crypto.checkAddress(address, prefix);
  }

  async getPrivateKey(_derivation: string) {
    return this.key;
  }

  async getAddress(derivation: string, prefix = 'bnb'): Promise<string> {
    const transport = await Transport.create();
    try {
      const app = new LedgerApp(transport);
      const derivationArray = derivation
        .replace("'", '')
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
        return '';
      }
    } finally {
      transport.close();
    }
  }

  async sign(msg: ChainMsg): Promise<void> {
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

    const transport = await Transport.create();
    try {
      const app = new LedgerApp(transport);
      /* eslint-enable */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const tx = new Transaction({
        accountNumber: txData.accountNumber,
        chainId: txData.chainId,
        memo: txData.memo || '',
        msg: msgToSend,
        sequence: txData.sequence,
        source: txData.source,
      });

      const hdPath = [44, 714, 0, 0, txData.accountNumber];
      await app.showAddress('bnb', hdPath);
      const signedTx = await app.sign(tx.getSignBytes(), hdPath);

      msg.sign(signedTx.signature);
    } finally {
      transport.close();
    }
  }
}

export default LedgerSigner;
