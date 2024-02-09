import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { BitcoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';
jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-btc', () => {
  return jest.fn().mockImplementation(() => ({
    splitTransaction: jest.fn().mockReturnValue({}),
    createPaymentTransaction: jest.fn().mockResolvedValue('SIGNEDTX'),
    getWalletPublicKey: jest.fn().mockResolvedValue({
      bitcoinAddress: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
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
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
    derivationPath = "m/84'/0'/0'/0/0";

    txInput = {
      from: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      amount: 0.000001,
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

    expect(message.signedTransaction).toEqual('SIGNEDTX');
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
