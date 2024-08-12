import {
  FeeEstimation,
  GasFeeSpeed,
  Msg as BasMsg,
  MsgData,
  MsgEncoding,
  NumberIsh,
  Coin,
} from '@xdefi-tech/chains-core';
import { StdTx } from '@cosmjs/amino/build/stdtx';
import { Coin as AminoCoin } from '@cosmjs/amino/build/coins';
import BigNumber from 'bignumber.js';
import Long from 'long';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { StdSignature } from '@cosmjs/amino';

import { MsgTransfer } from './proto_export/ibc/applications/transfer/v1/tx';
import { MessageComposer as MessageComposerIbc } from './proto_export/ibc/applications/transfer/v1/tx.registry';
import { AminoConverter as AminoConverterIbc } from './proto_export/ibc/applications/transfer/v1/tx.amino';
import { AminoConverter as AminoConverterCosmos } from './proto_export/cosmos/bank/v1beta1/tx.amino';
import { MessageComposer as MessageComposerCosmos } from './proto_export/cosmos/bank/v1beta1/tx.registry';
import { MsgSend } from './proto_export/cosmos/bank/v1beta1/tx';
import type { CosmosProvider } from './chain.provider';
import { MsgSwapExactAmountIn } from './proto_export/osmosis/gamm/v1beta1/tx';
import { MessageComposer as MessageComposerGamm } from './proto_export/osmosis/gamm/v1beta1/tx.registry';
import { AminoConverter as AminoConverterGamm } from './proto_export/osmosis/gamm/v1beta1/tx.amino';

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
  feeOptions?: {
    gasAdjustment: number;
    gasFee: {
      denom: string;
    };
  };
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

export interface StdFee {
  readonly amount: readonly AminoCoin[];
  readonly gas: string;
  readonly payer?: string;
  readonly granter?: string;

  // XXX: "feePayer" should be "payer". But, it maybe from ethermint team's mistake.
  //      That means this part is not standard.
  readonly feePayer?: string;
}

export interface AminoMsgSend {
  readonly type: string;
  readonly value: any;
}

export interface AminoSignDoc {
  readonly chain_id: string;
  readonly account_number: string;
  readonly sequence: string;
  // Should be nullable
  readonly timeout_height?: string;
  readonly fee: StdFee;
  readonly msgs: readonly AminoMsgSend[];
  readonly memo: string;
}

export interface DirectSignDoc {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  bodyBytes?: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  authInfoBytes?: Uint8Array;
  /**
   * chain_id is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chainId?: string;
  /** account_number is the account number of the account in state */
  accountNumber?: string;
}

export interface SignMsgSendResponse {
  signed: any;
  signature: StdSignature;
}

export enum CosmosChainType {
  Cosmos = 0,
  Ethermint = 1,
  Terra = 2,
}

