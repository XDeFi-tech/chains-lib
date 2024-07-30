import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { Secp256k1HdWallet } from '@cosmjs/launchpad';
import { SigningStargateClient } from '@cosmjs/stargate';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { bech32 } from 'bech32';
import {
  stringToPath,
  pathToString,
} from '@cosmjs/launchpad/node_modules/@cosmjs/crypto';
import { Wallet } from 'ethers';
import { MnemonicKey, LCDClient } from '@terra-money/feather.js';
import { encode } from 'bech32-buffer';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { CosmosProvider } from 'src/chain.provider';
import { SignDoc } from 'osmojs/cosmos/tx/v1beta1/tx';

import {
  AminoSignDoc,
  ChainMsg,
  CosmosChainType,
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
    } else if (
      pathToString(hdPath).split('/')[2] == "330'" ||
      prefix === 'terra'
    ) {
      const wallet = new MnemonicKey({
        mnemonic: this._key,
        coinType: 330, // optional, default
        account: parseInt(pathToString(hdPath).split('/')[3]), // optional, default
        index: parseInt(pathToString(hdPath).split('/')[4]), // optional, default
      });

      return wallet.accAddress('terra');
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

  async sign(
    msg: ChainMsg,
    derivation: string,
    chainType?: CosmosChainType,
    signMode?: CosmosSignMode
  ): Promise<void> {
    if (chainType === CosmosChainType.Cosmos || !chainType) {
      const signedTx =
        signMode === CosmosSignMode.SIGN_DIRECT || !signMode
          ? await this.signDirect(msg)
          : await this.signAmino(msg);
      const txBytes = TxRaw.encode(signedTx as TxRaw).finish();
      const rawTx = Buffer.from(txBytes).toString('base64');
      msg.sign(rawTx);
      return;
    } else if (chainType === CosmosChainType.Terra) {
      const txData = await msg.buildTx();
      const clientOptions: Record<string, any> = {};
      clientOptions[msg.provider.manifest.chainId] = {
        chainID: msg.provider.manifest.chainId,
        lcd: msg.provider.manifest.lcdURL,
        gasAdjustment: 1.75,
        gasPrices: {
          uluna: 0.015,
        },
        prefix: msg.provider.manifest.prefix, // bech32 prefix, used by the LCD to understand which is the right chain to query
      };
      const lcdClient = new LCDClient(clientOptions);
      const hdPath = stringToPath(derivation);
      const terraWallet = lcdClient.wallet(
        new MnemonicKey({
          mnemonic: this._key,
          coinType: 330, // optional, default
          account: parseInt(pathToString(hdPath).split('/')[3]), // optional, default
          index: parseInt(pathToString(hdPath).split('/')[4]), // optional, default
        })
      );

      const tx = await terraWallet.createAndSignTx({
        msgs: [txData.msgs],
        chainID: msg.provider.manifest.chainId,
      });

      msg.sign(Buffer.from(tx.toBytes()).toString('base64'));
    }
  }

  async signDirect(msg: ChainMsg) {
    const txData = await msg.buildTx();
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.key, {
      prefix: msg.provider.manifest.prefix,
    });
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
    const wallet = await Secp256k1HdWallet.fromMnemonic(this.key, {
      prefix: msg.provider.manifest.prefix,
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
    provider: CosmosProvider
  ): Promise<SignMsgSendResponse> {
    const wallet = await Secp256k1HdWallet.fromMnemonic(this.key, {
      prefix: provider.manifest.prefix,
    });
    const [{ address: senderAddress }] = await wallet.getAccounts();
    return wallet.signAmino(senderAddress, signDoc);
  }

  async signDirectRawTransaction(
    signDoc: DirectSignDoc,
    provider: CosmosProvider
  ): Promise<SignMsgSendResponse> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.key, {
      prefix: provider.manifest.prefix,
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
    provider: CosmosProvider,
    signMode: CosmosSignMode
  ): Promise<SignMsgSendResponse> {
    return signMode === CosmosSignMode.SIGN_AMINO
      ? this.signAminoRawTransaction(signDoc as AminoSignDoc, provider)
      : this.signDirectRawTransaction(signDoc as DirectSignDoc, provider);
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
