import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgEncoding,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import cosmosclient from '@cosmos-client/core';
import * as protobufjs from 'protobufjs';
import * as bech32Buffer from 'bech32-buffer';

import type { ThorProvider } from './chain.provider';
import { AccountInfo } from './types';

export interface MsgBody {
  from: string;
  to: string;
  amount: NumberIsh;
  decimals: number;
  denom?: string;
  memo?: string;
  source?: number;
  type?: string;
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
  declare data: any;

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
    const amountData = {
      denom: messageData.denom || this.provider.manifest.denom,
      decimals: messageData.decimals || this.provider.manifest.decimals,
    };
    const transferMsg = {
      fromAddress: bech32Buffer.decode(messageData.from).data,
      toAddress: bech32Buffer.decode(messageData.to).data,
      amount: [
        {
          denom: amountData.denom,
          amount: String(
            messageData.amount * Math.pow(10, amountData.decimals)
          ),
        },
      ],
    };
    const msgWriter = protobufjs.Writer.create();
    msgWriter.uint32(10).bytes(transferMsg.fromAddress);
    msgWriter.uint32(18).bytes(transferMsg.toAddress);
    const amountWriter = msgWriter.uint32(26).fork();
    amountWriter.uint32(10).string(transferMsg.amount[0].denom);
    amountWriter.uint32(18).string(transferMsg.amount[0].amount);
    amountWriter.ldelim();
    const msgBytes = new cosmosclient.proto.google.protobuf.Any({
      type_url: '/types.MsgSend',
      value: msgWriter.finish(),
    });
    return new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
      messages: [msgBytes],
      memo: messageData.memo,
    });
  }

  async buildTx(): Promise<TxBody> {
    const msgData = this.toData();
    const account = await this.provider.getAccount(msgData.from);
    const txBody = this.buildTransferBody();

    return {
      txBody,
      account,
      to: msgData.to,
      from: msgData.from,
      value: BigNumber(msgData.amount)
        .multipliedBy(10 ** this.provider.manifest.decimals)
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
      gasLimit: msgData.gasLimit || '0',
      gasPrice: msgData.gasPrice || '0',
    };
  }

  async getFee() {
    const fee = await this.provider.gasFeeOptions();
    const feeEstimation: FeeEstimation = {
      fee: null,
      maxFee: null,
    };

    if (!fee) {
      return feeEstimation;
    }

    feeEstimation.fee = BigNumber(fee[GasFeeSpeed.medium] as number)
      .dividedBy(10 ** this.provider.manifest.decimals)
      .toString();
    return feeEstimation;
  }
}
