import { gqlClient } from '@xdefi-tech/chains-core';
import { BitcoinBroadcastTransactionDocument } from '@xdefi-tech/chains-graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: BitcoinBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.bitcoin.broadcastTransaction;
};
