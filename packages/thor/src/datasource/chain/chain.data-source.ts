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
import cosmosclient from '@cosmos-client/core';
import axios, { Axios } from 'axios';
import BigNumber from 'bignumber.js';
import { uniqBy } from 'lodash';
import {
  AddressChain,
  CryptoAssetArgs,
  getCryptoAssets,
} from '@xdefi-tech/chains-graphql';
import Long from 'long';

import { ChainMsg } from '../../msg';
import * as manifests from '../../manifests';
import { AccountInfo } from '../../types';

@Injectable()
export class ChainDataSource extends DataSource {
  declare rpcProvider: cosmosclient.CosmosSDK;
  declare manifest: manifests.ThorManifest;
  public rest: Axios;

  constructor(manifest: manifests.ThorManifest) {
    super(manifest);
    this.rpcProvider = new cosmosclient.CosmosSDK(
      this.manifest.rpcURL,
      this.manifest.chainId
    );
    this.rest = axios.create({ baseURL: this.manifest.rpcURL });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Current chain do not support NFTs');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const { data: resp } = await this.rest.get<{ balances: Array<any> }>(
      `/cosmos/bank/v1beta1/balances/${address}`
    );

    const chain =
      this.manifest.chain === 'thorchain'
        ? ('THORChain' as AddressChain)
        : ('MAYAChain' as AddressChain);

    const cryptoAssetsInput = resp.balances.map<CryptoAssetArgs>(
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

    return resp.balances.reduce((result: Coin[], { amount }, index) => {
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
      this.rpcProvider,
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
    const result: FeeData[] = [];
    const DEFAULT_FEE_DATA = {
      gasLimit: 200000,
      gasPrice: this.manifest.feeGasStep[speed],
    };
    for (const msg of msgs) {
      try {
        const { txBody, account } = await msg.buildTx();
        if (!txBody) {
          result.push(DEFAULT_FEE_DATA);
          continue;
        }

        const authInfo = new cosmosclient.proto.cosmos.tx.v1beta1.AuthInfo({
          signer_infos: [
            {
              mode_info: {
                single: {
                  mode: cosmosclient.proto.cosmos.tx.signing.v1beta1.SignMode
                    .SIGN_MODE_DIRECT,
                },
              },
              sequence: Long.fromString(account?.sequence || '0'),
            },
          ],
          fee: {
            amount: null,
          },
        });

        const tx = new cosmosclient.TxBuilder(
          this.rpcProvider,
          txBody,
          authInfo
        );
        tx.addSignature(new Uint8Array(64));
        const { data } = await this.rest.get('/thorchain/network');

        result.push({
          gasLimit: Math.ceil(parseInt(data.native_outbound_fee_rune) * 1.4),
          gasPrice: this.manifest.feeGasStep[speed],
        });
      } catch (err) {
        console.error('Error while estimating fee');
        console.error(err);
        result.push(DEFAULT_FEE_DATA);
      }
    }
    return result;
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    return this.manifest.feeGasStep;
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async getAccount(address: string): Promise<AccountInfo | null> {
    try {
      const { data: resp } = await this.rest.get(
        `/cosmos/auth/v1beta1/accounts/${address}`
      );
      return resp.account;
    } catch (err) {
      return null;
    }
  }
}
