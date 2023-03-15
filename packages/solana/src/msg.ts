import { Msg as BasMsg } from '@xdefi/chains-core'
import BigNumber from 'bignumber.js'

export interface MsgBody {}

export interface FeeEstimation {
  fee: null | BigNumber
  maxFee: null | BigNumber
}

export class ChainMsg extends BasMsg<MsgBody, MsgBody, FeeEstimation> {
  public toData() {
    return this.data
  }
  buildTx() {
    return this.data
  }
  getFee() {
    return this.data
  }
}
