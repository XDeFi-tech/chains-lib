import THORChainApp from '@thorchain/ledger-thorchain';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { encodePubkey, makeAuthInfoBytes } from '@cosmjs/proto-signing';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import { TxRaw, TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import * as bech32Buffer from 'bech32-buffer';

import { getSignature } from '../utils';
import { ChainMsg, MsgType } from '../msg';
import { DEPOSIT_MSG_ADDRESS } from '../constants';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport;

  constructor(transport: Transport) {
    super();
    this.transport = transport;
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string, prefix = 'thor'): Promise<string> {
    const app = new THORChainApp(this.transport as Transport);
    const derivationArray = this.parseDerivationPath(derivation);
    const { bech32Address, errorMessage } = await app.getAddressAndPubKey(
      derivationArray,
      prefix
    );
    if (bech32Address) {
      return bech32Address;
    } else {
      throw new Error(`Error getting address: ${errorMessage}`);
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    const app = new THORChainApp(this.transport as Transport);
    const derivationArray = this.parseDerivationPath(derivation);
    const pubkeyInfo = await app.getPublicKey(derivationArray);
    const pubkey = encodePubkey({
      type: 'tendermint/PubKeySecp256k1',
      value: pubkeyInfo.compressedPk.toString('base64'),
    });
    const { txBody, from, to, sequence, value, accountNumber, gasLimit } =
      await msg.buildTx();
    const msgData = msg.toData();
    const orderedMsg = this.recursivelyOrderKeys([
      this.transferMsgAmino(
        from,
        msgData.type === MsgType.MsgDeposit ? DEPOSIT_MSG_ADDRESS : to,
        value.toString(),
        msgData.denom || msg.provider.manifest.denom,
        msg.provider.manifest.chain
      ),
    ]);
    if (txBody) {
      const tx = this.stringifyKeysInOrder({
        account_number: accountNumber.toString(),
        chain_id: msg.provider.manifest.chainId,
        fee: {
          amount: [],
          gas: gasLimit,
        },
        memo: txBody.memo,
        msgs: orderedMsg,
        sequence: sequence.toString(),
      });

      const signedTx = await app.sign(derivationArray, tx);
      if (signedTx.signature) {
        const authInfoBytes = makeAuthInfoBytes(
          [
            {
              pubkey,
              sequence: Number(sequence),
            },
          ],
          [],
          Number.parseInt(gasLimit),
          undefined,
          undefined,
          SignMode.SIGN_MODE_LEGACY_AMINO_JSON
        );
        const txBodyRaw = TxBody.fromPartial({
          memo: txBody.memo,
          messages: txBody.messages.map(({ type_url, value }) => ({
            typeUrl: type_url as string,
            value: value as Uint8Array,
          })),
        });
        const bodyBytes = TxBody.encode(txBodyRaw).finish();
        const txRaw = TxRaw.fromPartial({
          bodyBytes,
          authInfoBytes,
          signatures: [Buffer.from(getSignature(signedTx.signature), 'base64')],
        });
        const txBytes = TxRaw.encode(txRaw).finish();
        msg.sign(Buffer.from(txBytes).toString('base64'));
      } else {
        throw new Error('Error Signing TX: ' + signedTx.errorMessage);
      }
    }
  }

  private transferMsgAmino(
    from: string,
    to: string,
    amount: string,
    denom: string,
    chain: string
  ) {
    const from_address = Buffer.from(bech32Buffer.decode(from).data).toString(
      'base64'
    );
    const to_address = Buffer.from(bech32Buffer.decode(to).data).toString(
      'base64'
    );
    return {
      type: `${chain}/MsgSend`,
      value: {
        amount: [
          {
            amount,
            denom: denom.toLowerCase(),
          },
        ],
        from_address,
        to_address,
      },
    };
  }

  private parseDerivationPath(derivation: string): number[] {
    return derivation
      .replace('m/', '')
      .replace(/'/g, '')
      .split('/')
      .map(Number);
  }

  private recursivelyOrderKeys(unordered: any) {
    // If it's an array - recursively order any
    // dictionary items within the array
    if (Array.isArray(unordered)) {
      unordered.forEach((item, index) => {
        unordered[index] = this.recursivelyOrderKeys(item);
      });
      return unordered;
    }

    // If it's an object - let's order the keys
    if (typeof unordered !== 'object') return unordered;
    const ordered: any = {};
    const sortedKeys = Object.keys(unordered).sort();

    for (const key of sortedKeys) {
      ordered[key] = this.recursivelyOrderKeys(unordered[key]);
    }

    return ordered;
  }

  private stringifyKeysInOrder(data: any) {
    return JSON.stringify(this.recursivelyOrderKeys(data));
  }
}

export default LedgerSigner;
