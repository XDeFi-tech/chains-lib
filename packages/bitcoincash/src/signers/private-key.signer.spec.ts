import { Msg } from '@xdefi-tech/chains-core';

import { BitcoinCashProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOINCASH_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import PrivateKeySigner from './private-key.signer';

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [];
  },
}));

describe('private-key.signer', () => {
  let privateKey: string;
  let signer: PrivateKeySigner;
  let provider: BitcoinCashProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey = 'Kz1YMmxrFVd2uyCnEHT546Bjw3Wime47AoTQeYATUCSsuirJczu5';
    signer = new PrivateKeySigner(privateKey);

    provider = new BitcoinCashProvider(
      new IndexerDataSource(BITCOINCASH_MANIFEST)
    );

    txInput = {
      from: 'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad',
      to: 'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress()).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toEqual(
      '020000000186339733afada6e9c280ed345dba8c67388066e3a0cd887edbc4c4eff3a43695000000006b483045022100ae50350ea293b625f3ec1b151da79ac8d8345ed833721477887f16aea7e0ccca02200e8bd47761d6c2fed22f8bbd797a783fa4d69176fdaffcfb4b7e3d7531b762f301210398c7d1ac211564fa1243fa250debac08f822a0e98490ac365d528918b019da1bffffffff0264000000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688acca250000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac00000000'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey('')).toEqual(
      '53407513001a7258fd3d7fefa6e71ade5af9d9001d04898667ddeb8370161009'
    );
  });
});
