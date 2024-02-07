import { Msg } from '@xdefi-tech/chains-core';
import { Transaction } from '@solana/web3.js';
import Transport from '@ledgerhq/hw-transport-webhid';

import { SolanaProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { SOLANA_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-solana', () => {
  return jest.fn().mockImplementation(() => ({
    signTransaction: jest.fn().mockResolvedValue({
      signature: Buffer.from(
        '9a0ec4778a533891fae6ef51386f9598d8f01cb6bdbfc7c3ff914f8f63a6d0dafcb766221cdaeb4c07776f94a1fb1ba61c8f542e35ac00d50e1be6546eef5b03',
        'hex'
      ),
    }),
    getAddress: jest.fn().mockResolvedValue({
      address: Buffer.from(
        // 7HZYYfdqQgDgNduLA5gh8y4A5Mr3rCLVWeXBF4Vg9qZZ
        '5d643645e1fffa03e7f6bb896475765731daf04ae745909c543f7ad036cd0210',
        'hex'
      ),
    }),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let signerWithExternalTransport: LedgerSigner;
  let derivationPath: string;
  let provider: SolanaProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signerWithExternalTransport = new LedgerSigner(externalTransport);

    signer = new LedgerSigner();

    provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    derivationPath = "m/44'/60'/0'/0/0";

    txInput = {
      from: '7HZYYfdqQgDgNduLA5gh8y4A5Mr3rCLVWeXBF4Vg9qZZ',
      to: '7HZYYfdqQgDgNduLA5gh8y4A5Mr3rCLVWeXBF4Vg9qZZ',
      amount: 0.000001,
      gasPrice: 100,
    };

    message = provider.createMsg(txInput);
  });

  afterEach(() => {
    externalTransport.close();
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    jest
      .spyOn(Transaction.prototype, 'serialize')
      .mockImplementation(() => Buffer.from('0xDEADBEEF', 'hex'));
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should sign a transaction using a ledger device and external transport', async () => {
    jest
      .spyOn(Transaction.prototype, 'serialize')
      .mockImplementation(() => Buffer.from('0xDEADBEEF', 'hex'));
    await signerWithExternalTransport.sign(message as ChainMsg, derivationPath);

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
