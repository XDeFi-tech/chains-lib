import { gqlClient } from '@xdefi-tech/chains-core';

import { BitcoinCashBroadcastTransactionDocument } from '../../../gql/graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: BitcoinCashBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.bitcoincash.broadcastTransaction;
};
