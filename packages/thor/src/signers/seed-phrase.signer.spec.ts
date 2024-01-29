import { Msg } from '@xdefi-tech/chains-core';

import { ThorProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { THORCHAIN_MANIFESTS, ThorChains } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

describe('seed-phrase.signer', () => {
  let mnemonic: string;
  let signer: SeedPhraseSigner;
  const providers: Record<ThorChains, ThorProvider> = {
    [ThorChains.thorchain]: new ThorProvider(
      new ChainDataSource(THORCHAIN_MANIFESTS[ThorChains.thorchain])
    ),
    [ThorChains.mayachain]: new ThorProvider(
      new ChainDataSource(THORCHAIN_MANIFESTS[ThorChains.mayachain])
    ),
  };
  const txInputs: Record<ThorChains, MsgBody> = {
    [ThorChains.thorchain]: {
      from: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
      to: 'thor1cg5ws99z3p2lx76f54hmuffrk2n223vzyus73l',
      amount: 0.000001,
      decimals: 8,
    },
    [ThorChains.mayachain]: {
      from: 'maya1cg5ws99z3p2lx76f54hmuffrk2n223vzytwj80',
      to: 'maya1cg5ws99z3p2lx76f54hmuffrk2n223vzytwj80',
      amount: 0.000001,
      decimals: 8,
    },
  };
  const messages: Record<ThorChains, Msg> = {
    [ThorChains.thorchain]: providers.thorchain.createMsg(txInputs.thorchain),
    [ThorChains.mayachain]: providers.mayachain.createMsg(txInputs.mayachain),
  };
  let derivation: string;

  beforeEach(() => {
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    signer = new SeedPhraseSigner(mnemonic);

    derivation = "m/44'/931'/0'/0/0";
  });

  it('should get an address from a seed phrase', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInputs.thorchain.from);
  });

  it('should get a mayachain address from a seed phrase', async () => {
    expect(await signer.getAddress(derivation, 'maya')).toBe(
      txInputs.mayachain.from
    );
  });

  it('should sign a transaction using a seed phrase', async () => {
    await signer.sign(messages.thorchain as ChainMsg, derivation);

    expect(messages.thorchain.signedTransaction).toEqual(
      'Ck0KSwoOL3R5cGVzLk1zZ1NlbmQSOQoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGgsKBHJ1bmUSAzEwMBJhClAKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiED8LlkeE7S/gZp4aIxPpkXW0X8Lq/XknCOOPCr8C7q/UcSBAoCCAEYABINCgkKBHJ1bmUSATAQABpA01Hb6deAASNC/X3n9FPZYP3J/Dd3rAqSxkUv/OXgtHE1dYq6nmu5kOMSPdaGiAAyrVxzLT/Ihav3LN4CLEQT/g=='
    );
  });

  it('should sign a mayachain transaction using a seed phrase', async () => {
    await signer.sign(messages.mayachain as ChainMsg, derivation);

    expect(messages.mayachain.signedTransaction).toEqual(
      'Ck4KTAoOL3R5cGVzLk1zZ1NlbmQSOgoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGgwKBWNhY2FvEgMxMDASYgpQCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA/C5ZHhO0v4GaeGiMT6ZF1tF/C6v15Jwjjjwq/Au6v1HEgQKAggBGAASDgoKCgVjYWNhbxIBMBAAGkBVgn1euEFcZoCFy23cqCwdv91FYxSLCjkipFBrIp7N0gZfXb/j9hg3QSfWa5CLLRyszKBDvgwNCZj+LzQC3Cih'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInputs.thorchain.from, 'thor')).toBe(true);
    expect(signer.verifyAddress(txInputs.mayachain.from, 'maya')).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(
      'xprvA2ZDjRKxro9CHq2Y1xWJ3QXRrc7iMA9ewXQK6AaLadijNZ3Z63rYwJQtgUokMys33EwaVcqxSVuHCvPhPReaggEMhAzFWY3952xpTbTd8LN'
    );
  });
});
