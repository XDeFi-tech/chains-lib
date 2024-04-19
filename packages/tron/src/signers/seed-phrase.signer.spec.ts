import { TronProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { TRON_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody, TokenType } from '../msg';

import { SeedPhraseSigner } from './seed-phrase.signer';

describe('tron seed-phrase.signer', () => {
  let signer: SeedPhraseSigner;
  let txInput: MsgBody;
  let seedPhrase: string;
  let deriviationPath: string;
  let provider: TronProvider;

  beforeEach(() => {
    seedPhrase =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';

    deriviationPath = "m/44'/195'/0'/0";

    txInput = {
      from: 'TSDmgg8m3AfNniTzz4dyWN44fkGd7otZ4C',
      to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
      decimals: 18,
      tokenId: '10',
      contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      amount: '0.00001',
    };

    signer = new SeedPhraseSigner(seedPhrase, TRON_MANIFEST);

    provider = new TronProvider(new ChainDataSource(TRON_MANIFEST));
  });

  it('should return true for a valid address', () => {
    expect(signer.verifyAddress(txInput.from, TRON_MANIFEST)).toBe(true);
  });

  it('should return false for an invalid address', () => {
    expect(signer.verifyAddress('invalid-address', TRON_MANIFEST)).toBe(false);
  });

  it('should return the correct address for a valid private key', async () => {
    const address = await signer.getAddress(deriviationPath);
    expect(address).toBe(txInput.from);
  });

  it('should sign a ChainMsg with the private key', async () => {
    const msg = new ChainMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      provider: provider,
    });

    await signer.sign(msg, deriviationPath);
    expect((msg.signedTransaction as any).txID.length).toBe(64);
  });

  it('should throw when signing a TRC10 TX without a token id', async () => {
    const msg = new ChainMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      tokenType: TokenType.TRC10,
      provider: provider,
    });
    await expect(signer.sign(msg, deriviationPath)).rejects.toThrow(
      'TRX10 Token ID not provided'
    );
  });

  it('should sign a TRC20 TX with the private key', async () => {
    const msg = new ChainMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      contractAddress: txInput.contractAddress,
      decimals: txInput.decimals,
      tokenType: TokenType.TRC20,
      provider: provider,
    });
    await signer.sign(msg, deriviationPath);
    expect((msg.signedTransaction as any).txID.length).toBe(64);
  });

  it('should sign a TRC20 TX with the seed phrase', async () => {
    const msg = new ChainMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      contractAddress: txInput.contractAddress,
      decimals: txInput.decimals,
      tokenType: TokenType.TRC20,
      provider: provider,
    });
    await signer.sign(msg, deriviationPath);
    expect((msg.signedTransaction as any).txID.length).toBe(64);
  });

  it('should throw when signing a TRC20 TX without decimals', async () => {
    const msg = new ChainMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      contractAddress: txInput.contractAddress,
      tokenType: TokenType.TRC20,
      provider: provider,
    });
    await expect(signer.sign(msg, deriviationPath)).rejects.toThrow(
      'Token decimals not provided'
    );
  });

  it('should throw when signing a TRC20 TX without a contract address', async () => {
    const msg = new ChainMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      tokenType: TokenType.TRC20,
      provider: provider,
    });
    await expect(signer.sign(msg, deriviationPath)).rejects.toThrow(
      'TRC20 Contract Address not provided'
    );
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
    derivation = (index) => `m/44'/195'/${index}'/0/0`;
    signer = new SeedPhraseSigner(seedPhrase, TRON_MANIFEST);

    firstAddress = 'TSAmbvDjDR69Rq7zFF82wLbXSD9f7sdSDP';
    secondAddress = 'TEDuXkSHsK7Q7c1tBw4hHBAbVNjbMt7xMt';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});
