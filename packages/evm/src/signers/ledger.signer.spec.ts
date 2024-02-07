import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { EvmProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { EVM_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LedgerSigner from './ledger.signer';

jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-eth', () => {
  return jest.fn().mockImplementation(() => ({
    signTransaction: jest.fn().mockResolvedValue({
      v: '1',
      r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
      s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
    }),
    getAddress: jest.fn().mockResolvedValue({
      address: '0x62e4f988d231E16c9A666DD9220865934a347900',
      publicKey: 'PUBKEY',
      chainCode: '1',
    }),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: EvmProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));
    derivationPath = "m/44'/60'/0'/0/0";

    txInput = {
      from: '0x62e4f988d231E16c9A666DD9220865934a347900',
      to: '0x62e4f988d231E16c9A666DD9220865934a347900',
      amount: 0.000001,
      nonce: 0,
      chainId: 1,
      decimals: 18,
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
