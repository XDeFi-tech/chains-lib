import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi-tech/chains-core';

import { EVMChains } from '../../../manifests';

export const GET_STATUS = (chain: string) => gql`
query GetStatus {
  ${chain} {
    status {
      lastBlock
    }
  }
}
`;

export const getStatus = async (chain: string) => {
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
    query: GET_STATUS(indexerChain),
  });

  return response.data[indexerChain].status;
};
