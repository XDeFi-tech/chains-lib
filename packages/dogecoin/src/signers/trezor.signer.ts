import {
  Signer,
  SignerDecorator,
  IsTrezorInitialized,
} from '@xdefi-tech/chains-core';
import TrezorConnect, * as connectWeb from '@trezor/connect-web';
import { UTXO, ChainMsg } from '@xdefi-tech/chains-utxo';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Trezor device');
  }

  @IsTrezorInitialized
  async getAddress(derivation: string): Promise<string> {
    const address = await TrezorConnect.getAddress({
      path: derivation,
      coin: 'doge',
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

    const derivationArray = derivation
      .replace('m/', '')
      .replace(/'/g, '')
      .split('/')
      .map(Number);

    const inputs = txData.inputs.map((utxo: UTXO) => {
      return {
        prev_hash: utxo.hash,
        prev_index: utxo.index,
        amount: utxo.value,
        script_type: 'SPENDADDRESS',
        address_n: [
          (derivationArray[0] | 0x80000000) >>> 0,
          (derivationArray[1] | 0x80000000) >>> 0,
          (derivationArray[2] | 0x80000000) >>> 0,
          derivationArray[3],
          derivationArray[4],
        ],
      };
    });

    const outputs = txData.outputs.map((output: any) => {
      const to = output.address ? output.address : txData.from;
      return {
        address: to,
        amount: output.value,
      };
    });
    const unsignedTx: connectWeb.Params<connectWeb.SignTransaction> = {
      inputs: inputs,
      outputs: outputs,
      coin: 'Dogecoin',
      serialize: true,
    };

    const signedTx = await TrezorConnect.signTransaction(unsignedTx);

    if (signedTx.success) {
      msg.sign(signedTx.payload.serializedTx);
    } else {
      throw new Error('Error signing transaction: ' + signedTx.payload.error);
    }
  }
}

export default TrezorSigner;
