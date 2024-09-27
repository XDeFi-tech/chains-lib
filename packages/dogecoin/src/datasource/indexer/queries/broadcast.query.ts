import { gqlClient } from '@ctrl-tech/chains-core';
import { DogecoinBroadcastTransactionDocument } from '@ctrl-tech/chains-graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: DogecoinBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.dogecoin.broadcastTransaction;
};
