import {
  GetBitcoinCashStatusDocument,
  GetBitcoinStatusDocument,
  GetDogecoinStatusDocument,
  GetLitecoinStatusDocument,
} from '@xdefi-tech/chains-graphql';
import { gqlClient } from '@xdefi-tech/chains-core';

import { UTXOChains } from '../../../manifests';

type UTXOChainParams = {
  query: any;
  queryName: string;
};

const getChainParams = (chain: string): UTXOChainParams => {
  const params: UTXOChainParams = {
    query: null,
    queryName: '',
  };
  const formattedChain = chain.toLowerCase();
  switch (formattedChain) {
    case UTXOChains.bitcoin:
      params.query = GetBitcoinStatusDocument;
      params.queryName = 'bitcoin';
      break;
    case UTXOChains.litecoin:
      params.query = GetLitecoinStatusDocument;
      params.queryName = 'litecoin';
      break;
    case UTXOChains.dogecoin:
      params.query = GetDogecoinStatusDocument;
      params.queryName = 'dogecoin';
      break;
    case UTXOChains.bitcoincash:
      params.query = GetBitcoinCashStatusDocument;
      params.queryName = 'bitcoincash';
      break;
    default:
      throw new Error('Unsupported utxo chain');
  }
  return params;
};

export const getStatus = async (chain: string) => {
  const params = getChainParams(chain);
  const response = await gqlClient.query({
    query: params.query,
  });

  return response.data[params.queryName].status;
};
