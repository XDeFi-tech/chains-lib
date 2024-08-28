import { LedgerSigner as LedgerApp } from '@cosmjs/ledger-amino';
import { stringToPath } from '@cosmjs/crypto';
import Transport from '@ledgerhq/hw-transport';
import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { TxRaw, AuthInfo } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SigningStargateClient } from '@cosmjs/stargate';
import { bech32 } from 'bech32';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';

import {
  AminoSignDoc,
  ChainMsg,
  CosmosSignMode,
  DirectSignDoc,
  SignMsgSendResponse,
} from '../msg';
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
    const { signMode, raw, signDoc } = await msg.buildTx();
    if (raw) {
      if (msg.encoding === MsgEncoding.string) {
        signDoc.bodyBytes = Uint8Array.from(Object.values(signDoc.bodyBytes));
        signDoc.authInfoBytes = Uint8Array.from(
          Object.values(signDoc.authInfoBytes)
        );
        const authInfo = AuthInfo.decode(signDoc.authInfoBytes);
        signDoc.authInfoBytes = AuthInfo.encode(authInfo).finish();
      }
      const res = await this.signRawTransaction(
        signDoc,
        msg.provider.manifest.prefix,
        signMode,
        derivation
      );
      msg.sign(res);
      return;
    } else {
      if (!derivation.startsWith('m/')) {
        derivation = 'm/' + derivation;
      }

      const hdPath = stringToPath(derivation);
      const app = new LedgerApp(this.transport as Transport, {
        testModeAllowed: true,
        hdPaths: [hdPath],
        prefix: msg.provider.manifest.prefix,
      });
      if (signMode === CosmosSignMode.SIGN_DIRECT) {
        const signedTx = await this.signDirect(msg, app);
        const txBytes = TxRaw.encode(signedTx).finish();
        const rawTx = Buffer.from(txBytes).toString('base64');
        msg.sign(rawTx);
        return;
      }
      const signedTx = await this.signAmino(msg, app);
      msg.sign(signedTx);
    }
    return;
  }

  async signAmino(msg: ChainMsg, app: LedgerApp) {
    const txData = await msg.buildTx();
    const [{ address: senderAddress }] = await app.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      msg.provider.manifest.rpcURL,
      app,
      STARGATE_CLIENT_OPTIONS
    );
    return client.sign(senderAddress, txData.msgs, txData.fee, txData.memo);
  }

  async signDirect(_msg: ChainMsg, _app: LedgerApp): Promise<TxRaw> {
    throw new Error('Ledger Signer not supported SIGN_DIRECT_MODE');
  }

  signRawTransaction(
    signDoc: AminoSignDoc | DirectSignDoc,
    prefix: string,
    signMode: CosmosSignMode,
    derivation?: string
  ) {
    if (signMode === CosmosSignMode.SIGN_DIRECT) {
      return this.signDirectRawTransaction(
        signDoc as DirectSignDoc,
        prefix,
        derivation
      );
    }
    return this.signAminoRawTransaction(
      signDoc as AminoSignDoc,
      prefix,
      derivation
    );
  }

  async signDirectRawTransaction(
    signDoc: DirectSignDoc,
    prefix: string,
    _derivation = `m/44'/118'/0'/0/0`
  ): Promise<SignMsgSendResponse> {
    throw new Error('Ledger Signer not supported SIGN_DIRECT_MODE');
  }

  async signAminoRawTransaction(
    signDoc: AminoSignDoc,
    prefix: string,
    derivation = `m/44'/118'/0'/0/0`
  ): Promise<SignMsgSendResponse> {
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
