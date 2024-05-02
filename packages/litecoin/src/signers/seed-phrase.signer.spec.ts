import { Msg } from '@xdefi-tech/chains-core';

import { LitecoinProvider } from '../chain.provider';
import { LITECOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import { SeedPhraseSigner } from './seed-phrase.signer';

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('seed-phrase.signer', () => {
  let privateKey: string;
  let derivation: string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let provider: LitecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'T4gbj9QbHwmYkUMS5edgsjN8e1aYvh19d9jWAMeXQMUBZh9mNJwM';
    derivation = "m/84'/2'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);

    provider = new LitecoinProvider(
      new LitecoinProvider.dataSourceList.IndexerDataSource(LITECOIN_MANIFEST)
    );

    txInput = {
      from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      amount: 0.000001,
    };
    message = provider.createMsg(txInput);
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using the seed phrase', async () => {
    await signer.sign(message as ChainMsg, derivation);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should sign a raw transaction using a seed phrase', async () => {
    const txHex =
      '70736274ff0100710200000001467066a38eef3daa8a2bb0e35dccfd098e505b17efa7fcee45e390446679c35c0000000000ffffffff0264000000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4ca250000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4000000000001011f10270000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4000000';
    const signedTx = await signer.signRawTransaction(txHex, derivation);

    expect(signedTx).toEqual(
      '02000000000101467066a38eef3daa8a2bb0e35dccfd098e505b17efa7fcee45e390446679c35c0000000000ffffffff0264000000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4ca250000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca40248304502210095104f03cf04aa7e9f8516b9280dc30ad091f7a1aafb49e9e1bdd8c4513701f2022039e449e17cc4613128b320b15c6a7f2937158f0fa6b6714f8472c6f035d977c00121026d165716c33a95fbbed7c3bdfc155afc43dce53eacf059fc65aa6092f8625ad800000000'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key from a seed phrase', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(privateKey);
  });
});

describe('seed-phase.addressGeneration', () => {
  let derivation: (index: number) => string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let firstAddress: string;
  let secondAddress: string;

  beforeEach(() => {
    seedPhrase =
      'access before split cram spoon snap secret month sphere fog embark donor';
    derivation = (index) => `m/84'/2'/0'/0/${index}`;
    signer = new SeedPhraseSigner(seedPhrase);

    firstAddress = 'ltc1qqdlq30f792ene7k5cv9nuf8lnq7myg86hjy9ad';
    secondAddress = 'ltc1q8gpa34kmaufx6dlh9qrnls9ah0xhnudas6afzm';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});
