import { Msg } from '@xdefi-tech/chains-core';

import { SolanaProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { SOLANA_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

jest.mock('../datasource/indexer/queries/fees.query', () => ({
  getFees: jest.fn().mockResolvedValue({
    data: { solana: { fee: '0' } },
  }),
}));

describe('private-key.signer', () => {
  let mnemonic: string;
  let derivation: string;
  let privateKey: string;
  let signer: SeedPhraseSigner;
  let provider: SolanaProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    derivation = "m/44'/501'/0'/0'";
    privateKey =
      '6e108951472eef1f852c2942c1faebced2d4cd2a32fb39df19995ce1de1a82bcd4b6acc6bff757d555c4923f6a22e9095f4fe4d7a7943cf172de493e8d87b3b5';
    signer = new SeedPhraseSigner(mnemonic);

    provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));

    txInput = {
      from: 'FKLzTBCYQgFsczHYT4spPXuNB1as3vYEN5NjjfqhZfdv',
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a private key', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg, derivation);

    expect(message.signedTransaction.toString('hex')).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(privateKey);
  });
});
