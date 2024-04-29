import { gql } from 'graphql-tag';
import { gqlClient } from '@xdefi-tech/chains-core';
export * from './transactions.query';
export * from './balances.query';
export * from './fees.query';
export * from './nfts.query';

export const scanUTXOs = async (
  address: string,
  page = 0
): Promise<
  Array<{
    oTxHash: string;
    oIndex: number;
    value: {
      value: number;
    };
    oTxHex: string;
  }>
> => {
  const response = await gqlClient.query({
    query: gql`
      query scanUTXOs($address: String!, $page: Int!) {
        bitcoin {
          unspentTxOutputsV5(address: $address, page: $page) {
            oTxHash
            oIndex
            value {
              value
            }
            oTxHex
          }
        }
      }
    `,
    variables: {
      address,
      page,
    },
  });

  return response.data.bitcoin.unspentTxOutputsV5 as Array<{
    oTxHash: string;
    oIndex: number;
    value: {
      value: number;
    };
    oTxHex: string;
  }>;
};

export const getTransaction = async (txid: string): Promise<any> => {
  throw new Error('Method not implemented.');
};

export const broadcastQuery = gql`
  query broadcast($rawHex: String!) {
    bitcoin {
      broadcastTransaction(rawHex: $rawHex)
    }
  }
`;

export const broadcast = async (rawHex: string): Promise<string> => {
  const response = await gqlClient.query({
    query: broadcastQuery,
    variables: {
      rawHex,
    },
  });

  return response.data.bitcoin.broadcastTransaction as string;
};
