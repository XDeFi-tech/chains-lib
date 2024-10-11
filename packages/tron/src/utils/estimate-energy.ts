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
