import { Connection } from '@solana/web3.js';

export const checkMinimumBalanceForRentExemption = async (
  connection: Connection
) => {
  // await was added to add error handling later
  return await connection.getMinimumBalanceForRentExemption(0);
};
