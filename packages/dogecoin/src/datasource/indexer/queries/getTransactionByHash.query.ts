import { gqlClient } from '@xdefi-tech/chains-core';
import { DogecoinGetTransactionByHashDocument } from '@xdefi-tech/chains-graphql';

export const getTransactionByHash = async (txHash: string) => {
  try {
    const response = await gqlClient.query({
      query: DogecoinGetTransactionByHashDocument,
      variables: {
        txHash,
      },
    });

    return response.data.dogecoin.getTransactionByHashV5 || null;
  } catch (error) {
    console.error('Error fetching transaction by hash', error);
    return null;
  }
};
