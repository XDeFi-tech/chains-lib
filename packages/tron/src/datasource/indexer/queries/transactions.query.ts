import { gqlClient } from '@xdefi-tech/chains-core';
import map from 'lodash/map';

import { GetTronTransactionsDocument } from '../../../gql/graphql';

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
