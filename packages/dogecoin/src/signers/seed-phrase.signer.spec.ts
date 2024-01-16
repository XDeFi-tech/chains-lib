import { Msg } from '@xdefi-tech/chains-core';

import { DogecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { DOGECOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import { SeedPhraseSigner } from './seed-phrase.signer';

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

jest.mock('hdkey', () => ({
  fromMasterSeed: jest.fn().mockReturnValue({
    derive: jest.fn().mockReturnValue({
      privateKey: Buffer.from(
        '7a3b9933a09c5d685973c4594c9f8f0139a5144683cc40e71f910757520d5467',
        'hex'
      ),
    }),
  }),
}));

describe('seed-phrase.signer', () => {
  let privateKey: string;
  let derivation: string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let provider: DogecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'QSiEQPEYQXfwP43VrYdPnSF74XxByVMnL8vz6eCEqVid9jdy9qNr';
    derivation = "m/44'/0'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);

    provider = new DogecoinProvider(new IndexerDataSource(DOGECOIN_MANIFEST));

    txInput = {
      from: 'D8724Lpsu8YcRNWyTDcf7L3pAiCettEqbP',
      to: 'D8724Lpsu8YcRNWyTDcf7L3pAiCettEqbP',
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
