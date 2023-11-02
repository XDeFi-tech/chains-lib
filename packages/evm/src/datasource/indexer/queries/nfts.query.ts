import { gql } from '@apollo/client';
import { gqlClient, LEGACY_NFTS_FRAGMENT } from '@xdefi-tech/chains-core';

export const ARBITRUM_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    arbitrum {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const AURORA_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    aurora {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const AVALANCHE_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    avalanche {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const FANTOM_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    fantom {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const BINANCE_SMART_CHAIN_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    binanceSmartChain {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const CRONOS_EVM_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    cronosEVM {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const ETHEREUM_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    ethereum {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const POLYGON_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    polygon {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const CANTO_EVM_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    cantoEVM {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const OPTIMISM_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    optimism {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const GNOSIS_NFTS_QUERY = gql`
  query NFTS($address: String!) {
    gnosis {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const getNFTBalance = async (chain: string, address: string) => {
  let query;
  let chainName;

  switch (chain.trim().toLowerCase()) {
    case 'arbitrum':
      query = ARBITRUM_NFTS_QUERY;
      chainName = 'arbitrum';
      break;
    case 'aurora':
      query = AURORA_NFTS_QUERY;
      chainName = 'aurora';
      break;
    case 'avalanche':
      query = AVALANCHE_NFTS_QUERY;
      chainName = 'avalanche';
      break;
    case 'fantom':
      query = FANTOM_NFTS_QUERY;
      chainName = 'fantom';
      break;
    case 'binancesmartchain':
      query = BINANCE_SMART_CHAIN_NFTS_QUERY;
      chainName = 'binanceSmartChain';
      break;
    case 'cronosevm':
      query = CRONOS_EVM_NFTS_QUERY;
      chainName = 'cronosEVM';
      break;
    case 'ethereum':
      query = ETHEREUM_NFTS_QUERY;
      chainName = 'ethereum';
      break;
    case 'polygon':
      query = POLYGON_NFTS_QUERY;
      chainName = 'polygon';
      break;
    case 'cantoevm':
      query = CANTO_EVM_NFTS_QUERY;
      chainName = 'cantoEVM';
      break;
    case 'optimism':
      query = OPTIMISM_NFTS_QUERY;
      chainName = 'optimism';
      break;
    case 'gnosis':
      query = GNOSIS_NFTS_QUERY;
      chainName = 'gnosis';
      break;
    default:
      throw new Error('Chain do not support NFTs');
  }

  const { data: response } = await gqlClient.query({
    query: query,
    variables: {
      address,
    },
  });

  return response[chainName].nfts;
};
