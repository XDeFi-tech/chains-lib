import { gqlClient } from '@xdefi-tech/chains-core';
import {
  BitcoinScanUtxOsDocument,
  UnspentTransactionOutputV5,
} from '@xdefi-tech/chains-graphql';

export const scanUTXOs = async (
  address: string
): Promise<UnspentTransactionOutputV5[]> => {
  const response = await gqlClient.query({
    query: BitcoinScanUtxOsDocument,
    variables: {
      address,
      page: 0,
    },
  });

  return response.data.bitcoin.unspentTxOutputsV5;
};
