import { gqlClient } from '@ctrl-tech/chains-core';
import { GetTronTransactionsDocument } from '@ctrl-tech/chains-graphql';
import map from 'lodash/map';

export interface BlockRange {
  from: number;
  to: number;
}

export const getTransactions = async (
  address: string,
  blockRange: BlockRange | null
) => {
  const response = await gqlClient.query({
    query: GetTronTransactionsDocument,
    variables: {
      address,
      ...(blockRange && { blockRange }),
    },
  });

  return map(response.data.tron.transactions.edges, 'node');
};
