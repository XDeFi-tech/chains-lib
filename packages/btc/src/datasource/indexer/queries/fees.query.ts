import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';

export const GET_FEES = gql`
  query GetFees($filter: String) {
    chains(filter: $filter) {
      name
      fee {
        value
      }
    }
  }
`;

export type GetFeesResponse = {
  chains: {
    name: string;
    fee: {
      value: string;
    };
  }[];
};

export const getFees = () => {
  return gqlClient.query<GetFeesResponse>({
    query: GET_FEES,
    variables: {
      filter: 'Bitcoin',
    },
    fetchPolicy: 'no-cache',
  });
};
