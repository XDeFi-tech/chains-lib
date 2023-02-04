import { DiContainer } from 'common/di';
import * as Chain from 'core/chain';
import { Coin } from 'core/coin';
import { Msg } from 'core/msg';
import * as Signer from 'core/signer';
import { Transaction } from 'core/transaction';
import { getChainsBySigner } from 'core/chain/helpers';
import { SignerDecorator, ChainDecorator } from 'core/decorators';

const createChainProvider = () => {
  return class extends Chain.Provider {
    getManifest(): Chain.Manifest {
      throw new Error('Method not implemented.');
    }
    getBalance(): Promise<Coin> {
      throw new Error('Method not implemented.');
    }
    getTransactions(_address: string, _network: Chain.Network, _afterBlock?: number): Promise<Transaction[]> {
      throw new Error('Method not implemented.');
    }
    estimateFee(_msgs: Msg[]): Promise<Coin[]> {
      throw new Error('Method not implemented.');
    }
    broadcast(_msgs: Msg[]): Promise<Transaction[]> {
      throw new Error('Method not implemented.');
    }
    createMsg(_data: Msg.Data): Msg {
      throw new Error('Method not implemented.');
    }
  };
};

describe('getChainsBySigner', () => {
  beforeEach(() => {
    DiContainer.unbindAll();
  });

  it('should return 0 chains', () => {
    expect(getChainsBySigner(Signer.SignerType.LEDGER)).toHaveLength(0);
  });

  it('should return 2 chains for LEDGER', () => {
    const firstSigner = SignerDecorator(Signer.SignerType.LEDGER)(class {});
    ChainDecorator('firstChainProvider', { deps: [firstSigner] })(createChainProvider());

    const secondSigner = SignerDecorator(Signer.SignerType.LEDGER)(class {});
    ChainDecorator('secondChainProvider', { deps: [secondSigner] })(createChainProvider());

    expect(getChainsBySigner(Signer.SignerType.LEDGER)).toHaveLength(2);
  });

  it('should return 1 chain for LEDGER and 1 for TREZOR', () => {
    const firstSigner = SignerDecorator(Signer.SignerType.LEDGER)(class {});
    ChainDecorator('firstChainProvider', { deps: [firstSigner] })(createChainProvider());

    const secondSigner = SignerDecorator(Signer.SignerType.TREZOR)(class {});
    ChainDecorator('secondChainProvider', { deps: [secondSigner] })(createChainProvider());

    expect(getChainsBySigner(Signer.SignerType.LEDGER)).toHaveLength(1);
    expect(getChainsBySigner(Signer.SignerType.TREZOR)).toHaveLength(1);
  });
});