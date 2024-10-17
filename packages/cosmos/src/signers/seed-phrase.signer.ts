import { MsgEncoding, Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { Secp256k1HdWallet } from '@cosmjs/launchpad';
import { SigningStargateClient } from '@cosmjs/stargate';
import { AuthInfo, SignDoc, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { bech32 } from 'bech32';
import {
  stringToPath,
  pathToString,
} from '@cosmjs/launchpad/node_modules/@cosmjs/crypto';
import { Wallet } from 'ethers';
import { encode } from 'bech32-buffer';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

import {
  AminoSignDoc,
  ChainMsg,
  CosmosSignMode,
  DirectSignDoc,
  SignMsgSendResponse,
} from '../msg';
import { STARGATE_CLIENT_OPTIONS } from '../utils';

@SignerDecorator(Signer.SignerType.SEED_PHRASE)
export class SeedPhraseSigner extends Signer.Provider {
  async getAddress(derivation: string, prefix?: string): Promise<string> {
    const hdPath = stringToPath(derivation);

    const wallet = await Secp256k1HdWallet.fromMnemonic(this.key, {
      prefix,
      hdPaths: [hdPath],
    });

    if (pathToString(hdPath).split('/')[2] == "60'") {
      const evmAddress = (await this.getEthermintAddress(derivation)) as string;

      return encode(
        prefix || 'cosmos',
        Uint8Array.from(Buffer.from(evmAddress.slice(2), 'hex'))
      );
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
    const wallet = Wallet.fromMnemonic(this.key, derivation);
    return wallet.address;
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
        signMode
      );
      msg.sign(res);
      return;
    } else {
      if (signMode === CosmosSignMode.SIGN_DIRECT || !signMode) {
        const signedTx = await this.signDirect(msg, derivation);
        const txBytes = TxRaw.encode(signedTx as TxRaw).finish();
        const rawTx = Buffer.from(txBytes).toString('base64');
        msg.sign(rawTx);
        return;
      }
      const signedTx = await this.signAmino(msg, derivation);
      msg.sign(signedTx);
    }
    return;
  }

  async signDirect(msg: ChainMsg, derivation?: string) {
    const txData = await msg.buildTx();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.key, {
      prefix: msg.provider.manifest.prefix,
      hdPaths: derivation ? [stringToPath(derivation) as any] : undefined,
    });
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      msg.provider.manifest.rpcURL,
      wallet,
      STARGATE_CLIENT_OPTIONS
    );
    return client.sign(senderAddress, txData.msgs, txData.fee, txData.memo);
  }

  async signAmino(msg: ChainMsg, derivation?: string) {
    const txData = await msg.buildTx();
    const wallet = await Secp256k1HdWallet.fromMnemonic(this.key, {
      prefix: msg.provider.manifest.prefix,
      hdPaths: derivation ? [stringToPath(derivation)] : undefined,
    });
    const [{ address: senderAddress }] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(
      msg.provider.manifest.rpcURL,
      wallet,
      STARGATE_CLIENT_OPTIONS
    );
    return client.sign(senderAddress, txData.msgs, txData.fee, txData.memo);
  }

  async signAminoRawTransaction(
    signDoc: AminoSignDoc,
    prefix: string,
    derivation?: string
  ): Promise<SignMsgSendResponse> {
    const wallet = await Secp256k1HdWallet.fromMnemonic(this.key, {
      prefix,
      hdPaths: derivation ? [stringToPath(derivation)] : undefined,
    });
    const [{ address: senderAddress }] = await wallet.getAccounts();
    return wallet.signAmino(senderAddress, signDoc);
  }

  async signDirectRawTransaction(
    signDoc: DirectSignDoc,
    prefix: string,
    derivation?: string
  ): Promise<SignMsgSendResponse> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.key, {
      prefix,
      hdPaths: derivation ? [stringToPath(derivation) as any] : undefined,
    });
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
    signMode: CosmosSignMode,
    derivation?: string
  ): Promise<SignMsgSendResponse> {
    return signMode === CosmosSignMode.SIGN_AMINO
      ? this.signAminoRawTransaction(
          signDoc as AminoSignDoc,
          prefix,
          derivation
        )
      : this.signDirectRawTransaction(
          signDoc as DirectSignDoc,
          prefix,
          derivation
        );
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

export default SeedPhraseSigner;
