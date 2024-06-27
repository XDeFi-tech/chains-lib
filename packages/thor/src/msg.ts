import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgEncoding,
  NumberIsh,
  Coin,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import cosmosclient from '@cosmos-client/core';
import * as bech32Buffer from 'bech32-buffer';

import { types } from './proto';
import type { ThorProvider } from './chain.provider';
import { AccountInfo } from './types';
import { assetFromString } from './utils';

const MsgSend = types.MsgSend;
const MsgDeposit = types.MsgDeposit;

export enum MsgType {
  MsgDeposit = 'MsgDeposit',
  MsgSend = 'MsgSend',
}

export interface MsgBody {
  from: string;
  to: string;
  amount: NumberIsh;
  decimals?: number;
  denom?: string;
  memo?: string;
  source?: number;
  type?: MsgType;
  gasLimit?: string;
  gasPrice?: string;
}

export interface TxBody {
  txBody?: cosmosclient.proto.cosmos.tx.v1beta1.TxBody;
  account: AccountInfo | null;
  to: string;
  value: number;
  chainId: string;
  memo: string;
  from: string;
  accountNumber: number;
  sequence: number;
  source: number;
  denom: string;
  decimals: number;
  gasLimit: string;
  gasPrice: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxBody> {
  declare signedTransaction: string | null;
  declare provider: ThorProvider;

  constructor(data: MsgBody, provider: ThorProvider, encoding: MsgEncoding) {
    super(data, provider, encoding);
  }

  public toData() {
    return this.data;
  }

  public buildTransferBody():
    | cosmosclient.proto.cosmos.tx.v1beta1.TxBody
    | undefined {
    const messageData = this.toData();
    const denom = messageData.denom || this.provider.manifest.denom;
    const decimals = messageData.decimals || this.provider.manifest.decimals;
    const amount = new BigNumber(messageData.amount)
      .multipliedBy(10 ** decimals)
      .integerValue()
      .toString();
    const transferMsg: types.IMsgSend = {
      fromAddress: bech32Buffer.decode(messageData.from).data,
      toAddress: bech32Buffer.decode(messageData.to).data,
      amount: [
        {
          denom: denom.toLowerCase(),
          amount,
        },
      ],
    };

    const msgWriter = MsgSend.encode(transferMsg);
    const msgBytes = new cosmosclient.proto.google.protobuf.Any({
      type_url: '/types.MsgSend',
      value: msgWriter.finish(),
    });
    return new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
      messages: [msgBytes],
      memo: messageData.memo,
    });
  }

  public buildDepositBody():
    | cosmosclient.proto.cosmos.tx.v1beta1.TxBody
    | undefined {
    const messageData = this.toData();
    const denom = messageData.denom || this.provider.manifest.denom;
    const decimals = messageData.decimals || this.provider.manifest.decimals;
    const signer = bech32Buffer.decode(messageData.from).data;
    const memo = messageData.memo || '';
    const amount = new BigNumber(messageData.amount)
      .multipliedBy(10 ** decimals)
      .integerValue()
      .toString();
    const asset = assetFromString(denom);
    const body: types.IMsgDeposit = {
      coins: [
        {
          asset,
          amount,
          decimals: 0,
        },
      ],
      memo,
      signer,
    };
    const msgWriter = MsgDeposit.encode(body);

    const msgBytes = new cosmosclient.proto.google.protobuf.Any({
      type_url: '/types.MsgDeposit',
      value: msgWriter.finish(),
    });
    return new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
      messages: [msgBytes],
      memo,
    });
  }

  buildBody = () => {
    const messageData: MsgBody = this.toData();
    const builders = {
      [MsgType.MsgDeposit]: this.buildDepositBody,
      [MsgType.MsgSend]: this.buildTransferBody,
    };
    return builders[messageData.type || MsgType.MsgSend]?.call(this);
  };

  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    const account = await this.provider.getAccount(msgData.from);
    const txBody = this.buildBody();

    return {
      txBody,
      account,
      to: msgData.to,
      from: msgData.from,
      value: new BigNumber(msgData.amount)
        .multipliedBy(
          10 ** (msgData.decimals || this.provider.manifest.decimals)
        )
        .integerValue()
        .toNumber(),
      chainId: this.provider.manifest.chainId,
      memo: msgData.memo || '',
      accountNumber: account?.account_number
        ? parseInt(account.account_number)
        : 0,
      sequence: account?.sequence ? parseInt(account.sequence) : 0,
      source: msgData.source || 0,
      denom: msgData.denom || this.provider.manifest.denom,
      decimals: msgData.decimals || this.provider.manifest.decimals,
      gasLimit: msgData.gasLimit || '200000',
      gasPrice: msgData.gasPrice || '0',
    };
  }

  async getFee(speed?: GasFeeSpeed) {
    const data = this.toData();
    const estimation: FeeEstimation = {
      fee: null,
      maxFee: null,
    };

    if (!data.gasLimit && !data.gasPrice && this.provider) {
      const [feeEstimation] = await this.provider.estimateFee(
        [this],
        speed || GasFeeSpeed.medium
      );
      if (feeEstimation.gasPrice && feeEstimation.gasLimit) {
        estimation.fee = new BigNumber(feeEstimation.gasLimit.toString())
          .multipliedBy(feeEstimation.gasPrice.toString())
          .dividedBy(10 ** this.provider.manifest.decimals)
          .toString();
      }
    } else if (data.gasLimit && data.gasPrice) {
      estimation.fee = new BigNumber(data.gasLimit)
        .multipliedBy(data.gasPrice)
        .dividedBy(10 ** this.provider.manifest.decimals)
        .toString();
    }

    return estimation;
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
