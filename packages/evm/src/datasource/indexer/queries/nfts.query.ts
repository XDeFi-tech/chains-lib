import { gql } from 'graphql-tag';
import { gqlClient, LEGACY_NFTS_FRAGMENT } from '@xdefi-tech/chains-core';

import { EVM_INDEXER_CHAIN } from '../../../manifests';

export const ARBITRUM_NFTS_QUERY = gql`
  query ArbitrumNFTS($address: String!) {
    arbitrum {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const AURORA_NFTS_QUERY = gql`
  query AuroraNFTS($address: String!) {
    aurora {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const AVALANCHE_NFTS_QUERY = gql`
  query AvalancheNFTS($address: String!) {
    avalanche {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const FANTOM_NFTS_QUERY = gql`
  query FantomNFTS($address: String!) {
    fantom {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const BINANCE_SMART_CHAIN_NFTS_QUERY = gql`
  query SmartChainNFTS($address: String!) {
    binanceSmartChain {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const CRONOS_EVM_NFTS_QUERY = gql`
  query CronosNFTS($address: String!) {
    cronosEVM {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const ETHEREUM_NFTS_QUERY = gql`
  query EthereumNFTS($address: String!) {
    ethereum {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const POLYGON_NFTS_QUERY = gql`
  query PolygonNFTS($address: String!) {
    polygon {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const CANTO_EVM_NFTS_QUERY = gql`
  query CantoNFTS($address: String!) {
    cantoEVM {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const OPTIMISM_NFTS_QUERY = gql`
  query OptimismNFTS($address: String!) {
    optimism {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }

  ${LEGACY_NFTS_FRAGMENT}
`;

export const GNOSIS_NFTS_QUERY = gql`
  query GnosisNFTS($address: String!) {
    gnosis {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const LINEA_NFTS_QUERY = gql`
  query LineaNFTS($address: String!) {
    linea {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const BASE_NFTS_QUERY = gql`
  query BaseNFTS($address: String!) {
    base {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const BLAST_NFTS_QUERY = gql`
  query BlastNFTS($address: String!) {
    blast {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const ZKSYNC_NFTS_QUERY = gql`
  query ZKSyncNFTS($address: String!) {
    zkSync {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const MANTLE_NFTS_QUERY = gql`
  query MantleNFTS($address: String!) {
    mantle {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const OPBNB_NFTS_QUERY = gql`
  query OpBNBNFTS($address: String!) {
    opBNB {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const CELO_NFTS_QUERY = gql`
  query CeloNFTS($address: String!) {
    celo {
      legacyNFTs(address: $address) {
        ...LegacyNftData
      }
    }
  }
  ${LEGACY_NFTS_FRAGMENT}
`;

export const getNFTBalance = async (chain: string, address: string) => {
  let query;
  const chainName: string = EVM_INDEXER_CHAIN[chain];
  switch (chain.trim().toLowerCase()) {
    case 'arbitrum':
      query = ARBITRUM_NFTS_QUERY;
      break;
    case 'aurora':
      query = AURORA_NFTS_QUERY;
      break;
    case 'avalanche':
      query = AVALANCHE_NFTS_QUERY;
      break;
    case 'fantom':
      query = FANTOM_NFTS_QUERY;
      break;
    case 'smartchain':
      query = BINANCE_SMART_CHAIN_NFTS_QUERY;
      break;
    case 'cronos':
      query = CRONOS_EVM_NFTS_QUERY;
      break;
    case 'ethereum':
      query = ETHEREUM_NFTS_QUERY;
      break;
    case 'polygon':
      query = POLYGON_NFTS_QUERY;
      break;
    case 'cantoevm':
      query = CANTO_EVM_NFTS_QUERY;
      break;
    case 'optimism':
      query = OPTIMISM_NFTS_QUERY;
      break;
    case 'gnosis':
      query = GNOSIS_NFTS_QUERY;
      break;
    case 'linea':
      query = LINEA_NFTS_QUERY;
      break;
    case 'base':
      query = BASE_NFTS_QUERY;
      break;
    case 'blast':
      query = BLAST_NFTS_QUERY;
      break;
    case 'zksync':
      query = ZKSYNC_NFTS_QUERY;
      break;
    case 'mantle':
      query = MANTLE_NFTS_QUERY;
      break;
    case 'opBNB':
      query = OPBNB_NFTS_QUERY;
      break;
    case 'celo':
      query = CELO_NFTS_QUERY;
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

  return response[chainName].legacyNFTs;
};
