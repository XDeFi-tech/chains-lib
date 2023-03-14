import { Msg as BasMsg } from '@xdefi/chains-core'
import { BigNumber } from 'bignumber.js'
import { BigNumber as EthersBigNumber, utils } from 'ethers'

export enum MsgType {
  Legacy = 1,
  EIP1559 = 2,
}

export interface MsgBody {
  nonce: string
  to: string
  from: string
  value: string // ethers
  data?: string // 0x by default
  gasLimit?: number | EthersBigNumber
  gasPrice?: number | EthersBigNumber
  maxFeePerGas?: number | EthersBigNumber // number will be converted to BigNumber, BigNumber will be ignored
  maxPriorityFeePerGas?: number | EthersBigNumber
  type?: MsgType
  chainId: number
}

export interface FeeEstimation {
  fee: null | BigNumber
  maxFee: null | BigNumber
}

const toBigNumberUnit = (n: number | EthersBigNumber, unit: string) => {
  if (n instanceof EthersBigNumber) {
    return n
  }

  if (typeof n !== 'number') {
    throw new Error('Should be number or BigNumber')
  }

  return utils.parseUnits(String(n), unit)
}

export class ChainMsg extends BasMsg<MsgBody, MsgBody, FeeEstimation> {
  getFee(): FeeEstimation {
    const estimation: FeeEstimation = {
      fee: null,
      maxFee: null,
    }
    if (this.data.type === 2) {
      if (
        !this.data.maxFeePerGas ||
        !this.data.gasLimit ||
        !this.data.maxPriorityFeePerGas
      ) {
        return estimation
      }
      const maxFee = utils.parseUnits(String(this.data.maxFeePerGas), 'gwei')
      const priorityFee = utils.parseUnits(
        String(this.data.maxPriorityFeePerGas),
        'gwei'
      )
      const maxFeeWithPriority = maxFee.add(priorityFee)

      estimation.fee = BigNumber(
        utils.formatUnits(maxFee.mul(this.data.gasLimit), 'ether').toString()
      )
      estimation.maxFee = BigNumber(
        utils
          .formatUnits(maxFeeWithPriority.mul(this.data.gasLimit), 'ether')
          .toString()
      )
    } else {
      if (!this.data.gasPrice || !this.data.gasLimit) {
        return estimation
      }
      const gasPrice = utils.parseUnits(String(this.data.gasPrice), 'gwei')
      const gasFee = gasPrice.mul(this.data.gasLimit)

      estimation.fee = BigNumber(utils.formatUnits(gasFee, 'ether').toString())
    }

    return estimation
  }

  toData(): MsgBody {
    return {
      nonce: this.data?.nonce,
      to: this.data?.to,
      from: this.data?.from,
      value: this.data?.value,
      data: this.data?.data,
      gasLimit: this.data?.gasLimit,
      gasPrice: this.data?.gasPrice,
      maxFeePerGas: this.data?.maxFeePerGas,
      maxPriorityFeePerGas: this.data?.maxPriorityFeePerGas,
      type: this.data?.type,
      chainId: this.data.chainId,
    }
  }

  buildTx(): MsgBody {
    switch (this.data.type) {
      case MsgType.EIP1559:
        return {
          type: MsgType.EIP1559,
          nonce: this.data?.nonce,
          to: this.data?.to,
          from: this.data?.from,
          value: utils.parseEther(this.data.value).toHexString(),
          data: this.data?.data,
          gasLimit: this.data?.gasLimit,
          maxFeePerGas: toBigNumberUnit(this.data.maxFeePerGas, 'gwei'),
          maxPriorityFeePerGas: toBigNumberUnit(this.data.maxFeePerGas, 'gwei'),
          chainId: parseInt(this.data.chainId),
        }
      default:
        return {
          nonce: this.data?.nonce,
          to: this.data?.to,
          from: this.data?.from,
          value: utils.parseEther(this.data.value).toHexString(),
          data: this.data?.data,
          gasLimit: this.data?.gasLimit,
          gasPrice: toBigNumberUnit(this.data.gasPrice, 'gwei'),
          chainId: parseInt(this.data.chainId),
        }
    }
  }
}
