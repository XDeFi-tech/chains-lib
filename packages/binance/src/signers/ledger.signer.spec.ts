import { Msg } from '@xdefi-tech/chains-core';

import { BinanceProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BINANCE_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@binance-chain/javascript-sdk/lib/ledger/ledger-app', () => {
  return jest.fn().mockImplementation(() => ({
    sign: jest.fn().mockResolvedValue({
      signature: Buffer.from(
        '9a0ec4778a533891fae6ef51386f9598d8f01cb6bdbfc7c3ff914f8f63a6d0dafcb766221cdaeb4c07776f94a1fb1ba61c8f542e35ac00d50e1be6546eef5b03',
        'hex'
      ),
    }),
    getPublicKey: jest.fn().mockResolvedValue({
      pk: Buffer.from(
        // bnb1f7n56etujwkmywda9k62t0ecky6twwvn0l7awy
        '04ac5075afd72637cbf5913994b51f4aa508a31cd96f8580d50c29a4bc585f6174c628640d13e54ab41b911f2b1cc61fbd2e40bbb8e543c8d01ea84e7e6a484418',
        'hex'
      ),
    }),
    showAddress: jest.fn().mockResolvedValue({}),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: BinanceProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    signer = new LedgerSigner();

    provider = new BinanceProvider(new IndexerDataSource(BINANCE_MANIFEST));
    derivationPath = "m/44'/714'/0'/0/0";

    txInput = {
      from: 'bnb1f7n56etujwkmywda9k62t0ecky6twwvn0l7awy',
      to: 'bnb1f7n56etujwkmywda9k62t0ecky6twwvn0l7awy',
      amount: 0.000001,
      denom: 'bnb',
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
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
