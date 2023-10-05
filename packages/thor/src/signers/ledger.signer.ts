import THORChainApp from '@thorchain/ledger-thorchain';
import { Client } from '@xchainjs/xchain-thorchain';
import cosmosclient from '@cosmos-client/core';
import Transport from '@ledgerhq/hw-transport-webhid';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import Long from 'long';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  verifyAddress(address: string): boolean {
    // We need to init the client with some kind of seed phrase, even
    // if we just want to check the address
    return new Client({ phrase: '' }).validateAddress(address);
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string): Promise<string> {
    const transport = await Transport.create();
    try {
      const app = new THORChainApp(transport);
      const derivationArray = derivation
        .replace("'", '')
        .split('/')
        .map(Number);
      const { bech32Address } = await app.getAddressAndPubKey(
        derivationArray,
        'thor'
      );

      return bech32Address;
    } finally {
      transport.close();
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const transport = await Transport.create();
    try {
      const app = new THORChainApp(transport);
      /* eslint-enable */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { txBody, from, to, sequence, value, accountNumber, gasLimit } =
        await msg.buildTx();
      if (txBody) {
        const derivationArray = derivation
          .replace(/'/g, '')
          .split('/')
          .map(Number);

        const tx = {
          account_number: accountNumber.toString(),
          chain_id: 'thorchain-mainnet-v1',
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
                    denom: 'rune',
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
      transport.close();
    }
  }
}

export default LedgerSigner;
