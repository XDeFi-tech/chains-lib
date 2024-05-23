import { Msg, GasFeeSpeed } from '@xdefi-tech/chains-core';

import { BinanceProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BINANCE_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import PrivateKeySigner from './private-key.signer';

jest.mock('../datasource/indexer/queries/fees.query', () => ({
  getFees: jest.fn().mockResolvedValue({
    data: { solana: { fee: '0' } },
  }),
}));

describe('private-key.signer', () => {
  let privateKey: string;
  let signer: PrivateKeySigner;
  let provider: BinanceProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey =
      '0c72be62d9433a853a7bdbf0455a69ded80669f7a7e9ce05d12e02adf353cf51';
    signer = new PrivateKeySigner(privateKey);

    provider = new BinanceProvider(new IndexerDataSource(BINANCE_MANIFEST));

    txInput = {
      from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      amount: 0.000001,
      denom: 'bnb',
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a private key', async () => {
    expect(await signer.getAddress()).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction.toString('hex')).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey('')).toEqual(privateKey);
  });

  it('should return FeeEstimation', async () => {
    const feeEstimation = await message.getFee(GasFeeSpeed.medium);
    expect(feeEstimation);
  });
});
