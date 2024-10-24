import { DefaultFeeOptions, gqlClient } from '@xdefi-tech/chains-core';

import { GetBitcoinCashFeesDocument } from '../../../gql/graphql';

export const getFees = async (): Promise<DefaultFeeOptions> => {
  const response = await gqlClient.query({
    query: GetBitcoinCashFeesDocument,
  });

  return response?.data.bitcoincash.fee as DefaultFeeOptions;
};
