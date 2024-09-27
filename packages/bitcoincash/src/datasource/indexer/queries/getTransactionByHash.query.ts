import { gqlClient } from '@ctrl-tech/chains-core';
import { BitcoinCashGetTransactionByHashDocument } from '@ctrl-tech/chains-graphql';

export const getTransactionByHash = async (txHash: string) => {
  try {
    const response = await gqlClient.query({
      query: BitcoinCashGetTransactionByHashDocument,
      variables: {
        txHash,
      },
    });

    return response.data.bitcoincash.getTransactionByHashV5 || null;
  } catch (error) {
    console.error(`Error fetching transaction by hash for ${txHash}:`, error);
    return null;
  }
};
