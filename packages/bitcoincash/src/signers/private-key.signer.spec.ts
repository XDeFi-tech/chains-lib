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

  it('should get an address from the private key', async () => {
    expect(await signer.getAddress()).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toEqual(
      '020000000186339733afada6e9c280ed345dba8c67388066e3a0cd887edbc4c4eff3a43695000000006a473044022052a1db5d9b9c073e310d42e6d6204947275b60e913a56f5b4ea0261e50b9ae3502207159b23f8c123d842912cadaa9762889b801ef674353b05f4883a20a7b68465241210398c7d1ac211564fa1243fa250debac08f822a0e98490ac365d528918b019da1bffffffff0264000000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688acca250000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac00000000'
    );
  });

  it('should sign a raw transaction using a private key', async () => {
    const txHex =
      '020000000186339733afada6e9c280ed345dba8c67388066e3a0cd887edbc4c4eff3a436950000000000ffffffff0264000000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688acca250000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac00000000';
    const signedTx = await signer.signRawTransaction(txHex);

    expect(signedTx).toEqual(
      '02000000000101a841c88e7ac355b1f4af08ec8b26ca6c9e1cee86b7f1f2d355d75597461a73a80000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530000000000000000066a0474657374ac260000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5302483045022100883119b3ba1fccb4ca79d6df974018bba0c838ffc1fbb4abb959e8685a03931002204e40ee30fdb35513f194e55878b79eaa81fde381cc93a0c97f35788ac8f48857012103e389368c5d8bd73599616a574d9b74bf77cb5aee13692e5a3855a7fd2b945f9200000000'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey('')).toEqual(privateKey);
  });
});
