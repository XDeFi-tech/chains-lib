import { gqlClient } from '@xdefi-tech/chains-core';
import {
  BitcoinCashGetTransactionByHashDocument,
  UtxotransactionByHashV5,
} from '@xdefi-tech/chains-graphql';

export const getTransactionByHash = async (
  txHash: string
): Promise<Partial<UtxotransactionByHashV5> | null> => {
  try {
    const response = await gqlClient.query({
      query: BitcoinCashGetTransactionByHashDocument,
      variables: {
        txHash,
      },
    });

    return response.data.bitcoincash.getTransactionByHashV5 || null;
  } catch (error) {
    console.error('Error fetching transaction by hash', error);
    return null;
  }
};
