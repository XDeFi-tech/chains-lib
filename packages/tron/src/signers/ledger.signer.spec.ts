import { Msg } from '@ctrl-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { TronProvider } from '../chain.provider';
import { ChainDataSource } from '../datasource';
import { TRON_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-trx', () => {
  return jest.fn().mockImplementation(() => ({
    getAddress: jest.fn().mockResolvedValue({
      address: 'TSDmgg8m3AfNniTzz4dyWN44fkGd7otZ4C',
    }),
    signTransaction: jest.fn().mockResolvedValue('SIGNEDTX'),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: TronProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new TronProvider(new ChainDataSource(TRON_MANIFEST));
    derivationPath = "m/44'/195'/0'/0/0";

    txInput = {
      from: 'TSDmgg8m3AfNniTzz4dyWN44fkGd7otZ4C',
      to: 'TN4JsVEuLVBG9Ru7YSjDxkTdoRTychnJkH',
      amount: '0.000001',
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
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should return true for a valid address', () => {
    expect(signer.verifyAddress(txInput.from, TRON_MANIFEST)).toBe(true);
  });

  it('should return false for an invalid address', () => {
    expect(signer.verifyAddress('invalid-address', TRON_MANIFEST)).toBe(false);
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});
