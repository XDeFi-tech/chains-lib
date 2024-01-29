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

describe('seed-phrase.signer', () => {
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
      '22d58eee867e660f58cd4e6699eaeb058a613c5fb1c738e6de5fe02d7839eafba3c563b0519a293f7323680e09a6a3b4bb9a451ed3eaaf7067cc38505563f3c6';
    signer = new SeedPhraseSigner(mnemonic);

    provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));

    txInput = {
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
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
