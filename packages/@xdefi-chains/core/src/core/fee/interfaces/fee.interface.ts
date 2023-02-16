export enum GasFeeSpeed {
    high = 'high',
    medium = 'medium',
    low = 'low',
}

export interface EIP1559Fee {
    baseFeePerGas: number;
    priorityFeePerGas: number;
    maxFeePerGas: number;
}

export type DefaultFee = EIP1559Fee & number;

export type GasFee = null | {
    [speed in GasFeeSpeed]: EIP1559Fee | DefaultFee;
};