import { gqlClient } from '@xdefi-tech/chains-core';

import { DogecoinBroadcastTransactionDocument } from '../../../gql/graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: DogecoinBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.dogecoin.broadcastTransaction;
};
