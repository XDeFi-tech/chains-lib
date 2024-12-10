import {
  Asset,
  Balance,
  BalanceFilter,
  Coin,
  DataSource,
  FeeData,
  FeeOptions,
  GasFeeSpeed,
  Injectable,
  Transaction,
  TransactionsFilter,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import { LcdClient, setupBankExtension } from '@cosmjs/launchpad';
import { Account } from '@cosmjs/stargate';
import axios, { AxiosInstance } from 'axios';
import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
  TxRaw,
} from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';

import { ChainMsg } from '../../msg';
import * as manifests from '../../manifests';
import { CosmosHubChains } from '../../manifests';
import { MsgSwapExactAmountIn } from '../../proto_export/osmosis/gamm/v1beta1/tx';
import { MsgSwapExactAmountIn as MsgSwapExactAmountInPoolManager } from '../../proto_export/osmosis/poolmanager/v1beta1/tx';
import { MsgTransfer } from '../../proto_export/ibc/applications/transfer/v1/tx';
import { MsgSend } from '../../proto_export/cosmos/bank/v1beta1/tx';
import { isIBCPayload, sanitiseMsg } from '../../utils';

import { getBalance, getFees, getTransactions, getNFTBalance } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare readonly manifest: manifests.CosmosManifest;
  private readonly lcdAxiosClient: AxiosInstance;

  constructor(manifest: manifests.CosmosManifest) {
    super(manifest);
    this.rpcProvider = LcdClient.withExtensions(
      { apiUrl: this.manifest.lcdURL },
      setupBankExtension
    );
    this.lcdAxiosClient = axios.create({
      baseURL: this.manifest.lcdURL,
    });
  }

  async getNFTBalance(address: string) {
    return getNFTBalance(this.manifest.chain, address);
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const balances = await getBalance(
      this.manifest.chain as CosmosHubChains,
      address
    );
    // cut off balances without asset
    const formattedBalances = balances.filter(
      (b) => b.asset.symbol && b.asset.id
    );

    return formattedBalances.map((balance): Coin => {
      const { asset, amount } = balance;

      return new Coin(
        new Asset({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: asset.id!,
          chainId: this.manifest.chainId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: asset.name!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          symbol: asset.symbol!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          icon: asset.image!,
          native: !Boolean(asset.contract),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          address: asset.contract!,
          price: asset.price?.amount,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          decimals: asset.decimals!,
          priceChange: {
            dayPriceChange: asset.price?.dayPriceChange,
          },
          type: asset.type,
          categories: asset.categories,
        }),
        new BigNumber(amount.value).dividedBy(10 ** (asset.decimals as number))
      );
    });
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;

    const transactions = await getTransactions(
      this.manifest.chain as CosmosHubChains,
      address
    );

    return transactions.map((tx) => {
      return Transaction.fromData({
        status: tx.status,
        hash: tx.hash,
        timestamp: tx.timestamp,
        msgs: tx.transfers.map((transfer) => ({
          from: transfer.fromAddress,
          to: transfer.toAddress,
          amount: transfer.amount.value,
          asset: transfer.asset,
        })),
        fee: {
          value: tx.fee?.amount[0].amount.value,
          asset: tx.fee?.amount[0].asset,
        },
      });
    });
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(msgs: ChainMsg[], speed: GasFeeSpeed): Promise<FeeData[]> {
    let fromAddress = '';
    const feeData: FeeData[] = [];
    const gasFeeOptions = await this.gasFeeOptions();
    for (let index = 0; index < msgs.length; index++) {
      const m = msgs[index];
      let messageData =
        m.encoding === 'string' ? await m.buildTx() : await m.toData();
      fromAddress = messageData.from;
      const _msgs: any[] = [];
      if (isIBCPayload(messageData)) {
        const iBCTransferMsgs = await m.provider.createIBCTransferMsg(
          messageData
        );
        messageData = iBCTransferMsgs[0];
      }
      if (messageData.msgs?.length) {
        messageData.msgs.map((msgTransfer: any) => {
          msgTransfer.value = sanitiseMsg(msgTransfer.value);
          if (msgTransfer.typeUrl === MsgTransfer.typeUrl) {
            _msgs.push({
              typeUrl: MsgTransfer.typeUrl,
              value: MsgTransfer.encode(
                MsgTransfer.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (
            msgTransfer.typeUrl === MsgSwapExactAmountInPoolManager.typeUrl
          ) {
            _msgs.push({
              typeUrl: MsgSwapExactAmountInPoolManager.typeUrl,
              value: MsgSwapExactAmountInPoolManager.encode(
                MsgSwapExactAmountInPoolManager.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (msgTransfer.typeUrl === MsgSwapExactAmountIn.typeUrl) {
            _msgs.push({
              typeUrl: MsgSwapExactAmountIn.typeUrl,
              value: MsgSwapExactAmountIn.encode(
                MsgSwapExactAmountIn.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (msgTransfer.typeUrl === MsgSend.typeUrl) {
            _msgs.push({
              typeUrl: MsgSend.typeUrl,
              value: MsgSend.encode(
                MsgSend.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (msgTransfer.typeUrl === MsgExecuteContract.typeUrl) {
            _msgs.push({
              typeUrl: MsgExecuteContract.typeUrl,
              value: MsgExecuteContract.encode(
                MsgExecuteContract.fromPartial(msgTransfer.value)
              ).finish(),
            });
          }
        });
      } else {
        const msgsToSend = m.getMsgToSend();
        msgsToSend.map((msgTransfer: any) => {
          if (msgTransfer.typeUrl === MsgTransfer.typeUrl) {
            _msgs.push({
              typeUrl: MsgTransfer.typeUrl,
              value: MsgTransfer.encode(
                MsgTransfer.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (
            msgTransfer.typeUrl === MsgSwapExactAmountInPoolManager.typeUrl
          ) {
            _msgs.push({
              typeUrl: MsgSwapExactAmountInPoolManager.typeUrl,
              value: MsgSwapExactAmountInPoolManager.encode(
                MsgSwapExactAmountInPoolManager.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (msgTransfer.typeUrl === MsgSwapExactAmountIn.typeUrl) {
            _msgs.push({
              typeUrl: MsgSwapExactAmountIn.typeUrl,
              value: MsgSwapExactAmountIn.encode(
                MsgSwapExactAmountIn.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (msgTransfer.typeUrl === MsgSend.typeUrl) {
            _msgs.push({
              typeUrl: MsgSend.typeUrl,
              value: MsgSend.encode(
                MsgSend.fromPartial(msgTransfer.value)
              ).finish(),
            });
          } else if (msgTransfer.typeUrl === MsgExecuteContract.typeUrl) {
            _msgs.push({
              typeUrl: MsgExecuteContract.typeUrl,
              value: MsgExecuteContract.encode(
                MsgExecuteContract.fromPartial(msgTransfer.value)
              ).finish(),
            });
          }
        });
      }
      const account = await this.getAccount(fromAddress);
      if (!account) {
        feeData.push({
          gasLimit: 200000,
          gasPrice: this.manifest.feeGasStep[speed],
        });
        continue;
      }
      let tx;
      if (messageData.signDoc?.bodyBytes) {
        tx = TxRaw.encode({
          bodyBytes: Uint8Array.from(
            Object.values(messageData.signDoc.bodyBytes)
          ),
          authInfoBytes: Uint8Array.from(
            Object.values(messageData.signDoc.authInfoBytes)
          ),
          signatures: [new Uint8Array(64)],
        }).finish();
      } else {
        tx = TxRaw.encode({
          bodyBytes: TxBody.encode(
            TxBody.fromPartial({
              messages: _msgs,
              memo: undefined,
            })
          ).finish(),
          authInfoBytes: AuthInfo.encode({
            signerInfos: [
              SignerInfo.fromPartial({
                modeInfo: {
                  single: {
                    mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
                  },
                  multi: void 0,
                },
                sequence: BigInt(account.sequence),
              }),
            ],
            fee: Fee.fromPartial({}),
          }).finish(),
          signatures: [new Uint8Array(64)],
        }).finish();
      }
      const { data } = await this.lcdAxiosClient
        .post('/cosmos/tx/v1beta1/simulate', {
          txBytes: Buffer.from(tx).toString('base64'),
        })
        .catch((e) => {
          throw new Error(e?.response?.data?.message ?? 'Error');
        });

      feeData.push({
        gasLimit: Math.ceil(parseInt(data.gas_info.gas_used) * 2),
        gasPrice: gasFeeOptions
          ? (gasFeeOptions[speed] as number)
          : this.manifest.feeGasStep[speed],
      });
    }

    return feeData;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    const fee = await getFees(this.manifest.chain);
    if (!fee) {
      return null;
    }
    return {
      [GasFeeSpeed.high]:
        fee.high || this.manifest.feeGasStep[GasFeeSpeed.high],
      [GasFeeSpeed.medium]:
        fee.medium || this.manifest.feeGasStep[GasFeeSpeed.medium],
      [GasFeeSpeed.low]: fee.low || this.manifest.feeGasStep[GasFeeSpeed.low],
    };
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async getAccount(address: string): Promise<null | Account> {
    let acc = null;

    try {
      const { data } = await this.lcdAxiosClient.get(
        `/cosmos/auth/v1beta1/accounts/${address}`
      );
      acc = data.account;
    } catch (err) {}

    if (!acc) {
      return null;
    }

    return {
      address: acc.address,
      accountNumber: parseInt(acc.account_number),
      sequence: parseInt(acc.sequence),
      pubkey: acc.pub_key
        ? {
            type: acc.pub_key['@type'],
            value: acc.pub_key.key,
          }
        : null,
    };
  }
}
