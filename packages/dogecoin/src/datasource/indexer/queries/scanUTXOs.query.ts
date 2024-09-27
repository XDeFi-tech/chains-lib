import { gqlClient } from '@ctrl-tech/chains-core';
import {
  DogecoinScanUtxOsDocument,
  UnspentTransactionOutputV5,
} from '@ctrl-tech/chains-graphql';

export const scanUTXOs = async (
  address: string
): Promise<UnspentTransactionOutputV5[]> => {
  const response = await gqlClient.query({
    query: DogecoinScanUtxOsDocument,
    variables: {
      address,
      page: 0,
    },
  });

  return response.data.dogecoin.unspentTxOutputsV5;
};
