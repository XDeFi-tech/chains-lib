import { AxiosInstance } from 'axios';

import { TronEnergyEstimate } from '../msg';

export const estimateEnergy = async (
  axiosProvider: AxiosInstance,
  sender: string,
  contractAddress: string,
  selector: string,
  params: string
): Promise<TronEnergyEstimate> => {
  const response = await axiosProvider.post(
    '/wallet/triggerconstantcontract',
    JSON.stringify({
      owner_address: sender,
      contract_address: contractAddress,
      function_selector: selector,
      parameter: params,
      visible: true,
    }),
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status === 200 && response.data.energy_used) {
    return {
      energy: parseInt(response.data.energy_used),
      willRevert: response.data.transaction.ret[0].ret === 'FAILED',
    };
  }

  throw new Error('Error Estimating Energy!');
};

export const estimateEnergyForRawTx = async (
  axiosProvider: AxiosInstance,
  transaction: any
) => {
  const { raw_data } = transaction;
  const contract = raw_data.contract[0].parameter.value;
  const response = await axiosProvider.post(
    '/jsonrpc',
    JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_estimateGas',
      params: [
        {
          to: contract.contract_address,
          from: contract.owner_address,
          value: `0x${BigInt(contract.call_value).toString(16)}`,
          data: contract.data,
        },
      ],
    }),
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.status === 200 && response.data.result) {
    return Number(response.data.result);
  }
  throw new Error('Error Estimating Energy!');
};
