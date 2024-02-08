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
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import { LcdClient, setupBankExtension } from '@cosmjs/launchpad';
import {
  AddressChain,
  getCryptoAssets,
  CryptoAssetArgs,
} from '@xdefi-tech/chains-graphql';
import cosmosclient from '@cosmos-client/core';
import { uniqBy, capitalize } from 'lodash';
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

import * as manifests from '../../manifests';
import { ChainMsg } from '../../msg';

@Injectable()
export class ChainDataSource extends DataSource {
  private readonly cosmosSDK: cosmosclient.CosmosSDK;
  declare readonly manifest: manifests.CosmosManifest;
  private readonly lcdAxiosClient: AxiosInstance;

  constructor(manifest: manifests.CosmosManifest) {
    super(manifest);
    this.rpcProvider = LcdClient.withExtensions(
      { apiUrl: this.manifest.lcdURL },
      setupBankExtension
    );
    this.cosmosSDK = new cosmosclient.CosmosSDK(
      this.manifest.lcdURL,
      this.manifest.chainId
    );
    this.lcdAxiosClient = axios.create({
      baseURL: this.manifest.lcdURL,
    });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const client = LcdClient.withExtensions(
      { apiUrl: this.manifest.lcdURL },
      setupBankExtension
    );
    const balances = await client.bank.balances(address);
    const chain = capitalize(this.manifest.chain) as AddressChain;
    const cryptoAssetsInput = balances.result.map<CryptoAssetArgs>(
      ({ denom }) => ({
        chain: chain,
        contract: this.manifest.denom === denom ? null : denom,
      })
    );
    const {
      data: {
        assets: { cryptoAssets: assets },
      },
    } = await getCryptoAssets(cryptoAssetsInput);

    return balances.result.reduce((result: Coin[], { amount }, index) => {
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
    const _msgs = msgs.map((m) => {
      const messageData = m.toData();
      fromAddress = messageData.from;
      return {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: MsgSend.encode({
          fromAddress: messageData.from,
          toAddress: messageData.to,
          amount: [
            {
              denom: this.manifest.denom,
              amount: String(
                messageData.amount * Math.pow(10, this.manifest.decimals)
              ),
            },
          ],
        }).finish(),
      };
    });

    const account = await this.getAccount(fromAddress);
    if (!account) {
      return [
        {
          gasLimit: 200000,
          gasPrice: this.manifest.feeGasStep[speed],
        },
      ];
    }
    const tx = TxRaw.encode({
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
            sequence: account.sequence.toString(),
          }),
        ],
        fee: Fee.fromPartial({
          amount: [],
        }),
      }).finish(),
      signatures: [new Uint8Array(64)],
    }).finish();
    const { data } = await this.lcdAxiosClient.post(
      '/cosmos/tx/v1beta1/simulate',
      {
        txBytes: Buffer.from(tx).toString('base64'),
      }
    );

    return [
      {
        gasLimit: Math.ceil(parseInt(data.gas_info.gas_used) * 2),
        gasPrice: this.manifest.feeGasStep[speed],
      },
    ];
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
