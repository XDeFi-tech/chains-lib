import { Msg } from '@xdefi-tech/chains-core';

import { LitecoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { LITECOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import PrivateKeySigner from './private-key.signer';

jest.mock('../datasource/indexer/queries/balances.query', () => ({
  getBalance: () => {
    return [
      {
        address: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: {
          value: '10000',
        },
        asset: {
          chain: 'Litecoin',
          contract: null,
          id: 'f8e964b8-2df8-4039-8e6d-013e84dc8d07',
          name: 'Litecoin',
          symbol: 'LTC',
          image:
            'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1547033580',
          decimals: 8,
          price: {
            amount: '84.87',
          },
          type: 'CRYPTOCURRENCY',
        },
      },
    ];
  },
}));

jest.mock('../datasource/indexer/queries/scanUTXOs.query', () => ({
  scanUTXOs: () => {
    return [
      {
        oTxHash:
          '5cc379664490e345eefca7ef175b508e09fdcc5de3b02b8aaa3def8ea3667046',
        oIndex: 0,
        oTxHex:
          '01000000000101d0d9c64c11421818826f99f2473d7f9ea7700e74f3de9f58374de5b88c875fa20100000000ffffffff0210270000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4591a000000000000160014fb5b0cc58e40545c6f5ccec1812f9bc5c045bf8302473044022045ba68cdecd37123f231bee88d7d598db2e12a8eb036889a9c120d7836535f2402206aa2ba42a8e60a08d349567880100cacefffcd3c72afad3a960fa236b91ce46f01210373c7587220a281fee5014c4a0ce300a69f17fdf4edf10daf0a5a3cc233e972ab00000000',
        address: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        scriptHex: '00145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4',
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
  let provider: LitecoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey = 'T4gbj9QbHwmYkUMS5edgsjN8e1aYvh19d9jWAMeXQMUBZh9mNJwM';
    signer = new PrivateKeySigner(privateKey);

    provider = new LitecoinProvider(new IndexerDataSource(LITECOIN_MANIFEST), {
      apiKey: process.env.BLOCKCHAIR_API_KEY,
    });

    txInput = {
      from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a private key', async () => {
    expect(await signer.getAddress()).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toEqual(
      '02000000000101467066a38eef3daa8a2bb0e35dccfd098e505b17efa7fcee45e390446679c35c0000000000ffffffff0264000000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4ca250000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca40248304502210095104f03cf04aa7e9f8516b9280dc30ad091f7a1aafb49e9e1bdd8c4513701f2022039e449e17cc4613128b320b15c6a7f2937158f0fa6b6714f8472c6f035d977c00121026d165716c33a95fbbed7c3bdfc155afc43dce53eacf059fc65aa6092f8625ad800000000'
    );
  });

  it('should sign a raw transaction using a private key', async () => {
    const txHex =
      '70736274ff0100710200000001467066a38eef3daa8a2bb0e35dccfd098e505b17efa7fcee45e390446679c35c0000000000ffffffff0264000000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4ca250000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4000000000001011f10270000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4000000';
    const signedTx = await signer.signRawTransaction(txHex);

    expect(signedTx).toEqual(
      '02000000000101467066a38eef3daa8a2bb0e35dccfd098e505b17efa7fcee45e390446679c35c0000000000ffffffff0264000000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca4ca250000000000001600145c62b57d49ea96f0ff6a8473c3332ec3fc501ca40248304502210095104f03cf04aa7e9f8516b9280dc30ad091f7a1aafb49e9e1bdd8c4513701f2022039e449e17cc4613128b320b15c6a7f2937158f0fa6b6714f8472c6f035d977c00121026d165716c33a95fbbed7c3bdfc155afc43dce53eacf059fc65aa6092f8625ad800000000'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey()).toEqual(privateKey);
  });
});
