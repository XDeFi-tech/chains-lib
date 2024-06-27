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
