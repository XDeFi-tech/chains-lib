import {
  GetLitecoinTransactionsDocument,
  Scalars,
  UtxoTransactionV2,
} from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

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

  return response.data.litecoin.transactions;
};
