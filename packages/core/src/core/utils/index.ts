import { NumberIsh, HexString } from '../interfaces';

export const toHex = (n: NumberIsh): HexString => {
  if (isNaN(Number(n))) {
    throw new Error('Invalid NumberIsh value');
  }
  const num = typeof n === 'bigint' ? n : BigInt(n);
  const hex = num.toString(16);
  return `0x${hex}`;
};

export const fromHex = (hex: HexString): number => {
  return parseInt(hex, 16);
};
