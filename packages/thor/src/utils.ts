import axios from 'axios';
import { base64 } from '@scure/base';

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
    chain = chain;
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
  defaultChainId = 'thorchain-1'
): Promise<string> => {
  try {
    const restAxiosInstance = axios.create({
      baseURL: rpcUrl,
    });
    const { data } = await restAxiosInstance.get('/status');
    return data?.result?.network;
  } catch (err) {
    console.error(
      'Error while getting thor chain id, returning "thorchain-1" by default.'
    );
    console.error(err);
    return defaultChainId;
  }
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: any: refactor
export const getSignature = (signatureArray: any) => {
  // Check Type Length Value encoding
  if (signatureArray.length < 64) {
    throw new Error('Invalid Signature: Too short');
  }
  if (signatureArray[0] !== 0x30) {
    throw new Error(
      'Invalid Ledger Signature TLV encoding: expected first byte 0x30'
    );
  }
  if (signatureArray[1] + 2 !== signatureArray.length) {
    throw new Error('Invalid Signature: signature length does not match TLV');
  }
  if (signatureArray[2] !== 0x02) {
    throw new Error(
      'Invalid Ledger Signature TLV encoding: expected length type 0x02'
    );
  }

  // r signature
  const rLength = signatureArray[3];
  let rSignature = signatureArray.slice(4, rLength + 4);

  // Drop leading zero on some 'r' signatures that are 33 bytes.
  if (rSignature.length === 33 && rSignature[0] === 0) {
    rSignature = rSignature.slice(1, 33);
  } else if (rSignature.length === 33) {
    throw new Error('Invalid signature: "r" too long');
  }

  // add leading zero's to pad to 32 bytes
  while (rSignature.length < 32) {
    rSignature.unshift(0);
  }

  // s signature
  if (signatureArray[rLength + 4] !== 0x02) {
    throw new Error(
      'Invalid Ledger Signature TLV encoding: expected length type 0x02'
    );
  }

  const sLength = signatureArray[rLength + 5];

  if (4 + rLength + 2 + sLength !== signatureArray.length) {
    throw new Error(
      'Invalid Ledger Signature: TLV byte lengths do not match message length'
    );
  }

  let sSignature = signatureArray.slice(rLength + 6, signatureArray.length);

  // Drop leading zero on 's' signatures that are 33 bytes. This shouldn't occur since ledger signs using "Small s" math. But just to be sure...
  if (sSignature.length === 33 && sSignature[0] === 0) {
    sSignature = sSignature.slice(1, 33);
  } else if (sSignature.length === 33) {
    throw new Error('Invalid signature: "s" too long');
  }

  // add leading zero's to pad to 32 bytes
  while (sSignature.length < 32) {
    sSignature.unshift(0);
  }

  if (rSignature.length !== 32 || sSignature.length !== 32) {
    throw new Error('Invalid signatures: must be 32 bytes each');
  }

  return base64.encode(Buffer.concat([rSignature, sSignature]));
};
