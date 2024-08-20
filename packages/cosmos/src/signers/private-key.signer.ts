import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { fromHex } from '@cosmjs/encoding';
import { AuthInfo, SignDoc, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { bech32 } from 'bech32';
import {
  pathToString,
  stringToPath,
} from '@cosmjs/launchpad/node_modules/@cosmjs/crypto';
import { Wallet } from 'ethers';
import { RawKey } from '@terra-money/feather.js';
import { encode } from 'bech32-buffer';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';
import { Secp256k1Wallet } from '@cosmjs/amino';

import {
  AminoSignDoc,
  ChainMsg,
  CosmosSignMode,
  DirectSignDoc,
  SignMsgSendResponse,
} from '../msg';
import { STARGATE_CLIENT_OPTIONS } from '../utils';

@SignerDecorator(Signer.SignerType.PRIVATE_KEY)
export class PrivateKeySigner extends Signer.Provider {
  async getPrivateKey(_derivation?: string) {
    return this.key;
  }

  async getAddress(derivation: string, prefix?: string): Promise<string> {
    const hdPath = stringToPath(derivation);
    const wallet = await DirectSecp256k1Wallet.fromKey(
      fromHex(this.key),
      prefix
    );
    if (pathToString(hdPath).split('/')[2] == "60'") {
      const evmAddress = (await this.getEthermintAddress(derivation)) as string;

      return encode(
        prefix || 'cosmos',
        Uint8Array.from(Buffer.from(evmAddress.slice(2), 'hex'))
      );
    } else if (
      pathToString(hdPath).split('/')[2] == "330'" ||
      prefix === 'terra'
    ) {
      const key = new RawKey(Buffer.from(this.key, 'hex'));

      return key.accAddress('terra');
    } else {
      const [{ address }] = await wallet.getAccounts();
      return address;
    }
  }

  // Only for slip44coinType: 60
  async getEthermintAddress(derivation: string): Promise<string | null> {
    const hdPath = stringToPath(derivation);
    if (pathToString(hdPath).split('/')[2] != "60'") {
      return null;
    }
    const wallet = new Wallet(this.key);
    return wallet.address;
  }

  async sign(msg: ChainMsg, _derivation?: string): Promise<void> {
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
        signMode
      );
      msg.sign(res);
      return;
    } else {
      if (signMode === CosmosSignMode.SIGN_DIRECT || !signMode) {
        const signedTx = await this.signDirect(msg);
        const txBytes = TxRaw.encode(signedTx as TxRaw).finish();
        const rawTx = Buffer.from(txBytes).toString('base64');
        msg.sign(rawTx);
        return;
      }
      const signedTx = await this.signAmino(msg);
      msg.sign(signedTx);
    }
    return;
  }

  async signDirect(msg: ChainMsg) {
    const txData = await msg.buildTx();
    const wallet = await await DirectSecp256k1Wallet.fromKey(
      fromHex(this.key),
      msg.provider.manifest.prefix
    );
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      msg.provider.manifest.rpcURL,
      wallet,
      STARGATE_CLIENT_OPTIONS
    );
    return client.sign(senderAddress, txData.msgs, txData.fee, txData.memo);
  }

  async signAmino(msg: ChainMsg) {
    const txData = await msg.buildTx();
    const wallet = await Secp256k1Wallet.fromKey(
      fromHex(this.key),
      msg.provider.manifest.prefix
    );
    const [{ address: senderAddress }] = await wallet.getAccounts();
    return wallet.signAmino(senderAddress, txData.signDoc);
  }

  async signAminoRawTransaction(
    signDoc: AminoSignDoc,
    prefix: string
  ): Promise<SignMsgSendResponse> {
    const wallet = await Secp256k1Wallet.fromKey(fromHex(this.key), prefix);
    const [{ address: senderAddress }] = await wallet.getAccounts();
    return wallet.signAmino(senderAddress, signDoc);
  }

  async signDirectRawTransaction(
    signDoc: DirectSignDoc,
    prefix: string
  ): Promise<SignMsgSendResponse> {
    const wallet = await DirectSecp256k1Wallet.fromKey(
      fromHex(this.key),
      prefix
    );
    const [{ address: senderAddress }] = await wallet.getAccounts();

    const newSignDoc = SignDoc.fromPartial({
      bodyBytes: signDoc.bodyBytes,
      authInfoBytes: signDoc.authInfoBytes,
      chainId: signDoc.chainId,
      accountNumber: signDoc.accountNumber
        ? BigInt(signDoc.accountNumber)
        : undefined,
    });
    return await wallet.signDirect(senderAddress, newSignDoc);
  }

  async signRawTransaction(
    signDoc: AminoSignDoc | DirectSignDoc,
    prefix: string,
    signMode: CosmosSignMode
  ): Promise<SignMsgSendResponse> {
    return signMode === CosmosSignMode.SIGN_AMINO
      ? this.signAminoRawTransaction(signDoc as AminoSignDoc, prefix)
      : this.signDirectRawTransaction(signDoc as DirectSignDoc, prefix);
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

export default PrivateKeySigner;
