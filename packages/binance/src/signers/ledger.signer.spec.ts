import Transport from '@ledgerhq/hw-transport-webhid';

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
        '04746c1a7b821f3e34d1936b515de9b6d96a01ac868f0159163275005f7872d97f2ad44dbad5c539f0d6e2a942fa238b0f1c58ec8b9263e6e8f5d74102ed9a7c19',
        'hex'
      ),
    }),
    getPublicKey: jest.fn().mockResolvedValue({
      pk: Buffer.from(
        // bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k
        '04746c1a7b821f3e34d1936b515de9b6d96a01ac868f0159163275005f7872d97f2ad44dbad5c539f0d6e2a942fa238b0f1c58ec8b9263e6e8f5d74102ed9a7c19',
        'hex'
      ),
    }),
    showAddress: jest.fn().mockResolvedValue({}),
  }));
});

describe('binance::ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: BinanceProvider;
  let txInput: MsgBody;
  let message: ChainMsg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new BinanceProvider(new IndexerDataSource(BINANCE_MANIFEST));
    derivationPath = "m/44'/714'/0'/0/0";

    txInput = {
      from: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      to: 'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
      amount: 0.000001,
      denom: 'bnb',
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
    await signer.sign(message, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });

  it('should return FeeEstimation', async () => {
    const feeEstimation = await message.getFee();
    expect(feeEstimation);
  });
});
