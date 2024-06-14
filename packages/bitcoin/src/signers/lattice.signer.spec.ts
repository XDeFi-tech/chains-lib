import { Msg } from '@xdefi-tech/chains-core';
import fetch from 'cross-fetch';

import { BitcoinProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { BITCOIN_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import LatticeSigner from './lattice.signer';
globalThis.fetch = fetch;

/**
 * Update this config to match your Lattice device
 *
 * TODO: Update this to use environment variables
 *
 */
const CONFIG = {
  deviceId: '',
  password: '',
  name: '',
};

describe('lattice.signer', () => {
  let signer: LatticeSigner;
  let derivationPath: string;
  let provider: BitcoinProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeAll(async () => {
    signer = await LatticeSigner.create(CONFIG);
    if (!signer.isPaired) {
      throw new Error('Failed to pair with Lattice device');
    }
  });

  beforeEach(async () => {
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
    derivationPath = "m/84'/0'/0'/0/0";

    txInput = {
      from: 'bc1q7xytdr3syzgs4f29lj8fg68egw2wysltwtlznl',
      to: 'bc1qqqszrzvw3l5437qw66df0779ycuumwhnnf5yqz',
      amount: 0.000001,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the lattice device', async () => {
    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  }, 100000);

  it('should sign a transaction using a lattice device', async () => {
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  }, 100000);

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
