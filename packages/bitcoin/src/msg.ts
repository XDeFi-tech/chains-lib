import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  MsgEncoding,
  NumberIsh,
  Coin,
} from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as UTXOLib from 'bitcoinjs-lib';
import isEmpty from 'lodash/isEmpty';

import type { BitcoinProvider } from './chain.provider';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  memo?: string | Uint8Array;
  from: string;
  gasLimit?: NumberIsh; // ByteFee
  decimals?: number;
  nftId?: string;
}

export interface TxBody {
  to: string;
  from: string;
  inputs: UTXO[];
  outputs: { address?: string; script?: Buffer; value: number }[];
  utxos: UTXO[];
  fee: string;
  compiledMemo?: '' | Buffer;
}

export class ChainMsg extends BaseMsg<MsgBody, TxBody> {
  declare signedTransaction: string | null;

  constructor(
    public readonly data: MsgBody,
    public readonly provider: BitcoinProvider,
    public readonly encoding: MsgEncoding
  ) {
    super(data, provider, encoding);
  }

  public toData() {
    return this.data;
  }

  async buildTx() {
    const msgData = this.toData();
    let utxos: UTXO[] = await this.provider.scanUTXOs(this.data.from);
    // check is the user has ordinals to erase them from utxos
    let ordinals: any[] = [];
    try {
      ordinals = await this.provider.getNFTBalance(msgData.from);
    } catch (err) {
      console.error(err);
    }

    // check if the user is sending an ordinal
    let ordinalToSend = null;
    if (msgData.nftId) {
      const [ordinalId, index, _] = msgData.nftId.split(':');
      const ordinalUTXOIndex = utxos.findIndex(
        ({ hash, index: UTXOIndex }) =>
          ordinalId === hash && UTXOIndex === Number(index)
      );

      if (ordinalUTXOIndex > -1) {
        ordinalToSend = utxos[ordinalUTXOIndex];
      }

      if (!ordinalToSend) {
        throw new Error('Cannot find ordinal to send');
      }
    }
    if (!isEmpty(ordinals)) {
      // remove all ordinal to make sure we dnt spend associated UTXOs
      utxos = utxos.filter(
        ({ hash, index: UTXOIndex }) =>
          !ordinals.find((ordinal) => {
            if (!ordinal?.location) return false;
            const [ordinalId, index, _] = ordinal.location.split(':');
            return ordinalId === hash && UTXOIndex === Number(index);
          })
      );
    }

    const { fee } = await this.getFee(); // unit is btc/kvB
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRate = Number(fee) * 1e5; // sat/vB
    const feeRateWhole = parseInt(feeRate.toString());
    const compiledMemo = msgData?.memo && this.compileMemo(msgData.memo);

    const targetOutputs = [];
    const valueToSend = new BigNumber(msgData.amount?.toString()) // ? - for nfts, but still required
      .multipliedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
      .toNumber();

    if (valueToSend > 0) {
      targetOutputs.push({
        address: msgData.to,
        value: valueToSend,
      });
    }

    if (compiledMemo) {
      targetOutputs.push({ script: compiledMemo, value: 0 });
    }
    let { inputs, outputs } = accumulative(utxos, targetOutputs, feeRateWhole);

    if (!inputs || !outputs) {
      throw new Error('Insufficient Balance for transaction');
    }

    if (ordinalToSend) {
      inputs = [ordinalToSend, ...inputs];
      outputs = [
        { address: msgData.to, value: ordinalToSend.value },
        ...outputs,
      ];
      utxos.unshift(ordinalToSend);
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
   * @returns {Buffer} OP_RETURN compiled script
   */
  public compileMemo(memo: string | Uint8Array) {
    let formattedMemo: Buffer;
    if (typeof memo === 'string') {
      formattedMemo = Buffer.from(memo, 'utf8');
    } else {
      formattedMemo = Buffer.from(memo);
    }

    return UTXOLib.script.compile([UTXOLib.opcodes.OP_RETURN, formattedMemo]);
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

  async getMaxAmountToSend(contract?: string) {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);

    let balance: Coin | undefined;

    if (!contract) {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId && b.asset.native
      );
    } else {
      balance = (await balances.getData()).find(
        (b) =>
          b.asset.chainId === this.provider.manifest.chainId &&
          b.asset.address === contract
      );
    }

    if (!balance) throw new Error('No balance found');

    let maxAmount: BigNumber = new BigNumber(balance.amount).minus(gap);

    if (balance.asset.native) {
      const feeEstimation = await this.getFee();
      maxAmount = maxAmount.minus(feeEstimation.fee || 0);
    }

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}
