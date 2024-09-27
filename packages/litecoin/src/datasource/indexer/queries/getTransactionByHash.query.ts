import { gqlClient } from '@ctrl-tech/chains-core';
import { LitecoinGetTransactionByHashDocument } from '@ctrl-tech/chains-graphql';

export const getTransactionByHash = async (txHash: string) => {
  try {
    const response = await gqlClient.query({
      query: LitecoinGetTransactionByHashDocument,
      variables: {
        txHash,
      },
    });

    return response.data.litecoin.getTransactionByHashV5 || null;
  } catch (error) {
    console.error(`Error fetching transaction by hash for ${txHash}:`, error);
    return null;
  }
};
