import { gqlClient } from '@ctrl-tech/chains-core';
import { BitcoinBroadcastTransactionDocument } from '@ctrl-tech/chains-graphql';

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: BitcoinBroadcastTransactionDocument,
    variables: {
      rawHex,
    },
  });

  return response.data.bitcoin.broadcastTransaction;
};
