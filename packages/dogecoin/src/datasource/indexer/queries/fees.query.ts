import { GetDogecoinFeesDocument } from '@ctrl-tech/chains-graphql';
import { DefaultFeeOptions, gqlClient } from '@ctrl-tech/chains-core';

export const getFees = async (): Promise<DefaultFeeOptions> => {
  const response = await gqlClient.query({
    query: GetDogecoinFeesDocument,
    fetchPolicy: 'no-cache',
  });

  return response?.data.dogecoin.fee as DefaultFeeOptions;
};
