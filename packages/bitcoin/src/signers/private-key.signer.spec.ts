import { Msg } from '@xdefi-tech/chains-core';

import { BitcoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOIN_MANIFEST } from '../manifests';
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
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey = 'KyaowqfYE7mJmTYEpxPJmAXwErQQY6KdDRynbg7SQPTAvC3bLNmF';
    signer = new PrivateKeySigner(privateKey);

    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));

    txInput = {
      from: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      to: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress('')).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should sign a raw transaction using a private key', async () => {
    const txHex =
      '70736274ff0100800200000001a841c88e7ac355b1f4af08ec8b26ca6c9e1cee86b7f1f2d355d75597461a73a80000000000ffffffff0364000000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a530000000000000000066a0474657374ac260000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000000100de01000000000101426c66ff1f3b908caa99e2added93d818408c6df40448262b3fdb3b1ea934a9c0100000000ffffffff0210270000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a53017a1400000000001600148f8c74cae629eb02883b3d70ac030617fd2e1a6602473044022045b7469de22230b35493fab0f2c5ca4ae3ac84c9c14c9530ea40ada7fa9e1f9c02203efa57d574ffd1a816e58f69cd7b05e7ce42c66167378f0eaed90cee8552ebc20121025182c020a60cdf306deb7a9b3eb4ed26656864e7a3969b6e372323b29d0666a30000000001011f10270000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a5300000000';
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
