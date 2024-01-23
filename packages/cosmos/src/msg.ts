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

export type MsgBody = {
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
  msgs?: any[];
  data?: string;
};

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

export enum CosmosChainType {
  Cosmos = 0,
  Ethermint = 1,
  Terra = 2,
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

    if (this.encoding === MsgEncoding.string) {
      if (!msgData.data || typeof msgData.data !== 'string') {
        throw new Error(
          'Invalid msg data, see examples to build msg from data'
        );
      }
      const {
        signDoc: { fee, memo, msgs, sequence, account_number },
        signer,
      } = JSON.parse(msgData.data);

      const encodedMsgs = msgs.map(
        ({ '@type': type, ...rest }: { '@type': any; [key: string]: any }) => {
          let returningValue = rest;
          switch (type) {
            case '/ibc.applications.transfer.v1.MsgTransfer':
              returningValue = {
                ...rest,
                timeoutTimestamp:
                  typeof rest.timeoutTimestamp === 'object'
                    ? rest.timeoutTimestamp.high.toString()
                    : rest.timeoutTimestamp.toString(),
              };
              break;
          }

          return { typeUrl: type, value: returningValue };
        }
      );

      return {
        msgs: encodedMsgs,
        fee: {
          amount: fee.amount.map(({ amount, denom }: any) => ({
            amount: amount.toString(),
            denom,
          })),
          gas: fee.gas.toString(),
        },
        ...(memo && { memo }),
        sequence: parseInt(sequence),
        accountNumber: parseInt(account_number),
        from: signer,
        to: '',
        value: 0,
      };
    }

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
