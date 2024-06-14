import { Msg } from '@xdefi-tech/chains-core';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { Connection } from '@solana/web3.js';

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
        '6132ba1ca152cf3fdf70bc76ac49f3c0fe7468f24e7d051ba11ebf2b8c4e30a14c97623fa089924f9320026cabfc412f242bc0db8e405d9c7ea6e608f8d4120a',
        'hex'
      ),
    }),
    getAddress: jest.fn().mockResolvedValue({
      address: Buffer.from(
        // 2Ws339t6ng6WKqjLPVC2gnid9ZfvjYaKGnVi5pNJLn8i
        '16821af3d7d203354d558ce9f6828ce040fe388541c1b7cdadc9dcd03bda42fb',
        'hex'
      ),
    }),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: SolanaProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await TransportWebHID.create();
    signer = new LedgerSigner(externalTransport);

    provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));
    derivationPath = "m/44'/60'/0'/0/0";

    txInput = {
      from: '2Ws339t6ng6WKqjLPVC2gnid9ZfvjYaKGnVi5pNJLn8i',
      to: 'BujFXMX9ZmniuJCM2VRKQqe1enmcoFxfUBmRqCMqKGic',
      amount: 0.01,
      gasPrice: 2500,
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
    jest.spyOn(Connection.prototype, 'getRecentBlockhash').mockResolvedValue({
      blockhash: 'FxSFe5PnHuQZLiVf1h4AnzAmPBoQe5QfuviwvzbtheBe',
      feeCalculator: { lamportsPerSignature: 5000 },
    });

    await signer.sign(message as ChainMsg, "44'/501'/0'");

    expect(message.signedTransaction.toString('hex')).toBe(
      '016132ba1ca152cf3fdf70bc76ac49f3c0fe7468f24e7d051ba11ebf2b8c4e30a14c97623fa089924f9320026cabfc412f242bc0db8e405d9c7ea6e608f8d4120a0100010316821af3d7d203354d558ce9f6828ce040fe388541c1b7cdadc9dcd03bda42fba216d8118c45c50f08f511fcbffa02d9e23f670c8765b135be2d58ef49bb95990000000000000000000000000000000000000000000000000000000000000000de371d4c7efe41c73e69650c01ee6f845716e0578dcbb8cc6760f31cfab73d0d01020200010c020000008096980000000000'
    );
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });
});
