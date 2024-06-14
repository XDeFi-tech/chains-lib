import { IndexerDataSource } from '../datasource';
import { TronProvider } from '../chain.provider';
import { TRON_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody, TokenType } from '../msg';

import { PrivateKeySigner } from './private-key.signer';

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
    const msg = new ChainMsg({
      to: txInput.to,
      from: txInput.from,
      amount: txInput.amount,
      provider: provider,
    });
    await signer.sign(msg);
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
    await expect(signer.sign(msg)).rejects.toThrow(
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
    await signer.sign(msg);
    expect((msg.signedTransaction as any).txID.length).toBe(64);
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
    await signer.sign(msg);
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
    await expect(signer.sign(msg)).rejects.toThrow(
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
    await expect(signer.sign(msg)).rejects.toThrow(
      'TRC20 Contract Address not provided'
    );
  });
});
