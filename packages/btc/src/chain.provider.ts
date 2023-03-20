import {
  DataSource,
  Chain,
  ChainDecorator,
  Coin,
  GasFee,
  GasFeeSpeed,
  Msg,
  MsgData,
  Response,
  Transaction,
  Balance,
} from '@xdefi/chains-core'
import 'reflect-metadata'
import { BitcoinChainMessage } from './bitcoinMessage'

@ChainDecorator('BtcProvider', {
  deps: [],
  providerType: 'btc',
})
export class BtcProvider extends Chain.Provider {
  rpcProvider = null

  constructor(dataSource: DataSource, options?: Chain.IOptions) {
    super(dataSource, options)
  }

  createMsg(data: MsgData): Msg {
    return new BitcoinChainMessage(data)
  }

  async getTransactions(
    address: string,
    afterBlock?: number | string
  ): Promise<Response<Transaction[], Transaction>> {
    return new Response(
      () => this.dataSource.getTransactions({ address, afterBlock }),
      () => this.dataSource.subscribeTransactions({ address })
    )
  }

  async estimateFee(msgs: Msg[], speed: GasFeeSpeed): Promise<Msg[]> {
    return this.dataSource.estimateFee(msgs, speed)
  }

  async getBalance(address: string): Promise<Response<Coin[], Balance[]>> {
    return new Response(
      () => this.dataSource.getBalance({ address }),
      () => this.dataSource.subscribeBalance({ address })
    )
  }

  async gasFeeOptions(): Promise<GasFee> {
    return this.dataSource.gasFeeOptions()
  }

  async getNonce(address: string): Promise<number> {
    return this.dataSource.getNonce(address)
  }

  async broadcast(msgs: Msg[]): Promise<Transaction[]> {
    throw new Error('Method not implemented.')
  }
}
