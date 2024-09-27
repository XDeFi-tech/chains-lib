import { Msg } from '@ctrl-tech/chains-core';

import { ThorProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { THORCHAIN_MANIFESTS, ThorChains } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

describe('seed-phrase.signer', () => {
  let mnemonic: string;
  let privateKey: string;
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
    privateKey =
      '566cfb78c40397deec568c28bbe2e81aa144bbe134488ce5a741ed2972606201';
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
      'ClAKTgoOL3R5cGVzLk1zZ1NlbmQSPAoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGg4KBWNhY2FvEgUxMDAwMBJiClAKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiED8LlkeE7S/gZp4aIxPpkXW0X8Lq/XknCOOPCr8C7q/UcSBAoCCAEYABIOCgoKBWNhY2FvEgEwEAAaQCz7DsyqQcbgDK9007gTSz++N38eLd+ghHCBEyzm9bJtKSWnHwiKLBNHFMLc42GfBv8VSqHwxu/6bKthgrgE+m8='
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
    derivation = (index) => `m/44'/931'/0'/0/${index}`;
    signer = new SeedPhraseSigner(seedPhrase);

    firstAddress = 'thor107f3suf8m7eepfftkqxw547qk93se6w93gsgev';
    secondAddress = 'thor12fdy7vxd5ml7athw3jgz3gs8vnyug0qchtqh0p';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});
