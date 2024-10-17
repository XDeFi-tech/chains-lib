import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  MsgEncoding,
  NumberIsh,
  Coin,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import utils from 'coinselect/utils';
import * as UTXOLib from 'bitcoinjs-lib';
import { UTXO, stringToHex } from '@xdefi-tech/chains-utxo';
import { hexToBytes } from '@noble/hashes/utils';

import type { DogecoinProvider } from './chain.provider';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  memo?: string | Uint8Array;
  from: string;
  gasLimit?: NumberIsh; // ByteFee
  decimals?: number;
}

export interface TxBody {
  to: string;
  from: string;
  inputs: UTXO[];
  outputs: { address?: string; script?: Buffer | Uint8Array; value: number }[];
  utxos: UTXO[];
  fee: string;
  compiledMemo?: string | Uint8Array;
}

export class ChainMsg extends BaseMsg<MsgBody, TxBody> {
  declare signedTransaction: string | null;

  constructor(
    public readonly data: MsgBody,
    public readonly provider: DogecoinProvider,
    public readonly encoding: MsgEncoding
  ) {
    super(data, provider, encoding);
  }

  public toData() {
    return this.data;
  }

  async buildTx() {
    const msgData = this.toData();
    const utxos = await this.provider.scanUTXOs(this.data.from);
    const { fee } = await this.getFee(); // unit is btc/kvB
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    // Convert fee rate to sat/vb
    // returns the smallest integer greater than or equal to the fee rate for building the transaction and dust filtering
    const feeRate = Math.ceil(Number(fee) * 1e5);
    const compiledMemo = msgData?.memo && this.compileMemo(msgData.memo);

    const targetOutputs = [];

    targetOutputs.push({
      address: msgData.to,
      value: new BigNumber(msgData.amount.toString())
        .multipliedBy(
          10 ** (msgData.decimals || this.provider.manifest.decimals)
        )
        .toNumber(),
    });

    if (compiledMemo) {
      targetOutputs.push({ script: compiledMemo, value: 0 });
    }
    const {
      inputs,
      outputs,
      fee: feeAccumulative,
    } = accumulative(
      utxos.map((utxo) => ({
        ...utxo,
        ...utxo.witnessUtxo,
      })),
      targetOutputs,
      feeRate
    );

    if (!inputs || !outputs) {
      throw new Error('Insufficient Balance for transaction');
    }

    return {
      to: msgData.to,
      from: msgData.from,
      inputs,
      outputs,
      utxos,
      fee,
      compiledMemo,
    };
  }

  /**
   * Current method in used to compile a bitcoinjs-lib script. Bitcoin scripts are used to define the conditions
   * under which funds can be spent in a Bitcoin transaction. Mark a transaction output as unspendable
   * @param {string | Uint8Array} memo
   * @returns {Uint8Array} OP_RETURN compiled script
   */
  public compileMemo(memo: string | Uint8Array): Uint8Array {
    let formattedMemo: Uint8Array;
    if (typeof memo === 'string') {
      const bytesMemo = hexToBytes(stringToHex(memo));
      formattedMemo = Uint8Array.from([
        UTXOLib.opcodes.OP_RETURN,
        bytesMemo.length,
        ...bytesMemo,
      ]);
    } else {
      formattedMemo = memo;
    }

    if (formattedMemo.length > 80) throw new Error('Memo is too long');

    return formattedMemo;
  }

  async getFee(speed?: GasFeeSpeed): Promise<FeeEstimation> {
    const feeEstimation: FeeEstimation = { fee: null, maxFee: null };
    const msgData = this.toData();
    if (msgData.gasLimit) {
      feeEstimation.fee = new BigNumber(msgData.gasLimit.toString())
        .dividedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
        .toString();
    } else {
      const feeOptions = await this.provider.gasFeeOptions();
      if (!feeOptions) {
        return feeEstimation;
      }

      feeEstimation.fee = new BigNumber(
        feeOptions[speed || GasFeeSpeed.medium].toString()
      )
        .dividedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
        .toString();
    }

    return feeEstimation;
  }

  async getMaxAmountToSend() {
    const msgData = this.toData();
    const utxos = await this.provider.scanUTXOs(msgData.from);
    const { fee } = await this.getFee();
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');

    // Convert fee rate to sat/b
    // returns the smallest integer greater than or equal to the fee rate for building the transaction and dust filtering
    const feeRate = Math.ceil(Number(fee) * 1e5);
    // Remove utxts that value is less than their fee
    const utxosCanSpend = utxos.filter(
      (utxo) =>
        utxo.value >
        utils.inputBytes({ ...utxo, ...utxo.witnessUtxo }) * feeRate
    );
    const valueToSend = utxosCanSpend.reduce(
      (acc, utxo) => acc + utxo.value,
      0
    );
    const targetOutputs: {
      address?: string;
      value: number;
      script?: Buffer | Uint8Array;
    }[] = [];

    if (valueToSend > 0) {
      targetOutputs.push({ address: this.data.to, value: valueToSend });
    }

    const { fee: gweiFee } = accumulative(
      utxosCanSpend.map((utxo) => ({
        ...utxo,
        ...utxo?.witnessUtxo,
      })),
      targetOutputs,
      feeRate
    );
    return new BigNumber(valueToSend - gweiFee)
      .dividedBy(10 ** this.provider.manifest.decimals)
      .toString();
  }
}
