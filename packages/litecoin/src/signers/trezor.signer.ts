import {
  Signer,
  SignerDecorator,
  IsTrezorInitialized,
} from '@ctrl-tech/chains-core';
import TrezorConnect, {
  Params,
  SignTransaction,
  Manifest,
} from '@trezor/connect-web';
import { UTXO, ChainMsg } from '@ctrl-tech/chains-utxo';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  verifyAddress(address: string): boolean {
    if (new RegExp(/^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/).test(address)) {
      return true;
    } else {
      return false;
    }
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Trezor device');
  }

  @IsTrezorInitialized
  async getAddress(derivation: string): Promise<string> {
    const address = await TrezorConnect.getAddress({
      path: derivation,
      coin: 'ltc',
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
    manifest?: Manifest
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

    const inputs = txData.inputs.map((utxo: UTXO) => ({
      prev_hash: utxo.hash,
      prev_index: utxo.index,
      amount: utxo.value,
      address_n: [
        (derivationArray[0] | 0x80000000) >>> 0,
        (derivationArray[1] | 0x80000000) >>> 0,
        (derivationArray[2] | 0x80000000) >>> 0,
        derivationArray[3],
        derivationArray[4],
      ],
    }));

    const outputs = txData.outputs.map((output: any) => {
      const to = output.address ? output.address : txData.from;
      return {
        address: to,
        amount: output.value,
      };
    });

    const unsignedTx: Params<SignTransaction> = {
      inputs: inputs,
      outputs: outputs,
      coin: 'ltc',
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
