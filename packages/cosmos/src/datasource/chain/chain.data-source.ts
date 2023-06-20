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
import { uniqBy } from 'lodash';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import {
  QueryClient,
  setupTxExtension,
  setupAuthExtension,
  accountFromAny,
} from '@cosmjs/stargate';
import { Any } from 'cosmjs-types/google/protobuf/any';
import { Pubkey } from '@cosmjs/amino';

import { ChainMsg } from '../../msg';
import * as manifests from '../../manifests';
import { CosmosManifest } from '../../manifests';

const DEFAULT_GAS_FEE = 20000;

const nativeDenoms = [
  'uatom',
  'uosmo',
  'uaxl',
  'inj',
  'ujuno',
  'ucre',
  'ukava',
  'ustars',
  'uakt',
  'basecro',
  'ukuji',
  'usei',
  'ustrd',
  'umars',
];

@Injectable()
export class ChainDataSource extends DataSource {
  private readonly cosmosSDK: cosmosclient.CosmosSDK;
  declare readonly manifest: CosmosManifest;

  constructor(manifest: manifests.CosmosManifest) {
    super(manifest);
    this.rpcProvider = LcdClient.withExtensions(
      { apiUrl: this.manifest.rpcURL },
      setupBankExtension
    );
    this.cosmosSDK = new cosmosclient.CosmosSDK(
      this.manifest.rpcURL,
      this.manifest.chainId
    );
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const client = LcdClient.withExtensions(
      { apiUrl: this.manifest.rpcURL },
      setupBankExtension
    );
    const balances = await client.bank.balances(address);
    const cryptoAssetsInput = balances.result.map<CryptoAssetArgs>(
      ({ denom }) => ({
        chain: this.manifest.chain as AddressChain,
        contract: nativeDenoms.includes(denom) ? null : denom,
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
    return formattedTransactions.map((tx: any) => Transaction.fromData(tx));
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(msgs: ChainMsg[], _speed: GasFeeSpeed): Promise<FeeData[]> {
    const client = await Tendermint34Client.connect(this.manifest.lcdURL);
    const authExtension = setupAuthExtension(
      QueryClient.withExtensions(client)
    );
    const txExtension = setupTxExtension(QueryClient.withExtensions(client));
    const senderAddress = msgs[0].toData().from;
    const account = await authExtension.auth.account(senderAddress);

    if (!account) {
      return [];
    }

    const senderAccount = accountFromAny(account);
    const _msgs = [
      // msgAny,
      {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: msgs.map((m) => m.buildTx()),
      },
    ];
    const encodedMsgs: Any[] = _msgs.map((m) =>
      Any.fromJSON({
        typeUrl: m.typeUrl,
        value: btoa(JSON.stringify(m.value)),
      })
    );
    const simResponse = await txExtension.tx.simulate(
      encodedMsgs,
      undefined,
      senderAccount.pubkey as Pubkey,
      Number(0)
    );

    // eslint-disable-next-line no-console
    console.log('simResponse', simResponse);
    return [
      {
        gasLimit: simResponse?.gasInfo?.gasWanted.toString() || DEFAULT_GAS_FEE,
        gasPrice: undefined,
      },
    ];
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
