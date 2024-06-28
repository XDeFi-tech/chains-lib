import { gqlClient } from '@xdefi-tech/chains-core';

import {
  BitcoinCashScanUtxOsDocument,
  UnspentTransactionOutputV5,
} from '../../../gql/graphql';

export const scanUTXOs = async (
  address: string
): Promise<UnspentTransactionOutputV5[]> => {
  const response = await gqlClient.query({
    query: BitcoinCashScanUtxOsDocument,
    variables: {
      address,
      page: 0,
    },
  });

  return response.data.bitcoincash.unspentTxOutputsV5;
};
