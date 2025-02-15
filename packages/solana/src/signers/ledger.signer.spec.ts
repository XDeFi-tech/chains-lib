import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import {
  Connection,
  VersionedTransaction,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';

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
  let message: ChainMsg;
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
    const versionedTransactionMock = jest
      .spyOn(VersionedTransaction.prototype, 'serialize')
      .mockResolvedValue(new Uint8Array(0) as never);
    const solanaTransactionMock = jest
      .spyOn(SolanaTransaction.prototype, 'serialize')
      .mockResolvedValue(Buffer.from('mockTransaction') as never);
    jest.spyOn(Connection.prototype, 'getLatestBlockhash').mockResolvedValue({
      blockhash: 'FxSFe5PnHuQZLiVf1h4AnzAmPBoQe5QfuviwvzbtheBe',
      lastValidBlockHeight: 272094550,
    });

    await signer.sign(message, "44'/501'/0'");

    versionedTransactionMock.mockRestore();
    solanaTransactionMock.mockRestore();
    expect(message.signedTransaction.sig).toBe(
      '2wiGcgsNdq2qHMHrLpsjf7PJz9PqndHSE6kCyZjMTo45ZzhmT95GLXYLWmsCT6mF8vGubdBdUnsL9yfHNuH8HNfB'
    );
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });

  it('should sign a message using a ledger device', async () => {
    const message = provider.createMsg({
      ...txInput,
      data: 'Hello, world!',
    });
    expect(signer.signMessage(message, derivationPath)).rejects.toThrowError();
  });
});
