import TronWeb from 'tronweb';

import { TronProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { TRON_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody, TokenType } from '../msg';

import { SeedPhraseSigner } from './seed-phrase.signer';

jest.mock('../msg.ts', () => {
  const orignalModule = jest.requireActual('../msg.ts');

  return {
    __esModule: true,
    ...orignalModule,
  };
});

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

  it('should return the correct address for a valid private key', async () => {
    const address = await signer.getAddress(deriviationPath);
    expect(address).toBe(txInput.from);
  });

  it('should sign a ChainMsg with the private key', async () => {
    const msg = provider.createMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      provider: provider,
    });

    await signer.sign(msg, deriviationPath);
    expect((msg.signedTransaction as any).txID.length).toBe(64);
  });

  it('should throw when signing a TRC10 TX without a token id', async () => {
    const msg = provider.createMsg({
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
    const msg = provider.createMsg({
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
    const msg = provider.createMsg({
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
    const msg = provider.createMsg({
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
    const msg = provider.createMsg({
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

  it('should signMessage a TRC20 TX with the seed phrase', async () => {
    const msg = provider.createMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      contractAddress: txInput.contractAddress,
      decimals: txInput.decimals,
      tokenType: TokenType.TRC20,
      provider: provider,
    });
    ChainMsg.prototype.buildTx = jest.fn().mockResolvedValue({
      raw_data_hex:
        '0a0218c52208b2dcb6ece39c937140a886d9be87325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541b2431e51da71cf3fbe9a0daf59b2d716213dc8f2121541a614f803b6fd780986a42c78ec9c7f77e6ded13c2244a9059cbb00000000000000000000000084987d218c5ae2027c419e52c95791e453493821000000000000000000000000000000000000000000000000000000e8d4a5100070cac0d5be8732900180a3c347',
    });
    const { raw_data_hex } = await msg.buildTx();
    const signature = await signer.signMessage(raw_data_hex, deriviationPath);

    expect(signature).toEqual(
      '0x7605f9a707b2bc6ca6c5fc6deaf192868ef70b2c196df784c849d8734413131f67ba100590ecb931548869e771329aea8d137c339570882f3c1314c031bf75cb1c'
    );
  });

  it('should signMessageV2 a TRC20 TX with the seed phrase', async () => {
    const message = 'Hello, world!';
    const signature = await signer.signMessageV2(message, deriviationPath);

    expect(signature).toEqual(
      '0xb80601cba137745cfbb0e3507c3c22bb9465dc7d2963a51a6fcfdc5f4341b53d7faab96d26c080151e5877a8945ea9028bc0d529f11dffa79b8162c38d5bab821c'
    );
  });

  it('should signTransaction a TRC20 TX with the seed phrase', async () => {
    const msg = provider.createMsg({
      to: txInput.to,
      from: txInput.from,
      amount: 0.000001,
      contractAddress: txInput.contractAddress,
      decimals: txInput.decimals,
      tokenType: TokenType.TRC20,
      provider: provider,
    });
    ChainMsg.prototype.buildTx = jest.fn().mockResolvedValue({
      raw_data_hex:
        '0a0218c52208b2dcb6ece39c937140a886d9be87325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541b2431e51da71cf3fbe9a0daf59b2d716213dc8f2121541a614f803b6fd780986a42c78ec9c7f77e6ded13c2244a9059cbb00000000000000000000000084987d218c5ae2027c419e52c95791e453493821000000000000000000000000000000000000000000000000000000e8d4a5100070cac0d5be8732900180a3c347',
    });
    const { raw_data_hex } = await msg.buildTx();

    const signature = await signer.signTransaction(
      raw_data_hex,
      deriviationPath
    );

    expect(signature).toEqual(
      '0x7605f9a707b2bc6ca6c5fc6deaf192868ef70b2c196df784c849d8734413131f67ba100590ecb931548869e771329aea8d137c339570882f3c1314c031bf75cb1c'
    );
  });

  it('should multiSignTransaction a TRC20 TX with the private key', async () => {
    const tronWeb = new TronWeb({
      fullHost: TRON_MANIFEST.rpcURL,
    });
    const transaction = await tronWeb.transactionBuilder.sendTrx(
      tronWeb.address.toHex(txInput.to),
      1,
      tronWeb.address.toHex(txInput.from)
    );
    const signedTx = await signer.multiSignTransaction(
      transaction,
      deriviationPath,
      0
    );
    expect(signedTx.signature).toBeDefined();
    expect(signedTx.signature?.length).toBe(1);
    expect(signedTx.signature?.[0].length).toBe(130);
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
