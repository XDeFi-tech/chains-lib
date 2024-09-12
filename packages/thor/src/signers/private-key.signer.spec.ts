import { ThorProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { THORCHAIN_MANIFESTS, ThorChains } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import PrivateKeySigner from './private-key.signer';

describe('private-key.signer', () => {
  let privateKey: string;
  let signer: PrivateKeySigner;
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
    privateKey =
      '566cfb78c40397deec568c28bbe2e81aa144bbe134488ce5a741ed2972606201';
    signer = new PrivateKeySigner(privateKey);

    derivation = "m/44'/931'/0'/0/0";
  });

  it('should return the same private key', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(privateKey);
  });

  it('should get an address from a private key phrase for thorchain', async () => {
    expect(
      await signer.getAddress(null, THORCHAIN_MANIFESTS.thorchain.prefix)
    ).toBe(txInputs.thorchain.from);
  });

  it('should get an address from a private key phrase for mayachain', async () => {
    expect(
      await signer.getAddress(null, THORCHAIN_MANIFESTS.mayachain.prefix)
    ).toBe(txInputs.mayachain.from);
  });

  it('should get an address from a private key phrase for non-existing chain with random prefix', async () => {
    expect(await signer.getAddress(null, 'random-prefix')).toBe(
      'random-prefix1cg5ws99z3p2lx76f54hmuffrk2n223vzf8y4v3'
    );
  });

  it('should sign a transaction using a private key for thorchain', async () => {
    await signer.sign(messages.thorchain);

    expect(messages.thorchain.signedTransaction).toEqual(
      'Ck0KSwoOL3R5cGVzLk1zZ1NlbmQSOQoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGgsKBHJ1bmUSAzEwMBJYClAKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiED8LlkeE7S/gZp4aIxPpkXW0X8Lq/XknCOOPCr8C7q/UcSBAoCCAEYABIEEMCaDBpAIIoLCZv1bKeHIZWNiwi+R90t0jv7eVCmBgNJ9Kjmhxh14m76WabZ9r7X/39b7/+J1/TRhWSL22E45HnxyLrVug=='
    );
  });

  it('should sign a transaction using a private key for mayachain', async () => {
    await signer.sign(messages.mayachain);

    expect(messages.mayachain.signedTransaction).toEqual(
      'Ck4KTAoOL3R5cGVzLk1zZ1NlbmQSOgoUwijoFKKIVfN7SaVvviUjsqalRYISFMIo6BSiiFXze0mlb74lI7KmpUWCGgwKBWNhY2FvEgMxMDASWApQCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA/C5ZHhO0v4GaeGiMT6ZF1tF/C6v15Jwjjjwq/Au6v1HEgQKAggBGAASBBDAmgwaQBbam0ygnZSKGaEHYRkpIAo/J+tK2YqCOQNJzoJonwA7bUvjj+8GX/o3dxba15QOc4o0PYKj3pRXwFzYfrf1q30='
    );
  });
});
