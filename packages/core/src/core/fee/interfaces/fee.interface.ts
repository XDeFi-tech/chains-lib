export enum GasFeeSpeed {
  high = 'high',
  medium = 'medium',
  low = 'low',
}

export type DefaultFee = number;
export type DefaultFeeOptions = { [speed in GasFeeSpeed]: DefaultFee };

export type EIP1559Fee = {
  baseFeePerGas: number;
  priorityFeePerGas: number;
  maxFeePerGas: number;
};
export type EIP1559FeeOptions = { [speed in GasFeeSpeed]: EIP1559Fee };

export type FeeOptions = DefaultFeeOptions | EIP1559FeeOptions;
