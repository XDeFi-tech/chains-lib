import {
  ChainsException,
  FeeEstimation,
  GasFeeSpeed,
  Msg as BaseMsg,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import BN from 'bn.js';
import { transactions, utils } from 'near-api-js';

import {
  FT_MINIMUM_STORAGE_BALANCE_LARGE,
  FT_STORAGE_DEPOSIT_GAS,
  FT_TRANSFER_DEPOSIT,
} from './constants';
import type { NearProvider } from './chain.provider';

export interface MsgBody {
  from: string;
  to: string;
  amount: NumberIsh;
  contractAddress?: string;
  decimals?: number;
  memo?: string;
  gasLimit?: string;
  gasPrice?: number;
}

export interface TxBody {
  actions: Array<import('@near-js/transactions').Action>;
  from: string;
  to: string;
  value: string; // yocto
  contractAddress?: string;
  decimals?: number;
  memo?: string;
  gasLimit: string;
  gasPrice: number;
}

export class ChainMsg extends BaseMsg<MsgBody, TxBody> {
  declare signedTransaction: string | undefined; // base64
  declare provider: NearProvider;

  constructor(data: MsgBody, provider: NearProvider) {
    super(data, provider);
  }

  public toData() {
    return this.data;
  }

  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    if (msgData.contractAddress && typeof msgData.decimals !== 'number') {
      throw new ChainsException('contractAddress and decimals should exist');
    }
    const value = BigNumber(msgData.amount)
      .multipliedBy(10 ** (msgData.decimals || this.provider.manifest.decimals))
      .toString(10);
    if (!value) {
      throw new ChainsException('Invalid amount value');
    }
    const gas = {
      gasLimit: msgData.gasLimit,
      gasPrice: msgData.gasPrice,
    };

    if (!gas.gasLimit || typeof gas.gasPrice !== 'number') {
      const [fee] = await this.provider.estimateFee([this], GasFeeSpeed.medium);
      gas.gasPrice = fee.gasPrice;
      gas.gasLimit = fee.gasLimit;
    }

    const actions = [];

    if (msgData.contractAddress) {
      actions.push(
        transactions.functionCall(
          'ft_transfer',
          {
            amount: value,
            memo: msgData.memo,
            receiver_id: msgData.to,
          },
          new BN(gas.gasLimit),
          new BN(FT_TRANSFER_DEPOSIT)
        )
      );
    } else {
      actions.push(transactions.transfer(new BN(value))); // common tx
    }

    return {
      actions: actions,
      from: msgData.from,
      to: msgData.to,
      value: value,
      contractAddress: msgData.contractAddress,
      decimals: msgData.decimals,
      memo: msgData.memo,
      gasPrice: gas.gasPrice,
      gasLimit: gas.gasLimit,
    };
  }

  async getFee(_speed?: GasFeeSpeed): Promise<FeeEstimation> {
    const fee = new BigNumber(utils.format.parseNearAmount('0.00001') as string)
      .plus(FT_MINIMUM_STORAGE_BALANCE_LARGE)
      .plus(FT_STORAGE_DEPOSIT_GAS)
      .plus(FT_TRANSFER_DEPOSIT)
      .toString(10);

    return {
      fee: utils.format.formatNearAmount(fee),
      maxFee: null,
    };
  }
}
