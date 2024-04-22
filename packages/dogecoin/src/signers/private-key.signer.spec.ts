import { Msg } from '@xdefi-tech/chains-core';
import { BlockchairDataProvider } from '@xdefi-tech/chains-utxo';

import { DogecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { DOGECOIN_MANIFEST } from '../manifests';
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
  let provider: DogecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeAll(() => {
    jest
      .spyOn(BlockchairDataProvider.prototype, 'scanUTXOs')
      .mockResolvedValue([
        {
          hash: '16120787df8f4bf06c422fe362eabd48d0ef2383e567d624f748cd40f9882cad',
          value: 10000000,
          index: 0,
          witnessUtxo: {
            value: 10000000,
            script: Buffer.from([
              118, 169, 20, 198, 2, 220, 48, 138, 169, 74, 205, 117, 83, 119,
              87, 238, 202, 121, 29, 169, 87, 228, 241, 136, 172,
            ]),
          },
          txHex:
            '010000000102a95e8c5a5ebefa6431867f1e1691e5dd9cad10b2d1e8efce9b15c48c86f68d000000006b483045022100f21d3cac7d1332fdea2b33b8dd9859743b923dfa42431b49512d8dbb81acce5702204d2a009e45657147acf1b23204bc01a0d338e86c8cad458a394d933e2b3f24f20121031db6a1e76aad4f63aaea779d05a15a5619749a808c8d5b6856ae449b503e1d58ffffffff0280969800000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac700c4c05000000001976a91447542a50d8d84ed278690657e36bdda110f0181688ac00000000',
        },
      ]);
  });

  beforeEach(() => {
    privateKey = 'QSyxzBP6nd6bUCqNE11fNBK4MTB7BVPvLMJy6NuveCSUUhACNHSH';
    signer = new PrivateKeySigner(privateKey);

    provider = new DogecoinProvider(new IndexerDataSource(DOGECOIN_MANIFEST), {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });

    txInput = {
      from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get an address from the private key', async () => {
    expect(await signer.getAddress('')).toBe(txInput.from);
  });

  it('should sign a transaction using the private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toEqual(
      '0200000001ad2c88f940cd48f724d667e58323efd048bdea62e32f426cf04b8fdf87071216000000006a473044022068b491ee366b00d7ee0643111977b4f9d69d280446e4672c25f91e137f82ca5702205ce414f90daa6cb99f79ad80db6b2fb6cc700dcb74594e57b4f87b72d60260bf0121037e6c9ff86d24858e73a75d08d1c4270cf3aa56d421e362eacdd063e264e5b12cffffffff0164000000000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac00000000'
    );
  });

  it('should sign a raw transaction using a private key', async () => {
    const txHex =
      '70736274ff0100550200000001ad2c88f940cd48f724d667e58323efd048bdea62e32f426cf04b8fdf870712160000000000ffffffff0101000000000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac00000000000100e2010000000102a95e8c5a5ebefa6431867f1e1691e5dd9cad10b2d1e8efce9b15c48c86f68d000000006b483045022100f21d3cac7d1332fdea2b33b8dd9859743b923dfa42431b49512d8dbb81acce5702204d2a009e45657147acf1b23204bc01a0d338e86c8cad458a394d933e2b3f24f20121031db6a1e76aad4f63aaea779d05a15a5619749a808c8d5b6856ae449b503e1d58ffffffff0280969800000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac700c4c05000000001976a91447542a50d8d84ed278690657e36bdda110f0181688ac000000000000';
    const signedTx = await signer.signRawTransaction(txHex);

    expect(signedTx).toEqual(
      '0200000001ad2c88f940cd48f724d667e58323efd048bdea62e32f426cf04b8fdf87071216000000006b483045022100e25a44edc01cc1b9b90ad1cb62553b4dd56f8e6e0d3eb227c21fdb7fa8d8e03402204c4e2c366831d8f7403822dbf6e69d8713671e456b4181afd427b68a8947eeaf0121037e6c9ff86d24858e73a75d08d1c4270cf3aa56d421e362eacdd063e264e5b12cffffffff0101000000000000001976a914c602dc308aa94acd75537757eeca791da957e4f188ac00000000'
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
