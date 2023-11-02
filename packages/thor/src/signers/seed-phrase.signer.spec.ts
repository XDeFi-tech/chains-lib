import { Msg } from '@xdefi-tech/chains-core';

import { ThorProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { THOR_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

describe('private-key.signer', () => {
  let mnemonic: string;
  let signer: SeedPhraseSigner;
  let provider: ThorProvider;
  let txInput: MsgBody;
  let message: Msg;
  let derivation: string;

  beforeEach(() => {
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    signer = new SeedPhraseSigner(mnemonic);

    derivation = "m/44'/931'/0'/0/0";

    provider = new ThorProvider(new ChainDataSource(THOR_MANIFEST));

    txInput = {
      from: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
      to: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
      amount: 0.000001,
      decimals: 8,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a seed phrase', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using a seed phrase', async () => {
    await signer.sign(message as ChainMsg, derivation);

    expect(message.signedTransaction).toEqual(
      'Ck0KSwoOL3R5cGVzLk1zZ1NlbmQSOQoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGgsKBHJ1bmUSAzEwMBJhClAKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiED8LlkeE7S/gZp4aIxPpkXW0X8Lq/XknCOOPCr8C7q/UcSBAoCCAEYABINCgkKBHJ1bmUSATAQABpA01Hb6deAASNC/X3n9FPZYP3J/Dd3rAqSxkUv/OXgtHE1dYq6nmu5kOMSPdaGiAAyrVxzLT/Ihav3LN4CLEQT/g=='
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(
      'xprvA2ZDjRKxro9CHq2Y1xWJ3QXRrc7iMA9ewXQK6AaLadijNZ3Z63rYwJQtgUokMys33EwaVcqxSVuHCvPhPReaggEMhAzFWY3952xpTbTd8LN'
    );
  });
});
