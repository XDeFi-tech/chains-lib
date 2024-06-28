import { DefaultFeeOptions, gqlClient } from '@xdefi-tech/chains-core';

import { GetBitcoinFeesDocument } from '../../../gql/graphql';

export const getFees = async (): Promise<DefaultFeeOptions> => {
  const response = await gqlClient.query({
    query: GetBitcoinFeesDocument,
    fetchPolicy: 'no-cache',
  });

  return response?.data.bitcoin.fee as DefaultFeeOptions;
};
