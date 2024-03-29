import { Msg } from '@xdefi-tech/chains-core';
import { BlockchairDataProvider } from '@xdefi-tech/chains-utxo';
import * as btc from '@scure/btc-signer';

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

jest.mock('coinselect/accumulative', () => ({
  __esModule: true,
  default: () => ({ inputs: [{ value: 1000 }], outputs: [{ value: 100 }] }),
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
          hash: 'hash1',
          value: 10000,
          index: 0,
          witnessUtxo: {
            value: 10000,
            script: Buffer.from('0x0', 'hex'),
          },
          txHex: 'raw_transaction',
        },
      ]);

    jest.spyOn(btc.Transaction.prototype, 'sign').mockReturnValue(0);
    jest.spyOn(btc.Transaction.prototype, 'finalize').mockReturnValue();
    jest
      .spyOn(btc.Transaction.prototype, 'hex', 'get')
      .mockReturnValue('signedtx');
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

    expect(message.signedTransaction).toEqual('signedtx');
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
