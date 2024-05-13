import { Msg } from '@xdefi-tech/chains-core';

import { EvmProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { EVM_MANIFESTS } from '../manifests';
import {
  ChainMsg,
  EvmTypedData,
  MsgBody,
  SignatureType,
  TypedDataField,
} from '../msg';

import PrivateKeySigner from './private-key.signer';

describe('private-key.signer', () => {
  let privateKey: string;
  let signer: PrivateKeySigner;
  let provider: EvmProvider;
  let txInput: MsgBody;
  let message: Msg;
  let signature: string;
  let pubKey: string;

  beforeEach(() => {
    privateKey =
      'd2a6956c6db5563b9755303795cc7e15be20e04c08b1fc8644f197e13190cbad';
    signature =
      '0x41d9578d76d6460e125a783418c644de2663e585d59f507e7a86697a58d9bba24307fdad5f9647dba44b5ed5ac54741b3959fb8838c8a2b33afaa88d8d8c15571b';

    signer = new PrivateKeySigner(privateKey);

    provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));

    txInput = {
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
    };

    pubKey =
      '0x0467a21d7183018fea1a9cb904c4ab1e99e0dc3efd2319061005a02552f0da1444e1e4c85e15f61e21cafc571c99bd68984daeafc1a6f04b2e69c35c6e2d8f0fcd';

    message = provider.createMsg(txInput);
  });

  it('should get an address from the private key', async () => {
    expect(await signer.getAddress()).toBe(txInput.from);
  });

  it('should get a public key from the private key', async () => {
    expect(await signer.getPublicKey()).toBe(pubKey);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg, '', SignatureType.Transaction);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should sign a message using a private key', async () => {
    txInput.data = 'test test';
    const chainMsg = provider.createMsg(txInput);
    await signer.sign(chainMsg as ChainMsg, '', SignatureType.PersonalSign);

    expect(chainMsg.signedTransaction).toBeTruthy();
  });

  it('should sign a typed message using a seed phrase', async () => {
    const record: Record<string, Array<TypedDataField>> = {
      test: [{ name: 'test', type: 'string' }],
    };
    const values: Record<string, any> = {
      test: 'test',
    };

    const testData: EvmTypedData = {
      domain: {},
      fields: record,
      values: values,
    };

    txInput.typedData = testData;
    const chainMsg = provider.createMsg(txInput);

    await signer.sign(chainMsg as ChainMsg, '', SignatureType.SignTypedData);

    expect(chainMsg.signedTransaction).toEqual(signature);
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey()).toEqual(privateKey);
  });

  it('should get a public key from the ledger device', async () => {
    expect(await signer.getPublicKey()).toBe(pubKey);
  });

  it('should get recover signers address from the signature', async () => {
    const message = 'test';
    const recoveredAddress = await signer.recover(signature, message);

    expect(recoveredAddress).not.toBe(txInput.from);
  });

  it('should get recover signers publicKey from the signature', async () => {
    const message = 'test';
    const recoveredPubKey = await signer.recoverPublicKey(signature, message);

    expect(recoveredPubKey).not.toBe(pubKey);
  });
});
