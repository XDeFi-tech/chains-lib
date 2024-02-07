import THORChainApp from '@thorchain/ledger-thorchain';
import { Client } from '@xchainjs/xchain-thorchain';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport | null;
  private isInternalTransport: boolean;

  constructor(transport?: Transport) {
    super();
    this.transport = null;

    if (transport) {
      this.transport = transport;
      this.isInternalTransport = false;
    } else {
      this.isInternalTransport = true;
      TransportWebHID.create().then((t) => {
        this.transport = t as Transport;
      });
    }
  }

  async initTransport() {
    this.transport = (await TransportWebHID.create()) as Transport;
    this.isInternalTransport = true;
  }

  verifyAddress(address: string): boolean {
    // We need to init the client with some kind of seed phrase, even
    // if we just want to check the address
    return new Client({ phrase: '' }).validateAddress(address);
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string): Promise<string> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      const app = new THORChainApp(this.transport as Transport);
      const derivationArray = derivation
        .replace(/'/g, '')
        .split('/')
        .map(Number);
      const { bech32Address } = await app.getAddressAndPubKey(
        derivationArray,
        'thor'
      );

      return bech32Address;
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
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
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }
}

export default LedgerSigner;
