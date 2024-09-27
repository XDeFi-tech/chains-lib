import {
  GetBitcoinTransactionsDocument,
  Scalars,
  UtxoTransactionV2,
} from '@ctrl-tech/chains-graphql';
import { gqlClient } from '@ctrl-tech/chains-core';

export const getTransactions = async (
  chain: string,
  address: Scalars['String']
): Promise<Array<UtxoTransactionV2>> => {
  const response = await gqlClient.query({
    query: GetBitcoinTransactionsDocument,
    variables: {
      address,
      pageNumber: 1,
      pageSize: 1000,
    },
  });

  return response.data.bitcoin.transactionsV2;
};
