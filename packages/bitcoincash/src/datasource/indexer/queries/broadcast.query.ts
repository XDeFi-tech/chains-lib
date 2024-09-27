import { gqlClient } from '@ctrl-tech/chains-core';
import { BitcoinCashBroadcastTransactionDocument } from '@ctrl-tech/chains-graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: BitcoinCashBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.bitcoincash.broadcastTransaction;
};
