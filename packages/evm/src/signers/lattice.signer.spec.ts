import type { Msg } from '@xdefi-tech/chains-core';
import fetch from 'cross-fetch';

import { EvmProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { EVM_MANIFESTS } from '../manifests';
import type { ChainMsg, MsgBody } from '../msg';

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
  let provider: EvmProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeAll(async () => {
    signer = await LatticeSigner.create(CONFIG);
    if (!signer.isPaired) {
      throw new Error('Failed to pair with Lattice device');
    }
  });

  beforeEach(async () => {
    provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));
    derivationPath = "m/84'/0'/0'/0/0";

    txInput = {
      from: '0xdfb2682febe6ea96682b1018702958980449b7db',
      to: '0xeffe6e5bbb53625daa6bb04adab4f42f1150c64c',
      chainId: 1,
      amount: 0.001,
      decimals: EVM_MANIFESTS.ethereum.decimals,
      nonce: 0,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from the lattice device', async () => {
    const address = await signer.getAddress(derivationPath);
    expect(address).toBe(txInput.from);
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
