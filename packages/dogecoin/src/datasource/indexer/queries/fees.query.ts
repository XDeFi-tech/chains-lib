import { GetDogecoinFeesDocument } from '@xdefi-tech/chains-graphql';
import { DefaultFeeOptions, gqlClient } from '@xdefi-tech/chains-core';

export const getFees = async (): Promise<DefaultFeeOptions> => {
  const response = await gqlClient.query({
    query: GetDogecoinFeesDocument,
    fetchPolicy: 'no-cache',
  });

  return response?.data.dogecoin.fee as DefaultFeeOptions;
};
