import { DataSource } from '@xdefi-tech/chains-core';

import { DashProvider } from '../chain.provider';
import { DASH_MANIFEST } from '../manifests';
import { ChainDataSource } from '../datasource';

import PrivateKeySigner from './private-key.signer';

describe('private-key.signer', () => {
  let dataSource: DataSource;
  let provider: DashProvider;

  beforeEach(() => {
    dataSource = new ChainDataSource(DASH_MANIFEST);
    provider = new DashProvider(dataSource);
  });

  it('should get an signer address', async () => {
    const privateKey = 'XD35gVQnXRLWwgBsB7bwF6bA1fJPKSrqWWCN4shEJe8Za3KAuz7U';
    const signer = new PrivateKeySigner(privateKey);
    const txInput = {
      to: 'XwDYpEb4BJqQErYYyfE2osTBwhiZ8mCwEV',
      from: 'XwDYpEb4BJqQErYYyfE2osTBwhiZ8mCwEV',
      amount: 0.00001,
    };

    expect(await signer.getAddress()).toBe(txInput.from);
  });

  it('should build a tx', async () => {
    const message = provider.createMsg({
      to: 'Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB',
      from: 'Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB',
      amount: 0.0001,
    });
    const tx = await message.buildTx();

    expect(tx.to).toEqual('Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB');
    expect(tx.from).toEqual('Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB');
  });

  it('should sign a transaction using a private key', async () => {
    const message = provider.createMsg({
      to: 'Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB',
      from: 'Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB',
      amount: 0.0001,
    });

    const privateKey = 'XGrBXdUSLf5i7XNCzFaKXybDUbEjG9N2UZUxMVENoksbJaVk5njb';
    const signer = new PrivateKeySigner(privateKey);

    await signer.sign(message);
  });

  it('should return false when verifing an invalid address', async () => {
    const privateKey = 'XGrBXdUSLf5i7XNCzFaKXybDUbEjG9N2UZUxMVENoksbJaVk5njb';
    const signer = new PrivateKeySigner(privateKey);
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    const privateKey = 'XGrBXdUSLf5i7XNCzFaKXybDUbEjG9N2UZUxMVENoksbJaVk5njb';
    const signer = new PrivateKeySigner(privateKey);
    expect(signer.verifyAddress('Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB')).toBe(
      true
    );
    expect(
      signer.verifyAddress('Xan1DgL9LeJrUpzwhf9so6B4oDyuLxgZNB' + 'deadbeef')
    ).toBe(false);
  });

  it('should get a private key', async () => {
    const privateKey = 'XGrBXdUSLf5i7XNCzFaKXybDUbEjG9N2UZUxMVENoksbJaVk5njb';
    const signer = new PrivateKeySigner(privateKey);
    expect(await signer.getPrivateKey('')).toEqual(privateKey);
  });
});
