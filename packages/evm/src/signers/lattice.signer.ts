import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { fetchAddresses, sign, Constants } from 'gridplus-sdk';
import { type UnsignedTransaction, utils, BigNumber } from 'ethers';
// import { TransactionFactory } from '@ethereumjs/tx';

import type { ChainMsg, TxData } from '../msg';

@SignerDecorator(Signer.SignerType.LATTICE)
export class LatticeSigner extends Signer.LatticeProvider {
  static async create({
    deviceId,
    password,
    name,
  }: {
    deviceId: string;
    password: string;
    name: string;
  }): Promise<LatticeSigner> {
    const { clientData, isPaired } = await super.create({
      deviceId,
      password,
      name,
    });
    return new LatticeSigner(clientData, isPaired);
  }

  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getAddress(derivation: string): Promise<string> {
    const startPath =
      Signer.LatticeProvider.convertDerivationPathToArray(derivation);
    const addresses = await fetchAddresses({
      startPath,
      n: 1,
    });
    return addresses[0];
  }

  async sign(msg: ChainMsg, derivation: string) {
    const baseTx = await msg.buildTx();
    const txData = convertTransactionToEthData(baseTx, derivation);
    const res = await sign([], txData);
    const r = utils.hexlify(res.sig.r);
    const s = utils.hexlify(res.sig.s);
    const v = BigNumber.from(utils.hexlify(res.sig.v)).toNumber();
    const tx = toEthersTx(baseTx);
    const signedTx = utils.serializeTransaction(tx, {
      r,
      s,
      v,
    });
    msg.sign(signedTx);
  }
}

function toEthersTx(tx: TxData): UnsignedTransaction {
  return {
    ...tx,
    nonce: Number.parseInt(tx.nonce),
    chainId: Number.parseInt(tx.chainId),
  };
}

function convertTransactionToEthData(transaction: TxData, derivation: string) {
  const signerPath =
    Signer.LatticeProvider.convertDerivationPathToArray(derivation);
  const tx = toEthersTx(transaction);
  const serializedTx = utils.serializeTransaction(tx);
  const payload = utils.arrayify(serializedTx);
  return {
    data: {
      signerPath,
      chain: tx.chainId,
      curveType: Constants.SIGNING.CURVES.SECP256K1,
      hashType: Constants.SIGNING.HASHES.KECCAK256,
      encodingType: Constants.SIGNING.ENCODINGS.EVM,
      payload,
    },
  };
}

export default LatticeSigner;
