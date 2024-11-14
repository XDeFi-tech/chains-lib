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
): Promise<TransactionStatus | null> => {
  const sig = await connection.getSignatureStatus(hash);
  if (!sig.value) {
    return null;
  }

  if (sig.value.err) {
    return TransactionStatus.failure;
  }
  if (sig.value.confirmationStatus) {
    return TransactionStatus.success;
  }

  return TransactionStatus.pending;
};
