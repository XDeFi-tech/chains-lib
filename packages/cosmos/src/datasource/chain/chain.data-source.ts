import {
  Asset,
  DataSource,
  Coin,
  GasFeeSpeed,
  Transaction,
  Injectable,
  Chain,
  TransactionsFilter,
  BalanceFilter,
  Balance,
  FeeOptions,
  FeeData,
} from '@xdefi/chains-core';
import { Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import {
  LcdClient,
  setupBankExtension,
  setupAuthExtension,
  CosmosClient,
} from '@cosmjs/launchpad';

import { ChainMsg } from '../../msg';

import { getAssets } from './queries';

@Injectable()
export class ChainDataSource extends DataSource {
  constructor(manifest: Chain.Manifest) {
    super(manifest);
  }

  async getBalance(filter: BalanceFilter): Promise<Coin[]> {
    const { address } = filter;
    const client = LcdClient.withExtensions(
      { apiUrl: this.manifest.rpcURL },
      setupBankExtension,
      setupAuthExtension
    );
    console.log('client', client);

    // balances
    const balances = await client.bank.balances(address);
    console.log('balances', balances);
    // const symbols = balances.map(({ denom }) => denom);
    // const assets = await getAssets(symbols);

    // transactions
    // const account = await client.txsQuery(
    //   `tx.height=${0}&message.action=send&transfer.recipient=${address}`
    // );

    // console.log('account', account);

    return [];

    // return balances.reduce((result: Coin[], { amount, denom }) => {
    //   const asset = assets.data.assets.tokens.page.edges.find(
    //     (a) => a.node.symbol === denom
    //   );
    //
    //   if (!asset) {
    //     return result;
    //   }
    //
    //   const coin = new Coin(
    //     new Asset({
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //       id: asset.id!,
    //       chainId: this.manifest.chainId,
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //       name: asset.name!,
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //       symbol: asset.symbol!,
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //       icon: asset.image!,
    //       native: !Boolean(asset.contract),
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //       address: asset.contract!,
    //       price: asset.price?.amount,
    //       decimals: asset.price?.scalingFactor,
    //     }),
    //     new BigNumber(amount.value).dividedBy(10 ** amount.scalingFactor)
    //   );
    //
    //   result.push(coin);
    // }, []);
  }

  async subscribeBalance(
    _filter: BalanceFilter
  ): Promise<Observable<Balance[]>> {
    throw new Error('Method not implemented.');
  }

  async getTransactions(_filter: TransactionsFilter): Promise<Transaction[]> {
    return [];
    // // todo refactor copy from extension
    // let blockNumber = 0
    //
    // for (const key of ['transfer.sender', 'transfer.recipient']) {
    //   try {
    //     // NOTE: That's very unreliable and often timeout
    //     const txOne = await rest.tx.getTxsEvent(
    //       this.sdks[this.getActiveNetwork()],
    //       [`${key}='${address}'`],
    //       undefined,
    //       undefined,
    //       BigInt(10)
    //     )
    //
    //     if (txOne.data.tx_responses) {
    //       const total = BigInt(txOne.data.pagination?.total ?? '0')
    //       if (total === BigInt(0)) {
    //         continue
    //       }
    //
    //       // get 10 latest
    //       let offset = total - BigInt(10)
    //       if (offset < 0) {
    //         offset = BigInt(0)
    //       }
    //
    //       const events = await rest.tx.getTxsEvent(
    //         this.sdks[this.getActiveNetwork()],
    //         [`${key}='${address}'`],
    //         undefined,
    //         offset,
    //         BigInt(10)
    //       )
    //
    //       if (events.data.tx_responses) {
    //         events.data.tx_responses.forEach((event) => {
    //           txs.push(event)
    //
    //           if (event.height && parseInt(event.height, 10) > blockNumber) {
    //             blockNumber = parseInt(event.height, 10)
    //           }
    //         })
    //       }
    //     }
    //   } catch (e) {
    //     logger.error(`Failed to fetch cosmos based txs:`, e)
    //   }
    // }
    //
    // if (!txs.length) return
    // const transactions: Transaction[] =
    //   txs.reverse().reduce((arr, parsedTx) => {
    //     try {
    //       if (!parsedTx.logs) return arr
    //       // get first log
    //       const transferEvent = parsedTx.logs[0]?.events?.find(
    //         (log: any) => log.type === 'transfer'
    //       )
    //       if (!transferEvent) return arr
    //       let sender: string | undefined,
    //         recipient: string | undefined,
    //         amount: string | undefined,
    //         denom: string | undefined = undefined
    //         let decimals: number = 0;
    //       forEach(transferEvent.attributes, (atr) => {
    //         switch (atr.key) {
    //           case 'sender':
    //             sender = atr.value
    //             break
    //           case 'recipient':
    //             recipient = atr.value
    //             break
    //           case 'amount':
    //             const match = atr.value?.match(/[a-z]/)
    //             if (
    //               match === null ||
    //               match === undefined ||
    //               match.index === undefined
    //             ) {
    //               amount = '0'
    //               denom = this.nativeAssetString
    //               break
    //             }
    //             amount = atr.value?.substring(0, match.index)
    //             denom = atr.value?.substring(match.index)
    //             if (denom === this.nativeAssetString) {
    //               denom = CHAINS[this.chainType].symbol
    //               decimals = CHAINS[this.chainType].decimals
    //             }
    //             if (denom) {
    //               const tokenInfo = this.getTokenInfo(denom)
    //               if (tokenInfo) {
    //                 denom = tokenInfo.symbol
    //                 decimals = tokenInfo.decimals ?? Decimals.A0
    //               } else {
    //                 denom = denom.substring(0, 10)
    //               }
    //             }
    //             if (amount) {
    //               amount = formatUnits(amount, decimals)
    //             }
    //             break
    //         }
    //       })
    //       if (!sender || !recipient) return arr
    //       const isSender = sender === address
    //       const tx: Transaction = {
    //         from: sender,
    //         to: recipient,
    //         action: isSender ? 'send' : 'receive',
    //         hash: parsedTx.txhash ?? '',
    //         amount: amount ?? '0',
    //         status: 'successful',
    //         symbol: denom ?? this.nativeAssetString,
    //         isSender,
    //         date: parsedTx.timestamp
    //           ? new Date(parsedTx.timestamp)
    //           : new Date(),
    //         chainId: this.chainType,
    //       }
    //
    //       arr.push(tx)
    //     } catch (e) {
    //       logger.info('Failed to fetch transactions for cosmos based chain', e)
    //     }
    //     return arr
    //   }, [] as Transaction[]) ?? []
  }

  async subscribeTransactions(
    _filter: TransactionsFilter
  ): Promise<Observable<Transaction>> {
    throw new Error('Method not implemented.');
  }

  async estimateFee(
    _msgs: ChainMsg[],
    _speed: GasFeeSpeed
  ): Promise<FeeData[]> {
    throw new Error('Method not implemented.');
  }

  async gasFeeOptions(): Promise<FeeOptions | null> {
    throw new Error('Method not implemented.');
  }

  async getNonce(_address: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
