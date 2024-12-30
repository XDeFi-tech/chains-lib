export const stringToHex = (str: string) => {
  return [...str]
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export const checkFeeBounds = (
  feeBounds: { lower: number; upper: number },
  feeRate: number
) => {
  if (feeRate < feeBounds.lower || feeRate > feeBounds.upper) {
    throw Error(`Fee outside of predetermined bounds: ${feeRate.toString()}`);
  }
};
