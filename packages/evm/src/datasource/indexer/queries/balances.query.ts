import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi-tech/chains-core';
import filter from 'lodash/filter';

import { EVMChains } from '../../../manifests';

export const GET_BALANCE = (chain: string) => gql`
query GetBalance($address: String!) {
  ${chain} {
    balances(address: $address) {
      address
      asset {
        symbol
        contract
        id
        name
        image
        chain
        decimals
        price {
          amount
          scalingFactor
        }
      }
      amount {
        value
        scalingFactor
      }
    }
  }
}
`;

export const getBalance = async (chain: EVMChains, address: string) => {
  let indexerChain: string = chain;
  switch (chain) {
    case EVMChains.smartchain:
      indexerChain = 'binanceSmartChain';
      break;
    case EVMChains.cantoevm:
      indexerChain = 'cantoEVM';
      break;
  }
  const response = await gqlClient.query({
    query: GET_BALANCE(indexerChain),
    variables: {
      address,
      first: 100,
    },
  });

  return filter(
    response.data[indexerChain].balances,
    (b: any) => b.asset.symbol && b.asset.id // cut off balances without asset
  );
};
