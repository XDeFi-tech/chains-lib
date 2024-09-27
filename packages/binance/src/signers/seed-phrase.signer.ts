import { Signer, SignerDecorator } from '@ctrl-tech/chains-core';
import * as crypto from '@binance-chain/javascript-sdk/lib/crypto';
import * as types from '@binance-chain/javascript-sdk/lib/types';
import Transaction from '@binance-chain/javascript-sdk/lib/tx';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  verifyAddress(address: string, prefix = 'bnb'): boolean {
    return crypto.checkAddress(address, prefix);
  }

  async getPrivateKey(derivation: string) {
    let index = 0;
    if (derivation) {
      const indexStr = derivation.split('/').pop();
      index = parseInt(indexStr || '0', 10);
    }
    return crypto.getPrivateKeyFromMnemonic(this.key, true, index);
  }

  async getAddress(derivation: string, prefix = 'bnb'): Promise<string> {
    const pk = await this.getPrivateKey(derivation);
    return crypto.getAddressFromPrivateKey(pk, prefix);
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
    const pk = await this.getPrivateKey(derivation);
    const signedTx = tx.sign(pk, msgToSign);

    msg.sign(signedTx.serialize());
  }
}

export default SeedPhraseSigner;
