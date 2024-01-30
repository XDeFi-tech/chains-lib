import { gql } from 'graphql-tag';
import { gqlClient } from '@xdefi-tech/chains-core';
import map from 'lodash/map';

export const GET_TRANSACTION_WITH_PAGINATION = () => gql`
  query GetTronTransactions($address: String!, $first: Int) {
    tron {
      transactions(address: $address, first: $first) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            hash
            blockIndex
            blockNumber
            status
            value
            timestamp
            fromAddress
            transfers {
              amount {
                value
              }
              asset {
                ... on CryptoAsset {
                  chain
                  contract
                  decimals
                  id
                  image
                  name
                  price {
                    amount
                    scalingFactor
                  }
                  symbol
                }
              }
              fromAddress
              toAddress
            }
          }
        }
      }
    }
  }
`;

export interface BlockRange {
  from: number;
  to: number;
}

export const getTransactions = async (
  address: string,
  blockRange: BlockRange | null
) => {
  const response = await gqlClient.query({
    query: GET_TRANSACTION_WITH_PAGINATION(),
    variables: {
      address,
      ...(blockRange && { blockRange }),
    },
  });

  return map(response.data.tron.transactions.edges, 'node');
};
