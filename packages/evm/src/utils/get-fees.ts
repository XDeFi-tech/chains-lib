import axios, { Axios } from 'axios';
import { FeeData, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';

import { EVMChains } from '../manifests';
import { DEFAULT_CONTRACT_FEE, gwei } from '../constants';
import { ChainMsg } from '../msg';
import { RestEstimateGasRequest } from '../types';

export const isEIP1559Supported = (chain: string): boolean => {
  // it is hardcoded value from our indexers details at packages/evm/src/datasource/indexer/queries/fees.query.ts
  return (
    chain !== EVMChains.aurora &&
    chain !== EVMChains.smartchain &&
    chain !== EVMChains.arbitrum
  );
};

export interface FeeMultipliers {
  low: number;
  medium: number;
  high: number;
}

export const getGasLimitFromRPC = async (
  msg: ChainMsg,
  rest?: Axios
): Promise<number> => {
  if (!rest) {
    rest = axios.create({ baseURL: msg.provider.manifest.rpcURL });
  }
  try {
    const msgData = msg.toData();
    let requestParams: RestEstimateGasRequest;
    if (msgData.contractAddress) {
      const { contractData } = await msg.getDataFromContract();
      requestParams = {
        from: msgData.from,
        to: contractData.to as string,
        value: contractData.value as string,
        data: contractData.data as string,
      };
    } else {
      requestParams = {
        from: msgData.from,
        to: msgData.to,
        ...(msgData.data && { data: msgData.data }),
      };
    }
    const { data: response } = await rest.post('/', {
      method: 'eth_estimateGas',
      params: [requestParams],
      id: 'get_gas_limit',
      jsonrpc: '2.0',
    });
    if (!response.result) {
      console.warn(
        'Empty response getGasLimitFromRPC from PRC, using default',
        requestParams,
        response
      );
      return DEFAULT_CONTRACT_FEE;
    }
    return parseInt(response.result);
  } catch (err) {
    console.warn(
      'Failed to fetch gas limit, using default',
      DEFAULT_CONTRACT_FEE
    );
    console.error(err);
    return DEFAULT_CONTRACT_FEE;
  }
};

/**
 * Fetches fees from the RPC endpoint. Returns the fees in gwei.
 *
 * @param msg {ChainMsg} - message to be sent
 * @param speed {GasFeeSpeed} - speed of the fee (low, medium, high)
 * @param multipliers {FeeMultipliers} - multipliers for low, medium, high fees
 * @param isEIP1559 {boolean} - whether the chain supports EIP1559, if not, fetches legacy fees
 */
export const getFeesFromRPC = async (
  msg: ChainMsg,
  speed: GasFeeSpeed,
  multipliers: FeeMultipliers = { low: 1, medium: 1.25, high: 1.5 },
  isEIP1559: boolean = isEIP1559Supported(msg.provider.manifest.chain)
): Promise<FeeData> => {
  try {
    /* Calculating prices */
    const rest = axios.create({ baseURL: msg.provider.manifest.rpcURL });

    if (!isEIP1559) {
      const { data } = await rest.post('/', {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: `default-fees-${msg.provider.manifest.chain}`,
      });

      if (!data?.result) {
        throw new Error('Failed to fetch default fees');
      }

      const defaultFees = {
        low: (data.result * multipliers.low) / gwei,
        medium: (data.result * multipliers.medium) / gwei,
        high: (data.result * multipliers.high) / gwei,
      };

      return {
        gasPrice: defaultFees[speed],
        gasLimit: await getGasLimitFromRPC(msg, rest),
      };
    }

    const baseFeePromise = rest.post('/', {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: `base-fees-${msg.provider.manifest.chain}`,
    });
    const priorityFeePromise = rest.post('/', {
      jsonrpc: '2.0',
      method: 'eth_maxPriorityFeePerGas',
      params: [],
      id: `priority-fee-per-gas-${msg.provider.manifest.chain}`,
    });

    const [baseFeeData, priorityFeeData] = await Promise.all([
      baseFeePromise,
      priorityFeePromise,
    ]);

    if (!baseFeeData?.data?.result || !priorityFeeData?.data?.result) {
      throw new Error('Failed to fetch eip1559 fees');
    }

    const baseFee = baseFeeData.data.result;
    const priorityFee = priorityFeeData.data.result;
    const maxPriorityFeePerGas = new BigNumber(priorityFee)
      .integerValue(BigNumber.ROUND_CEIL)
      .integerValue(BigNumber.ROUND_CEIL);

    const baseFees = {
      low: new BigNumber(baseFee)
        .multipliedBy(multipliers.low)
        .integerValue(BigNumber.ROUND_CEIL)
        .integerValue(BigNumber.ROUND_CEIL),
      medium: new BigNumber(baseFee)
        .multipliedBy(multipliers.medium)
        .integerValue(BigNumber.ROUND_CEIL)
        .integerValue(BigNumber.ROUND_CEIL),
      high: new BigNumber(baseFee)
        .multipliedBy(multipliers.high)
        .integerValue(BigNumber.ROUND_CEIL)
        .integerValue(BigNumber.ROUND_CEIL),
    };

    const eip1559Fees = {
      low: {
        baseFeePerGas: baseFees.low.toNumber(),
        maxPriorityFeePerGas: maxPriorityFeePerGas.toNumber(),
        maxFeePerGas: new BigNumber(baseFees.low)
          .plus(maxPriorityFeePerGas)
          .toNumber(),
      },
      medium: {
        baseFeePerGas: baseFees.medium.toNumber(),
        maxPriorityFeePerGas: maxPriorityFeePerGas.toNumber(),
        maxFeePerGas: new BigNumber(baseFees.medium)
          .plus(maxPriorityFeePerGas)
          .toNumber(),
      },
      high: {
        baseFeePerGas: baseFees.high.toNumber(),
        maxPriorityFeePerGas: maxPriorityFeePerGas.toNumber(),
        maxFeePerGas: new BigNumber(baseFees.high)
          .plus(maxPriorityFeePerGas)
          .toNumber(),
      },
    };

    return {
      gasPrice: undefined,
      gasLimit: await getGasLimitFromRPC(msg, rest),
      maxFeePerGas: eip1559Fees[speed].maxFeePerGas,
      baseFeePerGas: eip1559Fees[speed].baseFeePerGas,
      maxPriorityFeePerGas: eip1559Fees[speed].maxPriorityFeePerGas,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
