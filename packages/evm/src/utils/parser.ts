import { NumberIsh } from '@xdefi-tech/chains-core';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { gwei } from '../constants';

export const parseGwei = (n: NumberIsh): BigNumber => {
  let num = null;
  // parseInt mandatory to cut off decimals
  switch (true) {
    case typeof n === 'string' && n.startsWith('0x'):
      num = parseInt(n as string, 16);
      break;
    case typeof n === 'string':
      num = parseInt(n as string, 10);
      break;
    case typeof n === 'bigint':
      num = parseInt(n.toString(), 10);
      break;
    case typeof n === 'number':
      num = parseInt(((n as number) * gwei).toString());
      num = num / gwei;
      break;
    default:
      throw new Error('Invalid NumberIsh value');
  }

  return new BigNumber(
    ethers.utils.parseUnits(num.toString(), 'gwei').toString()
  );
};

export const decodeHexString = (hexString: string): string => {
  const decoded = ethers.utils.defaultAbiCoder.decode(['string'], hexString);
  return decoded[0];
};
