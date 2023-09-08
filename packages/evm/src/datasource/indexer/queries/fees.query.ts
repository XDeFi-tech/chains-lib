import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi-tech/chains-core';

import { EVMChains } from '../../../manifests';

export const EIP1559_GAS_FEES = (chain: string) => gql`
query EIP1559GasFees {
  ${chain} {
    fee {
      high {
        baseFeePerGas
        maxFeePerGas
        priorityFeePerGas
      }
      low {
        baseFeePerGas
        maxFeePerGas
        priorityFeePerGas
      }
      medium {
        baseFeePerGas
        maxFeePerGas
        priorityFeePerGas
      }
    }
  }
}
`;

export const DEFAULT_GAS_FEES = (chain: string) => gql`
query DefaultGasFees {
  ${chain} {
    fee {
      high
      low
      medium
    }
  }
}
`;

export const getFees = async (chain: string) => {
  let query;
  let indexerChain = chain;
  switch (chain) {
    case EVMChains.ethereum:
    case EVMChains.polygon:
    case EVMChains.avalanche:
      query = EIP1559_GAS_FEES(indexerChain);
      break;
    case EVMChains.smartchain:
      indexerChain = 'binanceSmartChain';
      query = DEFAULT_GAS_FEES(indexerChain);
      break;
    case EVMChains.fantom:
      query = DEFAULT_GAS_FEES(indexerChain);
      break;
    case EVMChains.arbitrum:
      query = DEFAULT_GAS_FEES(indexerChain);
      break;
    case EVMChains.aurora:
      query = DEFAULT_GAS_FEES(indexerChain);
      break;
  }

  if (!query) {
    throw new Error('Invalid chain');
  }

  const response = await gqlClient.query({
    query,
  });

  return response.data[indexerChain].fee;
};
