import { Msg } from '@xdefi-tech/chains-core';

import { BitcoinCashProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOINCASH_MANIFEST } from '../manifests';
import { MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-btc', () => {
  return jest.fn().mockImplementation(() => ({
    signMessage: jest.fn().mockResolvedValue({
      v: 1,
      r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
      s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
    }),
    getWalletPublicKey: jest.fn().mockResolvedValue({
      bitcoinAddress: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      publicKey: 'PUBKEY',
      chainCode: 'code',
    }),
  }));
});

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: BitcoinCashProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    signer = new LedgerSigner();

    provider = new BitcoinCashProvider(
      new IndexerDataSource(BITCOINCASH_MANIFEST)
    );
    derivationPath = "m/44'/145'/0'/0/0";

    txInput = {
      from: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      to: 'bitcoincash:qpauz5p7js7efhxtcy780lwra7qhvswqwvstca7ffu',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});
