import {
  Asset,
  DataSource,
  Coin,
  FeeOptions,
  GasFeeSpeed,
  Transaction,
  Injectable,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeData,
} from '@xdefi-tech/chains-core';
import { Observable } from 'rxjs';
import cosmosclient from '@cosmos-client/core';
import axios, { Axios } from 'axios';
import Long from 'long';

import { ChainMsg } from '../../msg';
import * as manifests from '../../manifests';
import { AccountInfo } from '../../types';

import { getBalance, getTransactions } from './queries';

@Injectable()
export class IndexerDataSource extends DataSource {
  declare rpcProvider: cosmosclient.CosmosSDK;
  declare manifest: manifests.ThorManifest;
  public rest: Axios;

  constructor(manifest: manifests.ThorManifest) {
    super(manifest);
    this.rpcProvider = new cosmosclient.CosmosSDK(
      this.manifest.nodeURL,
      this.manifest.chainId
    );
    this.rest = axios.create({ baseURL: this.manifest.nodeURL });
  }

  async getNFTBalance(_address: string) {
    throw new Error('Method not implemented.');
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const balances = await getBalance(this.manifest.chain, address);
    // cut off balances without asset
    const filteredBalances = balances.filter(
      (b: any) => b.asset.symbol && b.asset.id
    );

    return filteredBalances.map((balance: any): Coin => {
      const { asset, amount } = balance;

      return new Coin(
        new Asset({
          id: asset.id,
          chainId: this.manifest.chainId,
          name: asset.name,
          symbol: asset.symbol,
          icon: asset.image,
          native: !Boolean(asset.contract),
          address: asset.contract,
          price: asset.price?.amount,
          decimals: asset.price?.scalingFactor,
        }),
        amount.value
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
    const transactions = await getTransactions(this.manifest.chain, address);

    return transactions.map((transaction) => {
      return Transaction.fromData(transaction);
    });
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
        const { data } = await this.rest.post('/cosmos/tx/v1beta1/simulate', {
          txBytes: tx.txBytes(),
        });
        result.push({
          gasLimit: Math.ceil(parseInt(data.gas_info.gas_used) * 1.4),
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
    return this.manifest.feeGasStep as unknown as FeeOptions;
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
