import { AxiosInstance } from 'axios';

/**
 * Builds a transaction from a JSON RPC provider
 * @param axiosProvider - The axios provider
 * @param from - The from address in hex
 * @param to - The to address in hex
 * @param amount - The amount
 * @param data - The parameters for contract call
 */
export const buildTransactionFromJsonRpc = async (
  axiosProvider: AxiosInstance,
  from: string,
  to: string,
  amount: number,
  data: string,
  gas?: number
) => {
  const response = await axiosProvider.post(
    '/jsonrpc',
    JSON.stringify({
      id: 1337,
      jsonrpc: '2.0',
      method: 'buildTransaction',
      params: [
        {
          from,
          to,
          value: `0x${BigInt(amount).toString(16)}`,
          data,
          gas: gas ? `0x${BigInt(gas).toString(16)}` : undefined,
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

  if (response.status == 200 && response.data.result) {
    return response.data.result.transaction;
  }

  throw new Error('Error Building Transaction!');
};
