import { TransactionStatus } from '@xdefi-tech/chains-core';
import { Connection } from '@solana/web3.js';

export const checkMinimumBalanceForRentExemption = async (
  connection: Connection
) => {
  // await was added to add error handling later
  return await connection.getMinimumBalanceForRentExemption(0);
};

export const getSignatureStatus = async (
  connection: Connection,
  hash: string
): Promise<TransactionStatus | undefined> => {
  const sig = await connection.getSignatureStatus(hash);
  if (!sig.value) {
    return undefined;
  }

  if (sig.value.err) {
    throw sig.value.err;
  }
  if (sig.value.confirmationStatus) {
    return TransactionStatus.success;
  }

  return undefined;
};
