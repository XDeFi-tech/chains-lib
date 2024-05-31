import { DataSource, Msg } from '@xdefi-tech/chains-core';

import { DashProvider } from '../chain.provider';
import { DASH_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';
import { ChainDataSource } from '../datasource';

import { SeedPhraseSigner } from './seed-phrase.signer';

describe('seed-phrase.signer', () => {
  let privateKey: string;
  let derivation: string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let dataSource: DataSource;
  let provider: DashProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    privateKey = 'XBdUZkCca8Nj3ydyf1pBfsf5oKdvceEgbWhegJNVjkqnpLEE1JGa';
    derivation = "m/44'/5'/0'/0/0";
    signer = new SeedPhraseSigner(seedPhrase);
    dataSource = new ChainDataSource(DASH_MANIFEST);
    provider = new DashProvider(dataSource);

    txInput = {
      from: 'XurgKr82Ys7reuJxAYq5X5G2mbAvWAxvkX',
      to: 'XurgKr82Ys7reuJxAYq5X5G2mbAvWAxvkX',
      amount: 0.00001,
    };
    message = provider.createMsg(txInput);
  });

  it('should get an address from the seed phrase', async () => {
    const address = await signer.getAddress(derivation);
    expect(address).toBe(txInput.from);
  });

  it('should sign a transaction using the seed phrase', async () => {
    jest.spyOn(provider.dataSource.api, 'get').mockResolvedValue({
      data: [
        {
          "address": "XurgKr82Ys7reuJxAYq5X5G2mbAvWAxvkX",
          "txid": "da59fe9b43d87301b084a145a1b1154a4bd9ee0dc05bb83c08d22024310066c3",
          "vout": 0,
          "scriptPubKey": "76a914d2469d0c589f9ca695e71278edf923cba781a42688ac",
          "amount": 0.0001,
          "satoshis": 10000,
          "height": 2079424,
          "confirmations": 908
        }
      ]
    });

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

describe('seed-phase.addressGeneration', () => {
  let derivation: (index: number) => string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let firstAddress: string;
  let secondAddress: string;

  beforeEach(() => {
    seedPhrase =
      'access before split cram spoon snap secret month sphere fog embark donor';
    derivation = (index) => `m/44'/5'/0'/0/${index}`;
    signer = new SeedPhraseSigner(seedPhrase);

    firstAddress = 'XgYco6NSZoyTZX6CKQp3HqWLVjF2YsJxpZ';
    secondAddress = 'Xv3D7tBwojXQ611WhKbjtQkS9uajKb8q8Z';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});
