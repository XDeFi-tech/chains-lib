import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  MsgEncoding,
  NumberIsh,
} from '@xdefi-tech/chains-core';
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

export class ChainMsg extends BaseMsg<MsgBody, any> {
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
    let utxos = await this.provider.utxoDataSource.scanUTXOs(this.data.from);
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
    if (ordinalToSend) {
      utxos.unshift(ordinalToSend);
    }

    const { fee } = await this.getFee();
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRateWhole = parseInt(fee);
    const compiledMemo = msgData?.memo && this.compileMemo(msgData.memo);

    const targetOutputs = [];
    let valueToSend = new BigNumber(msgData.amount?.toString()) // ? - for nfts, but still required
      .multipliedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
      .toNumber();

    if (ordinalToSend) {
      valueToSend = ordinalToSend.value;
    }

    targetOutputs.push({
      address: msgData.to,
      value: valueToSend,
    });

    if (compiledMemo) {
      targetOutputs.push({ script: compiledMemo, value: 0 });
    }
    const { inputs, outputs } = accumulative(
      utxos,
      targetOutputs,
      feeRateWhole
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
}
