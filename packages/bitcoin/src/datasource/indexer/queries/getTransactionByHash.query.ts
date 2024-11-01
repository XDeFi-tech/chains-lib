import { gqlClient } from '@xdefi-tech/chains-core';
import { gql } from 'graphql-tag';

export const BITCOIN_GET_TRANSACTION_BY_HASH = gql`
  query GetTransactionByHash($txHash: String!) {
    bitcoin {
      getTransactionByHashV5(txHash: $txHash) {
        hash
        outputs {
          address
          amount {
            value
          }
        }
        inputs {
          address
          amount {
            value
          }
        }
        blockNumber
      }
    }
  }
`;

export const getTransactionByHash = async (txHash: string) => {
  try {
    const response = await gqlClient.query({
      query: BITCOIN_GET_TRANSACTION_BY_HASH,
      variables: {
        txHash,
      },
    });

    return response.data.bitcoin.getTransactionByHashV5 || null;
  } catch (error) {
    console.error(`Error fetching transaction by hash for ${txHash}:`, error);
    return null;
  }
};
