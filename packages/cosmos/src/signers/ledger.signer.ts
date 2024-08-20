import { LedgerSigner as LedgerApp } from '@cosmjs/ledger-amino';
import { stringToPath } from '@cosmjs/crypto';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SigningStargateClient } from '@cosmjs/stargate';
import { bech32 } from 'bech32';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';

import { AminoSignDoc, ChainMsg } from '../msg';
import { STARGATE_CLIENT_OPTIONS } from '../utils';

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

  async getAddress(derivation: string, prefix: string): Promise<string> {
    const hdPath = stringToPath(derivation);
    const app = new LedgerApp(this.transport as Transport, {
      testModeAllowed: true,
      hdPaths: [hdPath],
      prefix,
    });

    const [{ address }] = await app.getAccounts();

    return address;
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    if (!derivation.startsWith('m/')) {
      derivation = 'm/' + derivation;
    }

    const hdPath = stringToPath(derivation);
    const app = new LedgerApp(this.transport as Transport, {
      testModeAllowed: true,
      hdPaths: [hdPath],
      prefix: msg.provider.manifest.prefix,
    });

    const client = await SigningStargateClient.connectWithSigner(
      msg.provider.manifest.rpcURL,
      app,
      STARGATE_CLIENT_OPTIONS
    );

    const txData = await msg.buildTx();
    const [{ address: senderAddress }] = await app.getAccounts();
    const signedTx = await client.sign(
      senderAddress,
      txData.msgs,
      txData.fee,
      txData.memo
    );
    const txBytes = TxRaw.encode(signedTx as TxRaw).finish();
    const rawTx = Buffer.from(txBytes).toString('base64');
    msg.sign(rawTx);
  }

  async signRawTransaction(
    signDoc: AminoSignDoc,
    derivation: string,
    prefix: string
  ) {
    if (!derivation.startsWith('m/')) {
      derivation = 'm/' + derivation;
    }

    const hdPath = stringToPath(derivation);
    const app = new LedgerApp(this.transport as Transport, {
      testModeAllowed: true,
      hdPaths: [hdPath],
      prefix,
    });
    const [{ address: senderAddress }] = await app.getAccounts();
    return app.signAmino(senderAddress, signDoc);
  }

  async verifyMessage(
    signer: string,
    data: Uint8Array | string,
    pubKey: Uint8Array,
    signature: Uint8Array
  ): Promise<boolean> {
    try {
      const isVerified = verifyADR36Amino(
        bech32.decode(signer).prefix, // prefix
        signer, // signer
        data, // data sign message
        pubKey, // pubKeyBuffer
        signature // signature
      );

      return isVerified;
    } catch (err) {
      return false;
    }
  }
}

export default LedgerSigner;
