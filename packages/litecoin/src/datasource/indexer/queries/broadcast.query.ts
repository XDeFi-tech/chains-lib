import { gqlClient } from '@ctrl-tech/chains-core';
import { LitecoinBroadcastTransactionDocument } from '@ctrl-tech/chains-graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: LitecoinBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.litecoin.broadcastTransaction;
};
