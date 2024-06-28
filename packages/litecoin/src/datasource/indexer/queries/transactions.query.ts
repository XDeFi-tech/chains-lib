import { gqlClient } from '@xdefi-tech/chains-core';

import {
  GetLitecoinTransactionsDocument,
  Scalars,
  UtxoTransactionV2,
} from '../../../gql/graphql';

export const getTransactions = async (
  chain: string,
  address: Scalars['String']
): Promise<Array<UtxoTransactionV2>> => {
  const response = await gqlClient.query({
    query: GetLitecoinTransactionsDocument,
    variables: {
      address,
      pageNumber: 1,
      pageSize: 1000,
    },
  });

  return response.data.litecoin.transactionsV2;
};
