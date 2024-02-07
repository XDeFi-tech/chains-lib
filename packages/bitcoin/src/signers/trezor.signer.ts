import * as Bitcoin from 'bitcoinjs-lib';
import {
  Signer,
  SignerDecorator,
  IsTrezorInitialized,
} from '@xdefi-tech/chains-core';
import TrezorConnect, { Params, SignTransaction } from '@trezor/connect-web';
import { UTXO, ChainMsg } from '@xdefi-tech/chains-utxo';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
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
      coin: 'btc',
    });
    if (address.success) {
      return address.payload.address;
    } else {
      throw new Error(`Cant get address from Trezor: ${address.payload.error}`);
    }
  }

  @IsTrezorInitialized
  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const txData = await msg.buildTx();

    const derivationArray = derivation
      .replace('m/', '')
      .replace(/'/g, '')
      .split('/')
      .map(Number);

    const inputs = txData.inputs.map((utxo: UTXO) => {
      let scriptType: string;
      if (derivationArray[0] === 84) {
        scriptType = 'SPENDWITNESS';
      } else if (derivationArray[0] === 49) {
        scriptType = 'SPENDP2SHWITNESS';
      } else if (derivationArray[0] === 86) {
        scriptType = 'SPENDTAPROOT';
      } else if (derivationArray[0] === 44) {
        scriptType = 'SPENDADDRESS';
      } else {
        throw new Error(`Unsupported path type: ${derivationArray[0]}`);
      }

      return {
        prev_hash: utxo.hash,
        prev_index: utxo.index,
        amount: utxo.value,
        script_type: scriptType,
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

    const unsignedTx: Params<SignTransaction> = {
      inputs: inputs,
      outputs: outputs,
      coin: 'btc',
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
