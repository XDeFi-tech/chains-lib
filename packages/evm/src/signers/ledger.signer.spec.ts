import { Msg } from '@xdefi-tech/chains-core';
import Transport from '@ledgerhq/hw-transport-webhid';

import { EvmProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { EVM_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody, EIP712Data, Signature } from '../msg';

import LedgerSigner from './ledger.signer';

jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  create: jest.fn().mockResolvedValue({
    close: jest.fn().mockImplementation(),
  }),
}));

jest.mock('@ledgerhq/hw-app-eth', () => {
  return jest.fn().mockImplementation(() => ({
    signTransaction: jest.fn().mockResolvedValue({
      v: '1',
      r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
      s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
    }),
    getAddress: jest.fn().mockResolvedValue({
      address: '0x62e4f988d231E16c9A666DD9220865934a347900',
      publicKey: 'PUBKEY',
      chainCode: '1',
    }),
    signEIP712Message: jest.fn().mockResolvedValue({
      v: '1',
      r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
      s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
    }),
  }));
});

describe('ledger.signer', () => {
  let signer: LedgerSigner;
  let derivationPath: string;
  let provider: EvmProvider;
  let txInput: MsgBody;
  let message: Msg;
  let externalTransport: any;

  beforeEach(async () => {
    externalTransport = await Transport.create();
    signer = new LedgerSigner(externalTransport);

    provider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));
    derivationPath = "m/44'/60'/0'/0/0";

    txInput = {
      from: '0x62e4f988d231E16c9A666DD9220865934a347900',
      to: '0x62e4f988d231E16c9A666DD9220865934a347900',
      amount: 0.000001,
      nonce: 0,
      chainId: 1,
      decimals: 18,
    };

    message = provider.createMsg(txInput);
  });

  afterEach(() => {
    externalTransport.close();
  });

  it('should get an address from the ledger device', async () => {
    expect(await signer.getAddress(derivationPath)).toBe(txInput.from);
  });

  it('should sign a transaction using a ledger device', async () => {
    await signer.sign(message as ChainMsg, derivationPath);
    expect(message.signedTransaction).toBeTruthy();
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should fail if private key is requested', async () => {
    expect(signer.getPrivateKey(derivationPath)).rejects.toThrowError();
  });

  it('should get a public key from the ledger device', async () => {
    expect(await signer.getPublicKey(derivationPath)).toBe('PUBKEY');
  });

  it('should get recover signers address from the signature', async () => {
    const signature =
      '0x41d9578d76d6460e125a783418c644de2663e585d59f507e7a86697a58d9bba24307fdad5f9647dba44b5ed5ac54741b3959fb8838c8a2b33afaa88d8d8c15571b';
    const message = 'test';
    const address = '0xFD7dD7e26593227A23BAFA6560c3B8C0b9DE952b';

    const recoveredAddress = await signer.recover(signature, message);

    expect(recoveredAddress).toBe(address);
  });

  it('should get recover signers publicKey from the signature', async () => {
    const signature =
      '0x41d9578d76d6460e125a783418c644de2663e585d59f507e7a86697a58d9bba24307fdad5f9647dba44b5ed5ac54741b3959fb8838c8a2b33afaa88d8d8c15571b';
    const message = 'test';
    const publicKey =
      '43816f07212517ee8f38757fc2d576109f688a371ba839e158dae9b02f1ce5556420f1b3166c776b235fd308aa7293fe86bb1276f8cca2d23111df273160fa34';

    const recoveredPubKey = await signer.recoverPublicKey(signature, message);

    expect(recoveredPubKey).toBe(publicKey);
  });

  it('should return ledger signature', async () => {
    const eip712Data = {
      domain: {
        name: 'MyDApp',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      },
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Transfer: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
        ],
      },
      primaryType: 'Transfer',
      message: {
        from: '0x62e4f988d231E16c9A666DD9220865934a347900',
        to: '0x62e4f988d231E16c9A666DD9220865934a347900',
        amount: 0.000001,
        nonce: 0,
      },
    } as EIP712Data;

    const signature = await signer.signTypedData(
      derivationPath,
      eip712Data.domain,
      eip712Data.types,
      eip712Data.primaryType,
      eip712Data.message
    );

    const { v, r, s } = signature as Signature;

    expect(signature).not.toBeNull();
    expect(v).toBe('1');
    expect(r).toBe(
      '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c'
    );
    expect(s).toBe(
      '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421'
    );
  });
});
