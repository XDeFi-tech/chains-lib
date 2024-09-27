import { gqlClient } from '@ctrl-tech/chains-core';
import {
  BitcoinCashScanUtxOsDocument,
  UnspentTransactionOutputV5,
} from '@ctrl-tech/chains-graphql';

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
