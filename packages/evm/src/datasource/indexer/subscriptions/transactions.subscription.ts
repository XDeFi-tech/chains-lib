import { gql } from '@apollo/client';
import { EVMChains } from '../../../manifests';
import { gqlClient } from '@xdefi/chains-core';

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
`

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
            address
        }
    })
}