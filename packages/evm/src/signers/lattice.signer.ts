import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { fetchAddresses, sign, Constants } from 'gridplus-sdk';
import { type UnsignedTransaction, utils } from 'ethers';

import type { ChainMsg, TxData } from '../msg';

@SignerDecorator(Signer.SignerType.LATTICE)
export class LatticeSigner extends Signer.LatticeProvider {
  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getAddress(derivation: string): Promise<string> {
    const addresses = await fetchAddresses({
      startPath:
        Signer.LatticeProvider.convertDerivationPathToArray(derivation),
      n: 1,
    });
    return addresses[0];
  }

  async sign(msg: ChainMsg, derivation: string) {
    const baseTx = await msg.buildTx();
    const txData = convertTransactionToEthData(baseTx, derivation);
    const res = await sign([], txData);
    msg.sign(res.txHash);
  }
}

function convertTransactionToEthData(transaction: TxData, derivation: string) {
  const signerPath =
    Signer.LatticeProvider.convertDerivationPathToArray(derivation);
  const tx: UnsignedTransaction = {
    ...transaction,
    nonce: Number.parseInt(transaction.nonce),
    chainId: Number.parseInt(transaction.chainId),
  };
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
