import { gql } from 'graphql-tag';
import { gqlClient } from '@ctrl-tech/chains-core';

import { EVMChains } from '../../../manifests';

export const ETHEREUM_TRANSACTIONS_SUBSCRIPTION = gql`
  subscription Transactions {
    ethereumTransactions {
      hash
      timestamp
      status
      fromAddress
      toAddress
    }
  }
`;

export const subscribeTransactions = (chain: EVMChains, address: string) => {
  let query;
  switch (chain) {
    case EVMChains.ethereum:
      query = ETHEREUM_TRANSACTIONS_SUBSCRIPTION;
      break;
    default:
      throw new Error('Not implemented yet');
  }

  return gqlClient.subscribe({
    query,
    variables: {
      address,
    },
  });
};
