export const nearToLittleEndianHexString = (yoktoAmount: string) => {
  const yoctoBigInt = BigInt(yoktoAmount);
  let hex = yoctoBigInt.toString(16);
  while (hex.length < 32) {
    hex = '0' + hex;
  }
  return Array.from({ length: hex.length / 2 })
    .map((_, idx) => hex.substring(2 * idx, 2 * idx + 2))
    .reverse()
    .join('');
};
