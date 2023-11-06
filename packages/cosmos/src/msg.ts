import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgData,
  MsgEncoding,
  NumberIsh,
} from '@xdefi-tech/chains-core';
import { StdTx } from '@cosmjs/amino';
import BigNumber from 'bignumber.js';

import type { CosmosProvider } from './chain.provider';

export interface MsgBody {
  from: string;
  to: string;
  amount: string;
  denom?: string;
  memo?: string;
  gasLimit?: NumberIsh;
  gasPrice?: NumberIsh;
  mode?: string;
  typeUrl?: string;
  contractAddress?: string;
  nftId?: string;
  msgs: any[];
}

export interface TxData {
  msgs: any[];
  memo?: string;
  from: string;
  to: string;
  value: string;
  accountNumber?: number;
  sequence?: number;
  denom: string;
  mode?: string;
  typeUrl: string;
  contractAddress?: string;
  nftId?: string;
}

export class ChainMsg extends BasMsg<MsgBody, TxData> {
  declare signedTransaction: StdTx | undefined;
  declare provider: CosmosProvider;

  public toData() {
    return this.data;
  }

  constructor(data: MsgData, provider: CosmosProvider, encoding: MsgEncoding) {
    super(data, provider, encoding);
  }

  private getValue() {
    return BigNumber(this.toData().amount || 0)
      .multipliedBy(10 ** this.provider.manifest.decimals)
      .toString();
  }

  private getMsgToSend() {
    const msgData = this.toData();
    let msgs;
    let typeUrl = msgData.typeUrl;

    if (msgData.contractAddress && msgData.nftId) {
      // sending nft
      typeUrl = msgData.typeUrl || '/cosmwasm.wasm.v1.MsgExecuteContract';
      msgs = [
        {
          typeUrl: typeUrl,
          value: {
            sender: msgData.from,
            contract: msgData.contractAddress,
            funds: [],
            msg: {
              transfer_nft: {
                recipient: msgData.to,
                token_id: msgData.nftId,
              },
            },
          },
        },
      ];
    } else {
      // sending native currency
      typeUrl = msgData.typeUrl || '/cosmos.bank.v1beta1.MsgSend';
      msgs = [
        {
          typeUrl: typeUrl,
          value: {
            fromAddress: msgData.from,
            toAddress: msgData.to,
            amount: [
              {
                amount: this.getValue(),
                denom: msgData.denom || this.provider.manifest.denom,
              },
            ],
          },
        },
      ];
    }

    return {
      msgs,
      typeUrl,
    };
  }

  async buildTx() {
    const msgData = this.toData();
    const { typeUrl, msgs } = this.getMsgToSend();
    const fee = {
      amount: [
        {
          amount: BigNumber(msgData.gasPrice)
            .multipliedBy(10 ** this.provider.manifest.decimals)
            .toString(),
          denom: this.provider.manifest.denom,
        },
      ],
      gas: BigNumber(msgData.gasLimit).toString(),
    };
    const acc = await this.provider.getAccount(msgData.from);

    return {
      msgs: msgData.msgs || msgs,
      ...(msgData.memo && { memo: msgData.memo }),
      fee,
      ...(acc && {
        accountNumber: acc.accountNumber,
        sequence: acc.sequence,
      }),
      to: msgData.to,
      from: msgData.from,
      denom: msgData.denom || this.provider.manifest.denom,
      value: this.getValue(),
      typeUrl,
      contractAddress: msgData.contractAddress,
      nftId: msgData.nftId,
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
        estimation.fee = BigNumber(feeEstimation.gasLimit.toString())
          .multipliedBy(feeEstimation.gasPrice.toString())
          .dividedBy(10 ** this.provider.manifest.decimals)
          .toString();
      }
    } else if (data.gasLimit && data.gasPrice) {
      estimation.fee = BigNumber(data.gasLimit)
        .multipliedBy(data.gasPrice)
        .dividedBy(10 ** this.provider.manifest.decimals)
        .toString();
    }

    return estimation;
  }
}
