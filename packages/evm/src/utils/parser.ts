import { NumberIsh } from '@xdefi/chains-core';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

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
      num = parseInt(n.toString());
      break;
    default:
      throw new Error('Invalid NumberIsh value');
  }

  return BigNumber(ethers.utils.parseUnits(num.toString(), 'gwei').toString());
};
