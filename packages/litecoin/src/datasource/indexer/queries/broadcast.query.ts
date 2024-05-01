import { gqlClient } from '@xdefi-tech/chains-core';
import { LitecoinBroadcastTransactionDocument } from '@xdefi-tech/chains-graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: LitecoinBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.litecoin.broadcastTransaction;
};