export enum CosmosSignMode {
  SIGN_DIRECT = 0,
  SIGN_AMINO = 1,
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
    return new BigNumber(this.toData().amount || 0)
      .multipliedBy(10 ** this.provider.manifest.decimals)
      .toString();
  }

  private getIBCTransferMsg(rawMsg: any) {
    const ibcCheck = rawMsg.token.denom.split('/');
    if (ibcCheck?.[0] === 'ibc') {
      rawMsg.token.denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
    }
    if (rawMsg.timeoutTimestamp) {
      rawMsg.timeoutTimestamp = Long.fromValue(rawMsg.timeoutTimestamp);
    }
    const ibcTransfer = MsgTransfer.fromPartial(rawMsg);

    return MessageComposerIbc.withTypeUrl.transfer(ibcTransfer);
  }

  private getSwapMsg(rawMsg: any) {
    rawMsg.tokenIn.amount = rawMsg.tokenIn.amount.toString();
    const ibcCheck = rawMsg.tokenIn.denom.split('/');
    if (ibcCheck?.[0] === 'ibc') {
      rawMsg.tokenIn.denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
    }
    rawMsg.tokenOutMinAmount = rawMsg.tokenOutMinAmount.toString();
    const msgSwapExactAmountIn = MsgSwapExactAmountIn.fromPartial(rawMsg);
    return MessageComposerGamm.withTypeUrl.swapExactAmountIn(
      msgSwapExactAmountIn
    );
  }

  private getMsgSend(rawMsg: any) {
    rawMsg.amount = rawMsg.amount.map((coin: AminoCoin) => {
      const ibcCheck = coin.denom.split('/');
      let denom = coin.denom;
      if (ibcCheck?.[0] === 'ibc') {
        denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
      }

      return {
        denom,
        amount: coin.amount.toString(),
      };
    });
    const msgSend = MsgSend.fromPartial(rawMsg);
    return MessageComposerCosmos.withTypeUrl.send(msgSend);
  }

  private getExecuteContract(rawMsg: any) {
    rawMsg.msg = new Uint8Array(rawMsg.msg);

    return {
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: MsgExecuteContract.fromPartial(rawMsg),
    };
  }

  getMsgToSend() {
    const msgData = this.toData();
    let msgs;
    let typeUrl = msgData.typeUrl;

    if (typeUrl && typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
      // transferring IBC token
      msgs = msgData.msgs;
    } else if (msgData.contractAddress && msgData.nftId) {
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
          value: MsgSend.fromPartial({
            fromAddress: msgData.from,
            toAddress: msgData.to,
            amount: [
              {
                denom: msgData.denom || this.provider.manifest.denom,
                amount: this.getValue(),
              },
            ],
          }),
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

      const encodedMsgs = msgs.map((signDocMsg: any) => {
        const key: string =
          signDocMsg?.['@type'] ||
          signDocMsg?.['type'] ||
          signDocMsg?.typeUrl ||
          '';
        const rawMsg = signDocMsg?.value ?? signDocMsg;

        const isIBCTransfer =
          AminoConverterIbc[key as keyof typeof AminoConverterIbc];
        if (isIBCTransfer) {
          return this.getIBCTransferMsg(rawMsg);
        }

        const isMsgSwapExactAmountIn =
          AminoConverterGamm[key as keyof typeof AminoConverterGamm];
        if (isMsgSwapExactAmountIn) {
          return this.getSwapMsg(rawMsg);
        }

        const isMsgSend =
          AminoConverterCosmos[key as keyof typeof AminoConverterCosmos];
        if (isMsgSend) {
          return this.getMsgSend(rawMsg);
        }

        if (key === '/cosmwasm.wasm.v1.MsgExecuteContract') {
          return this.getExecuteContract(rawMsg);
        }
      });

      return {
        msgs: encodedMsgs,
        fee: {
          amount: fee.amount.map(({ amount, denom }: any) => ({
            amount: Math.ceil(amount).toString(),
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
    const feeOptions = msgData.feeOptions;

    if (!msgData.gasLimit && !msgData.gasPrice && this.provider) {
      const [feeEstimation] = await this.provider.estimateFee(
        [this],
        GasFeeSpeed.medium
      );
      msgData.gasLimit = feeEstimation.gasLimit;
      msgData.gasPrice = feeEstimation.gasPrice;
    }

    const fee = {
      amount: [
        {
          amount: feeOptions
            ? new BigNumber(msgData.gasLimit)
                .multipliedBy(feeOptions.gasAdjustment || 1)
                .multipliedBy(msgData.gasPrice)
                .toFixed(0)
            : new BigNumber(msgData.gasPrice)
                .multipliedBy(10 ** this.provider.manifest.decimals)
                .toString(),
          denom: feeOptions?.gasFee.denom ?? this.provider.manifest.denom,
        },
      ],
      gas: new BigNumber(msgData.gasLimit)
        .multipliedBy(feeOptions?.gasAdjustment ?? 1)
        .toString(),
    };
    const acc = await this.provider.getAccount(msgData.from);

    return {
      msgs:
        typeUrl === '/ibc.applications.transfer.v1.MsgTransfer'
          ? msgs
          : msgData.msgs || msgs,
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

    const feeOptions = data.feeOptions;

    if (!data.gasLimit && !data.gasPrice && this.provider) {
      const [feeEstimation] = await this.provider.estimateFee(
        [this],
        speed || GasFeeSpeed.medium
      );
      if (feeEstimation.gasPrice && feeEstimation.gasLimit) {
        if (feeOptions) {
          const feeAbstractionEstimation = await this.provider.calculateFeeAbs(
            feeEstimation,
            feeOptions.gasFee.denom
          );
          if (!feeAbstractionEstimation.gasPrice) {
            throw new Error('Cannot calculate fee abstraction');
          }
          estimation.fee = new BigNumber(
            feeAbstractionEstimation.gasLimit.toString()
          )
            .multipliedBy(feeOptions.gasAdjustment)
            .multipliedBy(feeAbstractionEstimation.gasPrice.toString())
            .toFixed(0);
        } else {
          estimation.fee = new BigNumber(feeEstimation.gasLimit.toString())
            .multipliedBy(feeEstimation.gasPrice.toString())
            .dividedBy(10 ** this.provider.manifest.decimals)
            .toString();
        }
      }
    } else if (data.gasLimit && data.gasPrice) {
      estimation.fee = new BigNumber(data.gasLimit)
        .multipliedBy(feeOptions?.gasAdjustment ?? 1)
        .multipliedBy(data.gasPrice)
        .dividedBy(10 ** (feeOptions ? 0 : this.provider.manifest.decimals))
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

    if (
      (balance.asset.native && contract !== this.provider.manifest.denom) ||
      (msgData.feeOptions && msgData.feeOptions.gasFee.denom === contract)
    ) {
      const feeEstimation = await this.getFee();
      maxAmount = maxAmount.minus(feeEstimation.fee || 0);
    }

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}
