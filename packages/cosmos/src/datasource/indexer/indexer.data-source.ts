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
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import {
  accountFromAny,
  QueryClient,
  setupAuthExtension,
  Account,
} from '@cosmjs/stargate';
import axios, { AxiosInstance } from 'axios';
import {
  AuthInfo,
  Fee,
  SignerInfo,
  TxBody,
  TxRaw,
} from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';

import { ChainMsg } from '../../msg';
import * as manifests from '../../manifests';
import { CosmosHubChains } from '../../manifests';

import { getBalance, getFees, getTransactions } from './queries';

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

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const {
      data: { cosmos },
    } = await getBalance(this.manifest.chain as CosmosHubChains, address);
    // cut off balances without asset
    const balances = cosmos.balances.filter(
      (b) => b.asset.symbol && b.asset.id
    );

    return balances.map((balance): Coin => {
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
          decimals: asset.price?.scalingFactor,
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

    const {
      data: { cosmos },
    } = await getTransactions(this.manifest.chain as CosmosHubChains, address);

    return cosmos.transactions.edges.map((transaction) => {
      return Transaction.fromData(transaction);
    });
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

    const gasFeeOptions = await this.gasFeeOptions();

    return [
      {
        gasLimit: Math.ceil(parseInt(data.gas_info.gas_used) * 1.4),
        gasPrice: gasFeeOptions
          ? (gasFeeOptions[speed] as number)
          : this.manifest.feeGasStep[speed],
      },
    ];
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    const { data } = await getFees();
    if (!data.cosmos.fee) {
      return null;
    }
    return {
      [GasFeeSpeed.high]:
        data.cosmos.fee.high || this.manifest.feeGasStep[GasFeeSpeed.high],
      [GasFeeSpeed.medium]:
        data.cosmos.fee.medium || this.manifest.feeGasStep[GasFeeSpeed.medium],
      [GasFeeSpeed.low]:
        data.cosmos.fee.low || this.manifest.feeGasStep[GasFeeSpeed.low],
    };
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async getAccount(address: string): Promise<null | Account> {
    const client = await Tendermint34Client.connect(this.manifest.rpcURL);
    const authExtension = setupAuthExtension(
      QueryClient.withExtensions(client)
    );
    let acc = null;

    try {
      acc = await authExtension.auth.account(address);
    } catch (err) {}

    if (!acc) {
      return null;
    }

    return accountFromAny(acc);
  }
}
