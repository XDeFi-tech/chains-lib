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

export const decodePriorityFeeInstruction = (data: Buffer[]) => {
  const priorityFee: {
    computeUnitLimit: number | null;
    computeUnitPrice: number | null;
  } = {
    computeUnitLimit: null,
    computeUnitPrice: null,
  };
  for (const instruction of data) {
    const instructionType = instruction[0];
    switch (instructionType) {
      case 2:
        // ComputeBudgetProgram.setComputeUnitLimit
        priorityFee.computeUnitLimit = instruction.readUInt32LE(1);
        break;
      case 3:
        // ComputeBudgetProgram.setComputeUnitPrice
        priorityFee.computeUnitPrice = instruction.readUInt32LE(1);
        break;
    }
  }

  return priorityFee;
};
