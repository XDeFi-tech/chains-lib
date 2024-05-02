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

jest.mock('../datasource/indexer/queries/scanUTXOs.query', () => ({
  scanUTXOs: () => {
    return [
      {
        oTxHash:
          '9536a4f3efc4c4db7e88cda0e3668038678cba5d34ed80c2e9a6adaf33973386',
        oIndex: 0,
        oTxHex:
          '0100000001a0f1ebe12602a226d5fd7407b5aceece2ad220c9121222cb0e800e97eec27c2a000000006b483045022100fb8e3eee81f80107de496f21635c35e86063947363f735ba30fc28b153f7629102204d899df15b0410c6dbab3149c58c7eceb7a1aec05a6e2b215ebf6a4697a9867541210340b6f9fa321f12bab6dcf264f44e2a644fd1d3cc7512a57ca3d2c99ee3bfa7d4ffffffff0210270000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688accc5d0100000000001976a914e26ef4edfcff06b0ad42ed42efa8af1ee5684b7b88ac00000000',
        address: 'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad',
        scriptHex: '76a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac',
        isCoinbase: null,
        value: {
          value: '10000',
        },
      },
      {
        oTxHash:
          '1f92f48e5a61dfb616b34ebeefb2fce1480b6ecb3e4e8eeeb34fe89ee7a5df2e',
        oIndex: 0,
        oTxHex:
          '0100000001c07daebf83cf9164494c63f26e399d25202c7f2407fd62a5050812feaf8ae461010000006b4830450221009d07e0e1b465d494d73e4deecda2fe3552d75bd28975f0f2c548c1d0e6616f0202205fd9afcb792a78470873fe224e642c86855a1e0d305590cdd5310fb8bd0e7cfb412103712c13f60c49c5211ebec518a17f4648112b4c0b2628a4fd787649002cdbe8b0000000000210270000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688acea910d00000000001976a914f2b1d800f92299c107a366ff4ac62eb70ea597e488ac00000000',
        address: 'qq8s9kmuyl9avm5ef7jlgsnv9x80ygj7scyzcr6vad',
        scriptHex: '76a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac',
        isCoinbase: null,
        value: {
          value: '10000',
        },
      },
    ];
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
      '70736274ff01007e020000000286339733afada6e9c280ed345dba8c67388066e3a0cd887edbc4c4eff3a436950000000000ffffffff2edfa5e79ee84fb3ee8e4e3ecb6e0b48e1fcb2efbe4eb316b6df615a8ef4921f0000000000ffffffff0101000000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac00000000000100e20100000001a0f1ebe12602a226d5fd7407b5aceece2ad220c9121222cb0e800e97eec27c2a000000006b483045022100fb8e3eee81f80107de496f21635c35e86063947363f735ba30fc28b153f7629102204d899df15b0410c6dbab3149c58c7eceb7a1aec05a6e2b215ebf6a4697a9867541210340b6f9fa321f12bab6dcf264f44e2a644fd1d3cc7512a57ca3d2c99ee3bfa7d4ffffffff0210270000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688accc5d0100000000001976a914e26ef4edfcff06b0ad42ed42efa8af1ee5684b7b88ac00000000000100e20100000001c07daebf83cf9164494c63f26e399d25202c7f2407fd62a5050812feaf8ae461010000006b4830450221009d07e0e1b465d494d73e4deecda2fe3552d75bd28975f0f2c548c1d0e6616f0202205fd9afcb792a78470873fe224e642c86855a1e0d305590cdd5310fb8bd0e7cfb412103712c13f60c49c5211ebec518a17f4648112b4c0b2628a4fd787649002cdbe8b0000000000210270000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688acea910d00000000001976a914f2b1d800f92299c107a366ff4ac62eb70ea597e488ac000000000000';
    const signedTx = await signer.signRawTransaction(txHex);

    expect(signedTx).toEqual(
      '020000000286339733afada6e9c280ed345dba8c67388066e3a0cd887edbc4c4eff3a43695000000006b483045022100ba78402d80d3c5304ea933812e13b4ebf576032fc6bd6332d82a14020904708202203d6356a15222440b65390ec298a6b716188c33d2df23af89755ab652338b2f4901210398c7d1ac211564fa1243fa250debac08f822a0e98490ac365d528918b019da1bffffffff2edfa5e79ee84fb3ee8e4e3ecb6e0b48e1fcb2efbe4eb316b6df615a8ef4921f000000006b483045022100aa0aeb88fb072938e59855c247a9ec8a13fde940f767de605e26a5e3e508598302200730b3a722e448765f2a97da5e49772cd40d7cd1b39c511bf403c19b7e84413201210398c7d1ac211564fa1243fa250debac08f822a0e98490ac365d528918b019da1bffffffff0101000000000000001976a9140f02db7c27cbd66e994fa5f4426c298ef2225e8688ac00000000'
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
