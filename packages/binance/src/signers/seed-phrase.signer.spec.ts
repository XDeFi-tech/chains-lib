import { Msg } from '@xdefi-tech/chains-core';

import { BinanceProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BINANCE_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

describe('seed-phrase.signer', () => {
  let mnemonic: string;
  let signer: SeedPhraseSigner;
  let provider: BinanceProvider;
  let txInput: MsgBody;
  let message: Msg;
  let derivation: string;

  beforeEach(() => {
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    signer = new SeedPhraseSigner(mnemonic);

    derivation = "m/44'/714'/0'/0/0";

    provider = new BinanceProvider(new IndexerDataSource(BINANCE_MANIFEST));

    txInput = {
      from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      amount: 0.000001,
      denom: 'bnb',
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the private key', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg, derivation);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(
      '0c72be62d9433a853a7bdbf0455a69ded80669f7a7e9ce05d12e02adf353cf51'
    );
  });
});
