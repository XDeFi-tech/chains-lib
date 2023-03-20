import { Msg as BaseMsg } from '@xdefi/chains-core'
import BigNumber from 'bignumber.js'

export interface BitcoinMessageBody {
  feeEstimation: FeeEstimation
}

export interface BitcoinTxBody {
  data: any
}

export interface FeeEstimation {
  fee: null | BigNumber
  maxFee: null | BigNumber
}

export class BitcoinChainMessage extends BaseMsg<
  BitcoinMessageBody,
  BitcoinTxBody,
  FeeEstimation
> {
  declare data: BitcoinMessageBody

  constructor(data: BitcoinMessageBody) {
    super(data)
    if (!this.data.feeEstimation) {
      this.data.feeEstimation = { fee: null, maxFee: null }
    }
  }

  public toData() {
    return this.data
  }
  async buildTx() {
    return this.data
  }
  setFees(feeEstimation: FeeEstimation) {
    this.data.feeEstimation = feeEstimation

    return this
  }
  getFee() {
    return this.data.feeEstimation
  }
}
