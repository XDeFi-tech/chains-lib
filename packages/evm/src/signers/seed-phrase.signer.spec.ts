import { Msg } from '@xdefi-tech/chains-core';

import { EvmProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { EVM_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody, SignatureType } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

describe('seed-phrase.signer', () => {
  let mnemonic: string;
  let signer: SeedPhraseSigner;
  let provider: EvmProvider;
  let txInput: MsgBody;
  let message: Msg;
  let derivation: string;

  beforeEach(() => {
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    signer = new SeedPhraseSigner(mnemonic);

    derivation = "m/44'/60'/0'/0/0";

    provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));

    txInput = {
      from: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      to: '0xAa09Df2673e1ae3fcC8ed875C131b52449CF9581',
      amount: 0.000001,
      nonce: 0,
      decimals: 18,
      chainId: 1,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the private key', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using a seed phrase', async () => {
    await signer.sign(
      message as ChainMsg,
      derivation,
      SignatureType.Transaction
    );

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should sign a message using a seed phrase', async () => {
    txInput.data = 'test test';
    const chainMsg = provider.createMsg(txInput);
    await signer.sign(
      chainMsg as ChainMsg,
      derivation,
      SignatureType.PersonalSign
    );

    expect(chainMsg.signedTransaction).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(
      'd2a6956c6db5563b9755303795cc7e15be20e04c08b1fc8644f197e13190cbad'
    );
  });
});
