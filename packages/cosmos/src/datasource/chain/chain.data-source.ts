import {
  Asset,
  DataSource,
  Coin,
  GasFeeSpeed,
  Transaction,
  Injectable,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeOptions,
  FeeData,
  getCryptoAssets,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import {
  Coin as CosmosCoin,
  LcdClient,
  setupBankExtension,
} from '@cosmjs/launchpad';
import cosmosclient from '@cosmos-client/core';
import { uniqBy } from 'lodash';
import { Account } from '@cosmjs/stargate';
import axios, { AxiosInstance } from 'axios';
import {
  TxRaw,
  AuthInfo,
  Fee,
  TxBody,
  SignerInfo,
} from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';

import { CryptoAssetArgs } from '../../gql/graphql';
import * as manifests from '../../manifests';
import { ChainMsg } from '../../msg';
import { COSMOS_ADDRESS_CHAIN } from '../../manifests';
import { MsgSwapExactAmountIn } from '../../proto_export/osmosis/gamm/v1beta1/tx';
import { MsgSwapExactAmountIn as MsgSwapExactAmountInPoolManager } from '../../proto_export/osmosis/poolmanager/v1beta1/tx';
import { MsgTransfer } from '../../proto_export/ibc/applications/transfer/v1/tx';
import { isIBCPayload } from '../../utils';

@Injectable()
export class ChainDataSource extends DataSource {
  private readonly cosmosSDK: cosmosclient.CosmosSDK;
  declare readonly manifest: manifests.CosmosManifest;
  private readonly lcdAxiosClient: AxiosInstance;

  constructor(manifest: manifests.CosmosManifest) {
    super(manifest);
    this.cosmosSDK = new cosmosclient.CosmosSDK(
      this.manifest.lcdURL,
      this.manifest.chainId
    );
    this.rpcProvider = LcdClient.withExtensions(
      { apiUrl: this.manifest.lcdURL },
      setupBankExtension
    );
    this.lcdAxiosClient = axios.create({
      baseURL: this.manifest.lcdURL,
      headers: {
        'Cache-Control': 'no-cache', // Additional header to suggest no caching
      },
    });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;

    const response = await this.lcdAxiosClient.get(
      `cosmos/bank/v1beta1/balances/${address}?timestamp=${new Date().getTime()}`
    );

    const balances = response.data.balances as CosmosCoin[];
    const chain =
      COSMOS_ADDRESS_CHAIN[
        this.manifest.chain as keyof typeof COSMOS_ADDRESS_CHAIN
      ];
    const cryptoAssetsInput = balances.map<CryptoAssetArgs>(({ denom }) => ({
      chain: chain,
      contract: this.manifest.denom === denom ? null : denom,
    }));
    const {
      data: {
        assets: { cryptoAssets: assets },
      },
    } = await getCryptoAssets(cryptoAssetsInput);

    return balances.reduce((result: Coin[], { amount }, index) => {
      const asset = assets && assets[index];
      if (!asset) {
        return result;
      }

      const coin = new Coin(
        new Asset({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: asset.id!,
          chainId: this.manifest.chainId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: asset!.name!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          symbol: asset.symbol!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          icon: asset.image,
          native: !Boolean(asset.contract),
          address: asset.contract,
          price: asset.price?.amount,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          decimals: asset.decimals!,
        }),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        new BigNumber(amount).dividedBy(10 ** asset.decimals!)
      );

      result.push(coin);
      return result;
    }, []);
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  private async _getTransactionEvent(
    event: 'transfer.sender' | 'transfer.recipient',
    address: string
  ) {
    return await cosmosclient.rest.tx.getTxsEvent(
      this.cosmosSDK,
      [`${event}='${address}'`],
      undefined,
      undefined,
      BigInt(10)
    );
  }

  async getTransactions(filter: TransactionsFilter): Promise<Transaction[]> {
    const { address } = filter;
    const [sender, recipient] = await Promise.all([
      this._getTransactionEvent('transfer.recipient', address),
      this._getTransactionEvent('transfer.sender', address),
    ]);
    const formattedTransactions = uniqBy(
      [
        ...(sender?.data?.tx_responses || []),
        ...(recipient?.data?.tx_responses || []),
      ],
      'txhash'
    );
    return formattedTransactions.map((tx: any) =>
      Transaction.fromData({
        status: 'success',
        hash: tx.data.txhash,
        timestamp: tx.data.timestamp,
        msgs: [],
        fee: {
          value: '',
          asset: null,
        },
      })
    );
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
    const _feeAmount = msgs.map((m) => {
      const messageData = m.toData();
      if (messageData.feeOptions) {
        return {
          denom: messageData.feeOptions.gasFee.denom,
          amount: new BigNumber(this.manifest.feeGasStep[speed])
            .multipliedBy(10 ** this.manifest.decimals)
            .toString(),
        };
      }
      return {
        denom: this.manifest.denom,
        amount: new BigNumber(this.manifest.feeGasStep[speed])
          .multipliedBy(10 ** this.manifest.decimals)
          .toString(),
      };
    });

    for (let index = 0; index < msgs.length; index++) {
      const m = msgs[index];
      let messageData =
        m.encoding === 'string' ? await m.buildTx() : await m.toData();
      fromAddress = messageData.from;
      if (isIBCPayload(messageData)) {
        const iBCTransferMsgs = await m.provider.createIBCTransferMsg(
          messageData
        );
        messageData = iBCTransferMsgs[0];
      }
      const _msgs: any[] = [];
      if (messageData.msgs?.length) {
        messageData.msgs.map((msgTransfer: any) => {
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
            fee: Fee.fromPartial({
              amount: _feeAmount as any,
            }),
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
    return this.manifest.feeGasStep;
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
