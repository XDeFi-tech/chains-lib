import { gql } from '@apollo/client';
import { gqlClient } from '@xdefi/chains-core';
import { SupportedChains } from '../chain.provider';

export const DEFAULT_GAS_FEES = (chain: string) => gql`
query DefaultGasFees {
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

export const EIP1559_GAS_FEES = (chain: string) => gql`
query EIP1559GasFees {
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
        case SupportedChains.ethereum:
        case SupportedChains.polygon:
        case SupportedChains.avalanche:
            query = EIP1559_GAS_FEES(chain);
            break;
        case SupportedChains.binancesmartchain:
        case SupportedChains.fantom:
            query = DEFAULT_GAS_FEES(chain);
            break;
        case SupportedChains.arbitrum:
        case SupportedChains.aurora:
            throw new Error('Not implemented yet');
    }

    if (!query) {
        throw new Error('Invalid chain');
    }

    return gqlClient.query({
        query
    });
};
