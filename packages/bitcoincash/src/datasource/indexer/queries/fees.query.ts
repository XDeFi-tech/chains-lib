import { GetBitcoinCashFeesDocument } from '@ctrl-tech/chains-graphql';
import { DefaultFeeOptions, gqlClient } from '@ctrl-tech/chains-core';

export const getFees = async (): Promise<DefaultFeeOptions> => {
  const response = await gqlClient.query({
    query: GetBitcoinCashFeesDocument,
    fetchPolicy: 'no-cache',
  });

  return response?.data.bitcoincash.fee as DefaultFeeOptions;
};
