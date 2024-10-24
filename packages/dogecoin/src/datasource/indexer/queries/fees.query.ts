import { DefaultFeeOptions, gqlClient } from '@xdefi-tech/chains-core';

import { GetDogecoinFeesDocument } from '../../../gql/graphql';

export const getFees = async (): Promise<DefaultFeeOptions> => {
  const response = await gqlClient.query({
    query: GetDogecoinFeesDocument,
  });

  return response?.data.dogecoin.fee as DefaultFeeOptions;
};
