import THORChainApp from '@thorchain/ledger-thorchain';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { bech32 } from 'bech32';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  verifyAddress(address: string): boolean {
    const prefix = bech32.decode(address).prefix;
    if (prefix === 'thor' || prefix === 'maya') {
      return true;
    }
    return false;
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string): Promise<string> {
    const app = new THORChainApp(this.transport as Transport);
    const derivationArray = derivation.replace(/'/g, '').split('/').map(Number);
    const prefix = derivation.slice(0, 4);
    const { bech32Address } = await app.getAddressAndPubKey(
      derivationArray,
      prefix
    );

    return bech32Address;
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const app = new THORChainApp(this.transport as Transport);
    const { txBody, from, to, sequence, value, accountNumber, gasLimit } =
      await msg.buildTx();
    if (txBody) {
      const derivationArray = derivation
        .replace(/'/g, '')
        .split('/')
        .map(Number);

      const tx = {
        account_number: accountNumber.toString(),
        chain_id: msg.provider.manifest.chainId,
        fee: {
          amount: [],
          gas: gasLimit,
        },
        memo: txBody.memo,
        msgs: [
          {
            type: 'thorchain/MsgSend',
            value: {
              amount: [
                {
                  amount: value.toString(),
                  denom: msg.provider.manifest.denom,
                },
              ],
              from_address: from,
              to_address: to,
            },
          },
        ],
        sequence: sequence.toString(),
      };

      const signedTx = await app.sign(derivationArray, JSON.stringify(tx));
      if (signedTx.signature) {
        msg.sign(signedTx.signature);
      } else {
        throw new Error('Error Signing TX: ' + signedTx.errorMessage);
      }
    }
  }
}

export default LedgerSigner;
