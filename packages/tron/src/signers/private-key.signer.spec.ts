import TronWeb from 'tronweb';

import { IndexerDataSource } from '../datasource';
import { TronProvider } from '../chain.provider';
import { TRON_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody, TokenType } from '../msg';

import { PrivateKeySigner } from './private-key.signer';

jest.mock('../msg.ts', () => {
  const orignalModule = jest.requireActual('../msg.ts');

  return {
    __esModule: true,
    ...orignalModule,
  };
});

describe('tron private-key.signer', () => {
  let signer: PrivateKeySigner;
  let txInput: MsgBody;
  let privateKey: string;
  let provider: TronProvider;

  beforeEach(() => {
    privateKey =
      '9e30f488d7079ddcba9f012506d5dda99df9eba6e8d98aaab69e2c4ac1c6f656';

    txInput = {
      from: 'TJrf5jjCXsc19sQHb6GWBmzT1rbJivmR52',
      to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
      decimals: 18,
      tokenId: '10',
      contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      amount: '0.00001',
    };

    signer = new PrivateKeySigner(privateKey, TRON_MANIFEST);
    provider = new TronProvider(new IndexerDataSource(TRON_MANIFEST));
  });

  it('should return the correct address for a valid private key', async () => {
    const address = await signer.getAddress();
    expect(address).toBe(txInput.from);
  });

  it('should sign a ChainMsg with the private key', async () => {
    const msg = provider.createMsg({
      to: txInput.to,
      from: txInput.from,
      amount: txInput.amount,
      provider: provider,
    });
    await signer.sign(msg);
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
    await expect(signer.sign(msg)).rejects.toThrow(
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
    await signer.sign(msg);
    expect((msg.signedTransaction as any).txID.length).toBe(64);
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
    await signer.sign(msg);
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
    await expect(signer.sign(msg)).rejects.toThrow(
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
    await expect(signer.sign(msg)).rejects.toThrow(
      'TRC20 Contract Address not provided'
    );
  });

  it('should signMessage a TRC20 TX with the private key', async () => {
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
        '0a0208c52208620b55abd6d1dfaf40e884cab792325aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541617bfdc9fad81202ec6de6d57e2555a415f675d1121541a614f803b6fd780986a42c78ec9c7f77e6ded13c2244a9059cbb00000000000000000000000084987d218c5ae2027c419e52c95791e453493821000000000000000000000000000000000000000000000000000000e8d4a5100070b5ccc6b79232900180a3c347',
    });
    const { raw_data_hex } = await msg.buildTx();
    const signature = await signer.signMessage(raw_data_hex, true, true);

    expect(signature.length).toBe(132);
  });

  it('should signMessageV2 a TRC20 TX with the private key', async () => {
    const message = 'Hello world!';
    const signature = await signer.signMessageV2(message);

    expect(signature.length).toBe(132);
  });

  it('should signTransaction a TRC20 TX with the private key', async () => {
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
    const signature = await signer.signTransaction(raw_data_hex, true, true);

    expect(signature.length).toBe(132);
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
    const signedTx = await signer.multiSignTransaction(transaction, 0);
    expect(signedTx.signature).toBeDefined();
    expect(signedTx.signature?.length).toBe(1);
    expect(signedTx.signature?.[0].length).toBe(130);
  });
});
