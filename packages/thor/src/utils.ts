import axios from 'axios';

import { common } from './proto';

export const SYNTH_DELIMITER = '/';
export const NON_SYNTH_DELIMITER = '.';

export const assetFromString = (s: string): common.IAsset | null => {
  const isSynth = s.includes(SYNTH_DELIMITER);
  const delimiter = isSynth ? SYNTH_DELIMITER : NON_SYNTH_DELIMITER;
  const data = s.split(delimiter);
  if (data.length <= 1 || data[1]?.length < 1) {
    return null;
  }

  let chain = data[0];
  // filter out not supported string of chains
  if (!chain) return null;

  let symbol = data[1];
  const ticker = data[data.length - 1];

  if (!symbol) return null;
  if (isSynth) {
    chain = symbol;
    symbol = data[data.length - 1];
  }

  return { chain, symbol, ticker, synth: isSynth };
};

/**
 * Get the chain ID of the THORChain network from the given RPC URL.
 * If there is an error, it will return the default chain ID.
 *
 * @param {string} rpcUrl - RPC URL
 * @param {string} defaultChainId - Default chain ID to return if there is an error
 */
export const getThorChainID = async (
  rpcUrl: string,
  defaultChainId = 'thorchain-mainnet-v1'
): Promise<string> => {
  try {
    const restAxiosInstance = axios.create({
      baseURL: rpcUrl,
    });
    const { data } = await restAxiosInstance.get('/status');
    return data?.result?.network;
  } catch (err) {
    console.error(
      'Error while getting thor chain id, returning "thorchain-mainnet-v1" by default.'
    );
    console.error(err);
    return defaultChainId;
  }
};
