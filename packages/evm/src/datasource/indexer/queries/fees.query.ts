import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';

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

export const getFees = (chain: string) => {
  let query;
  switch (chain) {
    case EVMChains.ethereum:
    case EVMChains.polygon:
    case EVMChains.avalanche:
      query = EIP1559_GAS_FEES(chain);
      break;
    case EVMChains.binancesmartchain:
    case EVMChains.fantom:
      query = DEFAULT_GAS_FEES(chain);
      break;
    case EVMChains.arbitrum:
    case EVMChains.aurora:
      throw new Error('Not implemented yet');
  }

  if (!query) {
    throw new Error('Invalid chain');
  }

  return gqlClient.query({
    query,
  });
};
