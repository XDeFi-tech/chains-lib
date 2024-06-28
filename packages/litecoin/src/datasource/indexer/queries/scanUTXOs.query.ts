import { gqlClient } from '@xdefi-tech/chains-core';

import {
  LitecoinScanUtxOsDocument,
  UnspentTransactionOutputV5,
} from '../../../gql/graphql';

export const scanUTXOs = async (
  address: string
): Promise<UnspentTransactionOutputV5[]> => {
  const response = await gqlClient.query({
    query: LitecoinScanUtxOsDocument,
    variables: {
      address,
      page: 0,
    },
  });

  return response.data.litecoin.unspentTxOutputsV5;
};
