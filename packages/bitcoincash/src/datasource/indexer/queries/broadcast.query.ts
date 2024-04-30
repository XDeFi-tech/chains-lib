import { gqlClient } from '@xdefi-tech/chains-core';
import { BitcoinCashBroadcastTransactionDocument } from '@xdefi-tech/chains-graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: BitcoinCashBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.bitcoincash.broadcastTransaction;
};
