import { Msg } from '@xdefi-tech/chains-core';
import { EthereumSignedTx, Success } from '@trezor/connect-web';

import { EvmProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { EVM_MANIFESTS } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import TrezorSigner from './trezor.signer';
jest.mock('@trezor/connect-web', () => ({
  init: jest.fn().mockImplementation(),
  ethereumSignTransaction: jest.fn().mockImplementation(() => {
    const txResponse: Success<EthereumSignedTx> = {
      success: true,
      payload: {
        v: '1',
        r: '0x2284d1273433b82201150965837d843b4978d50a26f1a93be3ee686c7f36ee6c',
        s: '0x40aafc22ba5cb3d5147e953af0acf45d768d8976dd61d8917118814302680421',
      },
    };

    return txResponse;
  }),
}));

describe('trezor.signer', () => {
  let signer: TrezorSigner;
  let derivationPath: string;
  let provider: EvmProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    signer = new TrezorSigner();

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

  it('should sign a transaction using a trezor device', async () => {
    await signer.initTrezor('test@test.com', 'localhost');
    await signer.sign(message as ChainMsg, derivationPath);

    expect(message.signedTransaction).toBeTruthy();
  });

  it('should fail if trezor device is not initialized', async () => {
    expect(
      signer.sign(message as ChainMsg, derivationPath)
    ).rejects.toThrowError();
  });
});
