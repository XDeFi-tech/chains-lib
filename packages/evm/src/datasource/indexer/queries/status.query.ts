import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';

export const GET_STATUS = (chain: string) => gql`
query GetStatus {
  ${chain} {
    status {
      lastBlock
    }
  }
}
`;

export const getStatus = (chain: string) => {
  return gqlClient.query({
    query: GET_STATUS(chain),
  });
};
