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
  const messages: Record<ThorChains, ChainMsg> = {
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
    await signer.sign(messages.thorchain, derivation);

    expect(messages.thorchain.signedTransaction).toEqual(
      'Ck0KSwoOL3R5cGVzLk1zZ1NlbmQSOQoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGgsKBHJ1bmUSAzEwMBJjClAKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiED8LlkeE7S/gZp4aIxPpkXW0X8Lq/XknCOOPCr8C7q/UcSBAoCCAEYABIPCgkKBHJ1bmUSATAQwJoMGkCf3T7Io+N6pehOobxD6uCKvsJIsfeMksP9J7QKN0f6JXDXubGvM5X3AclfeT+ALuqtkEn/FzzqVIj6Urdkzsqp'
    );
  });

  it('should sign a mayachain transaction using a seed phrase', async () => {
    await signer.sign(messages.mayachain, derivation);

    expect(messages.mayachain.signedTransaction).toEqual(
      'Ck4KTAoOL3R5cGVzLk1zZ1NlbmQSOgoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGgwKBWNhY2FvEgMxMDASZApQCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA/C5ZHhO0v4GaeGiMT6ZF1tF/C6v15Jwjjjwq/Au6v1HEgQKAggBGAASEAoKCgVjYWNhbxIBMBDAmgwaQMLpXq11jlObzM8FMtor3iIXP5aOy3uavo6+8QDlBK9LTolUuiA7JACOAd9c+QlS0ML5lETTFpKH63nTmO8cxSQ='
    );
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
