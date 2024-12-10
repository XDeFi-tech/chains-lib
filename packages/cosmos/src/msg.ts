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
import { toUtf8 } from '@cosmjs/encoding';

import { MsgTransfer } from './proto_export/ibc/applications/transfer/v1/tx';
import { MessageComposer as MessageComposerIbc } from './proto_export/ibc/applications/transfer/v1/tx.registry';
import { AminoConverter as AminoConverterIbc } from './proto_export/ibc/applications/transfer/v1/tx.amino';
import { AminoConverter as AminoConverterCosmos } from './proto_export/cosmos/bank/v1beta1/tx.amino';
import { MessageComposer as MessageComposerCosmos } from './proto_export/cosmos/bank/v1beta1/tx.registry';
import { MsgSend } from './proto_export/cosmos/bank/v1beta1/tx';
import type { CosmosProvider } from './chain.provider';
import { MsgSwapExactAmountIn } from './proto_export/osmosis/gamm/v1beta1/tx';
import { MessageComposer as MessageComposerGamm } from './proto_export/osmosis/gamm/v1beta1/tx.registry';
import { MessageComposer as MessageComposerPoolManager } from './proto_export/osmosis/poolmanager/v1beta1/tx.registry';
import { AminoConverter as AminoConverterGamm } from './proto_export/osmosis/gamm/v1beta1/tx.amino';
import { AminoConverter } from './proto_export/osmosis/poolmanager/v1beta1/tx.amino';
import { MsgSwapExactAmountIn as PoolManagerMsgSwapExactAmountIn } from './proto_export/osmosis/poolmanager/v1beta1/tx';
import { isIBCPayload } from './utils';

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
  accountNumber?: string | bigint;
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

  private getIBCTransferMsg(rawMsg: any, signMode: CosmosSignMode) {
    const ibcCheck = rawMsg.token.denom.split('/');
    if (ibcCheck?.[0] === 'ibc') {
      rawMsg.token.denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
    }

    let parser: (input: any) => MsgTransfer = MsgTransfer.fromPartial;
    if (signMode === CosmosSignMode.SIGN_AMINO) {
      parser = MsgTransfer.fromAmino;
      if (rawMsg.timeout_timestamp) {
        rawMsg.timeout_timestamp = Long.fromValue(
          rawMsg.timeout_timestamp
        ).toString();
      }
    } else {
      if (rawMsg.timeoutTimestamp) {
        rawMsg.timeoutTimestamp = Long.fromValue(rawMsg.timeoutTimestamp);
      }
    }

    const ibcTransfer = parser(rawMsg);

    return MessageComposerIbc.withTypeUrl.transfer(ibcTransfer);
  }

  private getSwapMsg(rawMsg: any, signMode: CosmosSignMode) {
    let parser: (input: any) => MsgSwapExactAmountIn =
      MsgSwapExactAmountIn.fromPartial;
    if (signMode === CosmosSignMode.SIGN_AMINO) {
      parser = MsgSwapExactAmountIn.fromAmino;
      rawMsg.token_in.amount = rawMsg.token_in.amount.toString();
      const ibcCheck = rawMsg.token_in.denom.split('/');
      if (ibcCheck?.[0] === 'ibc') {
        rawMsg.tokenIn.denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
      }
      rawMsg.token_out_min_amount = rawMsg.token_out_min_amount.toString();
    } else {
      rawMsg.tokenIn.amount = rawMsg.tokenIn.amount.toString();
      const ibcCheck = rawMsg.tokenIn.denom.split('/');
      if (ibcCheck?.[0] === 'ibc') {
        rawMsg.tokenIn.denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
      }
      rawMsg.tokenOutMinAmount = rawMsg.tokenOutMinAmount.toString();
    }
    const msgSwapExactAmountIn = parser(rawMsg);
    return MessageComposerGamm.withTypeUrl.swapExactAmountIn(
      msgSwapExactAmountIn
    );
  }

  private getSwapMsgPoolManager(rawMsg: any, signMode: CosmosSignMode) {
    let parser: (input: any) => PoolManagerMsgSwapExactAmountIn =
      PoolManagerMsgSwapExactAmountIn.fromPartial;
    if (signMode === CosmosSignMode.SIGN_AMINO) {
      parser = PoolManagerMsgSwapExactAmountIn.fromAmino;
      if (!rawMsg.token_in) return;
      if (!rawMsg.token_out_min_amount) return;
      rawMsg.token_in.amount = rawMsg.token_in?.amount.toString();
      const ibcCheck = rawMsg.token_in.denom?.split('/');
      if (ibcCheck?.[0] === 'ibc') {
        rawMsg.token_in.denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
      }
      rawMsg.token_out_min_amount = rawMsg.token_out_min_amount.toString();
      const msgSwapExactAmountIn = parser(rawMsg);
      return MessageComposerPoolManager.withTypeUrl.swapExactAmountIn(
        msgSwapExactAmountIn
      );
    } else {
      rawMsg.tokenIn.amount = rawMsg.tokenIn.amount.toString();
      const ibcCheck = rawMsg.tokenIn.denom.split('/');
      if (ibcCheck?.[0] === 'ibc') {
        rawMsg.tokenIn.denom = `ibc/${ibcCheck?.[1]?.toUpperCase()}`;
      }
      rawMsg.tokenOutMinAmount = rawMsg.tokenOutMinAmount.toString();
      const msgSwapExactAmountIn = parser(rawMsg);
      return MessageComposerPoolManager.withTypeUrl.swapExactAmountIn(
        msgSwapExactAmountIn
      );
    }
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

  getMsgToSend(): { typeUrl: string; value: any }[] {
    const msgData = this.toData();
    let msgs;
    let typeUrl = msgData.typeUrl;

    if (typeUrl && typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
      // transferring IBC token
      msgs = msgData.msgs ?? [];
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
            msg: toUtf8(
              JSON.stringify({
                transfer_nft: {
                  recipient: msgData.to,
                  token_id: msgData.nftId,
                },
              })
            ),
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
    return msgs;
  }

  async buildTx() {
    let msgData = this.toData();
    let signMode = CosmosSignMode.SIGN_DIRECT;
    const isAmino = (EncodingTypes: object, key: string): boolean => {
      return Object.values(EncodingTypes).find(
        (converter) => converter.aminoType === key
      );
    };

    if (this.encoding === MsgEncoding.string) {
      if (!msgData.data || typeof msgData.data !== 'string') {
        throw new Error(
          'Invalid msg data, see examples to build msg from data'
        );
      }
      const { signDoc, signer } = JSON.parse(msgData.data);
      const isDirectSignDoc = (signDoc: any): signDoc is DirectSignDoc => {
        return !!signDoc?.bodyBytes;
      };
      const { fee, memo, msgs, sequence, account_number } = signDoc;
      if (isDirectSignDoc(signDoc)) {
        return {
          signMode,
          raw: true,
          signDoc,
          msgs: [],
          from: signer ?? msgData.from,
          to: '',
          value: 0,
        };
      }
      const encodedMsgs = msgs.map((signDocMsg: any) => {
        const key: string =
          signDocMsg?.['@type'] ||
          signDocMsg?.['type'] ||
          signDocMsg?.typeUrl ||
          '';
        const rawMsg = signDocMsg?.value ?? signDocMsg;

        const isIBCTransfer =
          AminoConverterIbc[key as keyof typeof AminoConverterIbc];
        const isIBCTransferAmino = isAmino(AminoConverterIbc, key);
        if (isIBCTransfer || isIBCTransferAmino) {
          if (isIBCTransferAmino) signMode = CosmosSignMode.SIGN_AMINO;
          return this.getIBCTransferMsg(rawMsg, signMode);
        }

        const isMsgSwapExactAmountIn =
          AminoConverterGamm[key as keyof typeof AminoConverterGamm];
        const isMsgSwapExactAmountInAmino = isAmino(AminoConverterGamm, key);
        if (isMsgSwapExactAmountIn || isMsgSwapExactAmountInAmino) {
          if (isMsgSwapExactAmountInAmino) signMode = CosmosSignMode.SIGN_AMINO;
          return this.getSwapMsg(rawMsg, signMode);
        }
        const isMsgSwapExactAmountInPoolManager =
          AminoConverter[key as keyof typeof AminoConverter];

        const isMsgSwapExactAmountInPoolManagerAmino = isAmino(
          AminoConverter,
          key
        );

        if (
          isMsgSwapExactAmountInPoolManager ||
          isMsgSwapExactAmountInPoolManagerAmino
        ) {
          if (isMsgSwapExactAmountInPoolManagerAmino)
            signMode = CosmosSignMode.SIGN_AMINO;
          return this.getSwapMsgPoolManager(rawMsg, signMode);
        }

        const isMsgSend =
          AminoConverterCosmos[key as keyof typeof AminoConverterCosmos];
        const isMsgSendAmino = isAmino(AminoConverterCosmos, key);
        if (isMsgSend || isMsgSendAmino) {
          if (isMsgSendAmino) signMode = CosmosSignMode.SIGN_AMINO;
          return this.getMsgSend(rawMsg);
        }

        if (key === '/cosmwasm.wasm.v1.MsgExecuteContract') {
          return this.getExecuteContract(rawMsg);
        }
      });

      return {
        signMode,
        raw: false,
        signDoc,
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
        from: signer ?? msgData.from,
        to: '',
        value: 0,
      };
    }
    const _msgs = [];
    if (isIBCPayload(msgData)) {
      const iBCTransferMsgs = await this.provider.createIBCTransferMsg(msgData);
      msgData = iBCTransferMsgs[0];
    } else {
      _msgs.push(...this.getMsgToSend());
    }
    const feeOptions = msgData.feeOptions;

    if (!msgData.gasLimit || !msgData.gasPrice) {
      const [feeEstimation] = await this.provider.estimateFee(
        [this],
        GasFeeSpeed.medium
      );
      msgData.gasLimit = msgData.gasLimit ?? feeEstimation.gasLimit;
      if (!msgData?.gasPrice || msgData?.gasPrice <= 0)
        msgData.gasPrice = feeEstimation.gasPrice;
    }

    const fee = {
      amount: [
        {
          amount: new BigNumber(msgData.gasLimit)
            .multipliedBy(feeOptions?.gasAdjustment ?? 1)
            .multipliedBy(msgData.gasPrice)
            .toFixed(0, BigNumber.ROUND_CEIL),
          denom: feeOptions?.gasFee.denom ?? this.provider.manifest.denom,
        },
      ],
      gas: new BigNumber(msgData.gasLimit)
        .multipliedBy(feeOptions?.gasAdjustment ?? 1)
        .toString(),
    };
    const acc = await this.provider.getAccount(msgData.from);

    const msgs = _msgs.length > 0 ? _msgs : msgData.msgs || _msgs;
    return {
      msgs,
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
      typeUrl: msgs[0].typeUrl,
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
          if (isNaN(Number(feeAbstractionEstimation.gasPrice))) {
            throw new Error('Cannot calculate fee abstraction');
          }
          estimation.fee = new BigNumber(
            feeAbstractionEstimation.gasLimit.toString()
          )
            .multipliedBy(feeOptions.gasAdjustment)
            .multipliedBy(feeAbstractionEstimation.gasPrice!.toString())
            .toFixed(0);
        } else {
          estimation.fee = new BigNumber(feeEstimation.gasLimit.toString())
            .multipliedBy(feeEstimation.gasPrice.toString())
            .integerValue(BigNumber.ROUND_CEIL)
            .dividedBy(10 ** this.provider.manifest.decimals)
            .toString();
        }
      }
    } else if (!isNaN(Number(data.gasPrice)) && !isNaN(Number(data.gasLimit))) {
      estimation.fee = new BigNumber(data.gasLimit)
        .multipliedBy(feeOptions?.gasAdjustment ?? 1)
        .multipliedBy(data.gasPrice)
        .dividedBy(10 ** (feeOptions ? 0 : this.provider.manifest.decimals))
        .toString();
    }

    return estimation;
  }

  async getMaxAmountToSend() {
    const msgData = this.toData();
    const balances = await this.provider.getBalance(msgData.from);
    const gap = new BigNumber(this.provider.manifest?.maxGapAmount || 0);

    const balance = (await balances.getData()).find(
      (b) =>
        b.asset.chainId === this.provider.manifest.chainId && b.asset.native
    );

    if (!balance) throw new Error('No balance found');
    const { fee } = await this.getFee(GasFeeSpeed.high);

    const maxAmount: BigNumber = new BigNumber(balance.amount)
      .minus(fee || 0)
      .minus(gap);

    if (maxAmount.isLessThan(0)) {
      return '0';
    }

    return maxAmount.toString();
  }
}
