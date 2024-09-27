import {
  Signer,
  SignerDecorator,
  IsTrezorInitialized,
} from '@ctrl-tech/chains-core';
import TrezorConnect, * as connectWeb from '@trezor/connect-web';
import * as crypto from '@binance-chain/javascript-sdk/lib/crypto';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  verifyAddress(address: string, prefix = 'bnb'): boolean {
    return crypto.checkAddress(address, prefix);
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Trezor device');
  }

  @IsTrezorInitialized
  async getAddress(derivation: string): Promise<string> {
    const address = await TrezorConnect.binanceGetAddress({
      path: derivation,
    });
    if (address.success) {
      return address.payload.address;
    } else {
      throw new Error(`Cant get address from Trezor: ${address.payload.error}`);
    }
  }

  @IsTrezorInitialized
  async sign(
    msg: ChainMsg,
    derivation: string,
    manifest?: connectWeb.Manifest
  ): Promise<void> {
    if (manifest) {
      await TrezorConnect.manifest(manifest);
    }

    const txData = await msg.buildTx();

    const message: connectWeb.PROTO.BinanceTransferMsg = {
      inputs: [
        {
          address: txData.from,
          coins: [
            {
              denom: txData.denom,
              amount: txData.value,
            },
          ],
        },
      ],
      outputs: [
        {
          address: txData.to,
          coins: [
            {
              denom: txData.denom,
              amount: txData.value,
            },
          ],
        },
      ],
    };

    const unsignedTx: connectWeb.Params<connectWeb.BinanceSignTransaction> = {
      path: derivation,
      transaction: {
        account_number: txData.accountNumber,
        chain_id: txData.chainId,
        sequence: txData.sequence,
        source: txData.source,
        memo: txData.memo,
        transfer: message,
      },
    };

    const signedTx = await TrezorConnect.binanceSignTransaction(unsignedTx);

    if (signedTx.success) {
      msg.sign(signedTx.payload.signature);
    } else {
      throw new Error('Error signing transaction: ' + signedTx.payload.error);
    }
  }
}

export default TrezorSigner;
