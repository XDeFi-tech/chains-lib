import {
  Signer,
  SignerDecorator,
  IsTrezorInitialized,
} from '@xdefi-tech/chains-core';
import TrezorConnect, { Params, SignTransaction } from '@trezor/connect-web';
import { UTXO } from '@xdefi-tech/chains-utxo';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.TREZOR)
export class TrezorSigner extends Signer.TrezorProvider {
  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Trezor device');
  }

  @IsTrezorInitialized
  async getAddress(derivation: string): Promise<string> {
    const address = await TrezorConnect.getAddress({
      path: derivation,
      coin: 'btc',
    } as any);
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
        script_type: scriptType as any,
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
      const msgData = msg.toData();
      if (output.script && msgData.memo) {
        return {
          amount: 0,
          script_type: 'PAYTOOPRETURN',
          op_return_data: Buffer.from(msgData.memo).toString('hex'),
        };
      }
      const to = output.address ? output.address : txData.from;
      return {
        address: to,
        amount: output.value,
        script_type: 'PAYTOADDRESS' as any,
      };
    });

    const unsignedTx: Params<SignTransaction> = {
      inputs: inputs,
      outputs: outputs as any,
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

  async signMessage(message: string, derivation: string): Promise<string> {
    const signature = await TrezorConnect.signMessage({
      path: derivation,
      coin: 'btc',
      message: message,
    } as any);
    if (signature.success) {
      return signature.payload.signature;
    } else {
      throw new Error('Error signing message: ' + signature.payload.error);
    }
  }
}

export default TrezorSigner;
