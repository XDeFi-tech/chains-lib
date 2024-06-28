import { DefaultFeeOptions, gqlClient } from '@xdefi-tech/chains-core';

import { GetLitecoinFeesDocument } from '../../../gql/graphql';

export const getFees = async (): Promise<DefaultFeeOptions> => {
  const response = await gqlClient.query({
    query: GetLitecoinFeesDocument,
    fetchPolicy: 'no-cache',
  });

  return response?.data.litecoin.fee as DefaultFeeOptions;
};
