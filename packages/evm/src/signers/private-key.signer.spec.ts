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
  let message: ChainMsg;
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
    await signer.sign(message, '', SignatureType.Transaction);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should sign a message using a private key', async () => {
    txInput.data = 'test test';
    const chainMsg = provider.createMsg(txInput);
    await signer.sign(chainMsg, '', SignatureType.PersonalSign);

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

    await signer.sign(chainMsg, '', SignatureType.SignTypedData);

    expect(chainMsg.signedTransaction).toEqual(signature);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey()).toEqual(privateKey);
  });

  it('should get a public key from the ledger device', async () => {
    expect(await signer.getPublicKey()).toBe(pubKey);
  });

  it('should get recover signers address from the signature', async () => {
    const signature =
      '0x41d9578d76d6460e125a783418c644de2663e585d59f507e7a86697a58d9bba24307fdad5f9647dba44b5ed5ac54741b3959fb8838c8a2b33afaa88d8d8c15571b';
    const message = 'test';
    const address = '0xFD7dD7e26593227A23BAFA6560c3B8C0b9DE952b';

    const recoveredAddress = await signer.recover(signature, message);

    expect(recoveredAddress).toBe(address);
  });

  it('should get recover signers publicKey from the signature', async () => {
    const signature =
      '0x41d9578d76d6460e125a783418c644de2663e585d59f507e7a86697a58d9bba24307fdad5f9647dba44b5ed5ac54741b3959fb8838c8a2b33afaa88d8d8c15571b';
    const message = 'test';
    const publicKey =
      '43816f07212517ee8f38757fc2d576109f688a371ba839e158dae9b02f1ce5556420f1b3166c776b235fd308aa7293fe86bb1276f8cca2d23111df273160fa34';

    const recoveredPubKey = await signer.recoverPublicKey(signature, message);

    expect(recoveredPubKey).toBe(publicKey);
  });

  it('should return signature', async () => {
    const domain = {
      name: 'MyDApp',
      version: '1',
      chainId: 1,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    };
    const types: Record<string, Array<TypedDataField>> = {
      test: [{ name: 'test', type: 'string' }],
    };
    const value: Record<string, any> = {
      test: 'test',
    };

    const signature = await signer.signTypedData(domain, types, value);

    expect(signature).toBe(
      '0xf0ca03c75a64b4d616be4df71475799f416edfa105ce5929561f4cc52aa86ed66347715c7f1db36da9d8bc348c5e3c36e64c830b3d3f51293944302b583947a11c'
    );
  });
});
