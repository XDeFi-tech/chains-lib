import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { fetchAddresses, signBtcLegacyTx } from 'gridplus-sdk';
import * as Bitcoin from 'bitcoinjs-lib';

import type { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LATTICE)
export class LatticeSigner extends Signer.LatticeProvider {
  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
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
    const tx = await msg.buildTx();
    const payload = convertTransactionToBtcTxData(tx, derivation);
    const res = await signBtcLegacyTx(payload);
    msg.sign(res.txHash);
  }
}

const BTC_PURPOSE_P2SH_P2WPKH = 49 + Signer.LatticeConst.HARDENED_OFFSET; // Example constant for a specific purpose
const BTC_TESTNET_COIN = 1 + Signer.LatticeConst.HARDENED_OFFSET; // Example constant for testnet

// Type definitions for transaction structures
interface Input {
  hash: string;
  index: number;
  value: number;
}

interface Output {
  address?: string;
  value: number;
}

interface Transaction {
  inputs: Input[];
  outputs: Output[];
  fee: string;
}

interface BtcTxData {
  prevOuts: {
    txHash: string;
    value: number;
    index: number;
    signerPath: number[];
  }[];
  recipient: string;
  value: number;
  fee: number;
  signerPath: number[];
  changePath: number[];
}

function convertTransactionToBtcTxData(
  transaction: Transaction,
  derivation: string
): BtcTxData {
  const signerPath =
    Signer.LatticeProvider.convertDerivationPathToArray(derivation);
  const prevOuts = transaction.inputs.map((input, index) => ({
    txHash: input.hash,
    value: input.value,
    index: input.index,
    signerPath: [
      signerPath[0],
      signerPath[1],
      signerPath[2],
      Math.floor(index / 5),
      index % 5,
    ],
  }));

  const recipientOutput = transaction.outputs.find(
    (output) => output.address !== undefined
  );
  const recipient = recipientOutput?.address || '';
  const value = recipientOutput?.value || 0;
  const feeSatoshis = Number.parseFloat(transaction.fee) * 100000000; // Convert BTC to satoshis

  const changeOutput = transaction.outputs.find((output) => !output.address);
  const changePathIndex = transaction.outputs.indexOf(
    changeOutput || transaction.outputs[0]
  );

  return {
    signerPath,
    prevOuts,
    recipient,
    value,
    fee: Math.round(feeSatoshis),
    changePath: [
      BTC_PURPOSE_P2SH_P2WPKH,
      BTC_TESTNET_COIN,
      Signer.LatticeConst.HARDENED_OFFSET,
      1,
      changePathIndex,
    ],
  };
}
export default LatticeSigner;
