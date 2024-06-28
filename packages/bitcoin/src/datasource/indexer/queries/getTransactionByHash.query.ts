import { gqlClient } from '@xdefi-tech/chains-core';

import { BitcoinGetTransactionByHashDocument } from '../../../gql/graphql';

export const getTransactionByHash = async (txHash: string) => {
  try {
    const response = await gqlClient.query({
      query: BitcoinGetTransactionByHashDocument,
      variables: {
        txHash,
      },
    });

    return response.data.bitcoin.getTransactionByHashV5 || null;
  } catch (error) {
    console.error(`Error fetching transaction by hash for ${txHash}:`, error);
    return null;
  }
};
