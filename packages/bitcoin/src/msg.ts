import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  MsgEncoding,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import { UTXO } from '@xdefi-tech/chains-utxo';
import BigNumber from 'bignumber.js';
import accumulative from 'coinselect/accumulative';
import * as UTXOLib from 'bitcoinjs-lib';
import isEmpty from 'lodash/isEmpty';
import { utils as ethersUtils } from 'ethers';
import utils from 'coinselect/utils';
import sortBy from 'lodash/sortBy';

import type { BitcoinProvider } from './chain.provider';
import { NfTv3 } from './gql';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  memo?: string | Uint8Array;
  from: string;
  gasLimit?: NumberIsh; // ByteFee
  decimals?: number;
  nftId?: string;
  spendUtxosContainOrdinal?: boolean;
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

  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    const { fee } = await this.getFee();
    if (!fee)
      throw new Error('Fee estimation is required for building transaction');
    const feeRate = Number(fee) * 1e5;

    // Calculate dust threshold filter for utxo outputs
    const dustThreshold = utils.inputBytes({}) * feeRate;

    // Scan UTXOs for the sender's address
    const utxos = await this.provider.scanUTXOs(this.data.from, {
      includeOrigins: true,
    });
    const ordinalsMapping = await this.getOrdinalsMapping();
    const utxosWithoutOrdinals = this.filterUtxosWithoutOrdinals(
      utxos,
      ordinalsMapping
    );

    // Handle ordinals if nftId is present
    const { ordinalInputUtxos, ordinalOutputUtxos, feeToSendOrdinals } =
      await this.handleOrdinals(utxos, ordinalsMapping, feeRate, dustThreshold);

    const compiledMemo = msgData.memo
      ? this.compileMemo(msgData.memo)
      : undefined;

    // Create target outputs for the transaction
    const targetOutputs = this.createTargetOutputs(
      compiledMemo,
      feeToSendOrdinals
    );

    const { inputs, outputs } = accumulative(
      utxosWithoutOrdinals,
      targetOutputs,
      feeRate
    );

    if (msgData.nftId) {
      return this.buildOrdinalTransaction(
        utxosWithoutOrdinals,
        inputs,
        ordinalInputUtxos,
        ordinalOutputUtxos,
        feeRate,
        dustThreshold,
        compiledMemo
      );
    } else {
      if (!inputs || !outputs) {
        throw new Error('Insufficient Balance for transaction');
      }
      return this.createTxBody(inputs, outputs, utxos, fee, compiledMemo);
    }
  }

  private filterUtxosWithoutOrdinals(
    utxos: UTXO[],
    ordinalsMapping: { [utxo: string]: NfTv3[] }
  ): UTXO[] {
    return utxos.filter(
      (utxo) => !ordinalsMapping[`${utxo.hash}:${utxo.index}`]
    );
  }

  private async handleOrdinals(
    utxos: UTXO[],
    ordinalsMapping: { [utxo: string]: NfTv3[] },
    feeRate: number,
    dustThreshold: number
  ) {
    const msgData = this.toData();
    let ordinalInputUtxos: UTXO[] = [];
    let ordinalOutputUtxos: { address?: string; value: number }[] = [];
    let feeToSendOrdinals = 0;

    if (msgData.nftId) {
      const [hash, index] = msgData.nftId.split(':');
      const utxoContainOrdinal = utxos.find(
        (utxo) => utxo.hash === hash && utxo.index === Number(index)
      );
      if (!utxoContainOrdinal) throw new Error('Cannot find ordinal to send');

      if (msgData.spendUtxosContainOrdinal) {
        const { inputUtxos, outputUtxos } = await this.spendOrdinals(
          msgData,
          utxoContainOrdinal,
          ordinalsMapping,
          dustThreshold
        );
        ordinalInputUtxos = inputUtxos;
        ordinalOutputUtxos = outputUtxos;
      } else {
        ordinalInputUtxos.push(utxoContainOrdinal);
        ordinalOutputUtxos.push({
          address: msgData.to,
          value: utxoContainOrdinal.value,
        });
      }

      feeToSendOrdinals =
        utils.transactionBytes(ordinalInputUtxos, ordinalOutputUtxos) * feeRate;
    }

    return { ordinalInputUtxos, ordinalOutputUtxos, feeToSendOrdinals };
  }

  private async spendOrdinals(
    msgData: MsgBody,
    utxoContainOrdinal: UTXO,
    ordinalsMapping: { [utxo: string]: NfTv3[] },
    dustThreshold: number
  ) {
    const inputUtxos: UTXO[] = [utxoContainOrdinal];
    const nfts =
      ordinalsMapping[`${utxoContainOrdinal.hash}:${utxoContainOrdinal.index}`];
    const [_, __, offset] = msgData.nftId!.split(':');

    sortBy(nfts, 'location', (nft) => {
      return Number(nft.location!.split(':')[2]);
    });
    const separateOrdinals = this.calculateSeparateOrdinals(
      nfts,
      utxoContainOrdinal.value
    );
    const offsetIndex = Number(nfts[0].location!.split(':')[2]) > 0 ? 1 : 0;
    const spendUtxoCalculation = await Promise.all(
      nfts.map(async (nft, index) => {
        const [genesisTx, genesisIndex] = nft.id.split('/')[1].split('i');
        const tx = await this.provider.getTransaction(genesisTx);
        const txIndex = Number(genesisIndex);
        const ordinalValue = tx!.outputs[txIndex].amount.value;
        const isSendOrdinal = nft.location!.split(':')[2] === offset;
        if (
          separateOrdinals[index + offsetIndex] - ordinalValue >
          dustThreshold
        ) {
          return [
            {
              address: isSendOrdinal ? msgData.to : msgData.from,
              value: Number(ordinalValue),
            },
            {
              value: separateOrdinals[index + offsetIndex] - ordinalValue,
            },
          ];
        } else {
          return [
            {
              address: isSendOrdinal ? msgData.to : msgData.from,
              value: separateOrdinals[index + offsetIndex],
            },
          ];
        }
      })
    );
    if (offsetIndex === 1) {
      spendUtxoCalculation.unshift([
        {
          value: separateOrdinals[0],
        },
      ]);
    }
    return { inputUtxos, outputUtxos: spendUtxoCalculation.flat() };
  }

  private calculateSeparateOrdinals(
    nfts: NfTv3[],
    utxoValue: number
  ): number[] {
    let startOffset = 0;
    const separateOrdinals: number[] = [];
    for (const nft of nfts) {
      const nftOffset = Number(nft.location!.split(':')[2]);
      if (nftOffset > startOffset) {
        separateOrdinals.push(nftOffset - startOffset);
        startOffset = nftOffset;
      }
    }
    separateOrdinals.push(utxoValue - startOffset);
    return separateOrdinals;
  }

  private createTargetOutputs(
    compiledMemo: Buffer | undefined,
    feeToSendOrdinals: number
  ) {
    const msgData = this.toData();
    const targetOutputs: {
      address?: string;
      value: number;
      script?: Buffer;
    }[] = [];
    const valueToSend = new BigNumber(msgData.amount?.toString())
      .multipliedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
      .toNumber();

    if (valueToSend > 0) {
      targetOutputs.push({ address: msgData.to, value: valueToSend });
    }

    if (compiledMemo) {
      targetOutputs.push({ script: compiledMemo, value: 0 });
    }

    if (feeToSendOrdinals > 0) {
      targetOutputs.push({ value: feeToSendOrdinals });
    }

    return targetOutputs;
  }

  private buildOrdinalTransaction(
    utxos: UTXO[],
    inputs: UTXO[],
    ordinalInputUtxos: UTXO[],
    ordinalOutputUtxos: { address?: string; value: number }[],
    feeRate: number,
    dustThreshold: number,
    compiledMemo: Buffer | undefined
  ): TxBody {
    const msgData = this.toData();
    const finalInputs = inputs
      ? [...ordinalInputUtxos, ...inputs]
      : ordinalInputUtxos;
    const finalOutputs: { address?: string; value: number; script?: Buffer }[] =
      [];

    const valueToSend = new BigNumber(msgData.amount?.toString())
      .multipliedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
      .toNumber();

    if (finalInputs.length === 1 && valueToSend > 0) {
      this.handleSingleInput(finalOutputs, ordinalOutputUtxos, dustThreshold);
      const totalFee =
        utils.transactionBytes(finalInputs, finalOutputs) * feeRate;

      this.adjustOutputsForFee(finalOutputs, totalFee, dustThreshold);

      return this.createTxBody(
        finalInputs,
        finalOutputs,
        utxos,
        (feeRate / 1e5).toString(),
        compiledMemo
      );
    } else {
      finalOutputs.push(...ordinalOutputUtxos);
      if (valueToSend > 0) {
        finalOutputs.push({ address: msgData.to, value: valueToSend });
      }
      if (compiledMemo) {
        finalOutputs.push({ script: compiledMemo, value: 0 });
      }
      const totalFee =
        utils.transactionBytes(finalInputs, finalOutputs) * feeRate;
      const remainAmount =
        utils.sumOrNaN(finalInputs) -
        finalInputs[0].value -
        valueToSend -
        totalFee -
        utils.outputBytes({}) * feeRate;
      if (remainAmount > dustThreshold) {
        finalOutputs.push({ value: remainAmount });
      }

      return this.createTxBody(
        finalInputs,
        finalOutputs,
        utxos,
        (feeRate / 1e5).toString(),
        compiledMemo
      );
    }
  }

  private handleSingleInput(
    finalOutputs: { address?: string; value: number; script?: Buffer }[],
    ordinalOutputUtxos: { address?: string; value: number }[],
    dustThreshold: number
  ) {
    const msgData = this.toData();
    let remainAmount = new BigNumber(msgData.amount?.toString())
      .multipliedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
      .toNumber();

    for (const outputUtxo of ordinalOutputUtxos) {
      if (remainAmount === 0 || outputUtxo.address) {
        finalOutputs.push(outputUtxo);
      } else {
        const diff = remainAmount - outputUtxo.value;
        if (diff === 0) {
          finalOutputs.push({ address: msgData.to, value: remainAmount });
          remainAmount = 0;
        } else if (diff > dustThreshold) {
          finalOutputs.push({ value: outputUtxo.value, address: msgData.to });
          remainAmount -= outputUtxo.value;
        } else if (-diff > dustThreshold) {
          finalOutputs.push({ address: msgData.to, value: remainAmount });
          remainAmount = 0;
          finalOutputs.push({ value: -diff });
        } else {
          finalOutputs.push(outputUtxo);
        }
      }
    }

    if (remainAmount > 0) {
      throw Error('Cannot create transaction to send NFT and amount');
    }
  }

  private adjustOutputsForFee(
    finalOutputs: { address?: string; value: number; script?: Buffer }[],
    totalFee: number,
    dustThreshold: number
  ) {
    const lastOutput = finalOutputs[finalOutputs.length - 1];
    if (lastOutput.address || lastOutput.value <= totalFee) {
      throw new Error('Insufficient Balance for transaction');
    } else {
      if (lastOutput.value - totalFee > dustThreshold) {
        lastOutput.value -= totalFee;
      } else {
        finalOutputs.pop();
      }
    }
  }

  private createTxBody(
    inputs: UTXO[],
    outputs: { address?: string; value: number; script?: Buffer }[],
    utxos: UTXO[],
    fee: string,
    compiledMemo: Buffer | undefined
  ): TxBody {
    const msgData = this.toData();
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
   * This method uses to fetch the list of NFTs of sender and map the UTXOs with ordinals value.
   * @returns a mapping of UTXOs (transaction, index) to the ordinals
   */
  async getOrdinalsMapping(): Promise<{ [utxo: string]: NfTv3[] }> {
    try {
      const msgData = this.toData();
      const ordinals: NfTv3[] = await this.provider.getNFTBalance(msgData.from);
      const mappingUtxosToOrdinalsValue: { [utxo: string]: NfTv3[] } = {};
      ordinals.forEach((ordinal) => {
        const [txHash, index] = ordinal.location!.split(':');
        const utxo = `${txHash}:${index}`;
        if (!mappingUtxosToOrdinalsValue[utxo]) {
          mappingUtxosToOrdinalsValue[utxo] = [];
        }
        mappingUtxosToOrdinalsValue[utxo].push(ordinal);
      });
      return mappingUtxosToOrdinalsValue;
    } catch (error) {
      return {};
    }
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

  async getMaxAmountToSend() {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const [balance] = await balances.getData();
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);

    const ordinals = await this.provider.getNFTBalance(msgData.from);
    const ordinalValues = await Promise.all(
      (ordinals as any[]).map(async (ordinal) => {
        // Get the transactions creating ordinals to determine inscribed sats
        const [txId, outputIndex] = ordinal.id.split('/')[1].split('i');
        const txInfo = await this.provider.getTransaction(txId);
        return new BigNumber(
          ethersUtils.formatUnits(
            txInfo!.outputs[outputIndex].amount.value,
            this.provider.manifest.decimals
          )
        );
      })
    );
    const totalOrdinalValue = ordinalValues.reduce((prev, curr) =>
      prev.plus(curr)
    );

    if (!balance) throw new Error('No balance found');

    let maxAmount: BigNumber = new BigNumber(balance.amount)
      .minus(totalOrdinalValue)
      .minus(gap);

    const feeEstimation = await this.getFee();
    maxAmount = maxAmount.minus(feeEstimation.fee || 0);
    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}
