import { TransactionStatus } from '@xdefi-tech/chains-core';
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  AddressLookupTableAccount,
  VersionedTransaction,
  TransactionMessage,
  ComputeBudgetProgram,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
  TransactionError,
} from '@solana/web3.js';

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

export const checkTxAlreadyHasPriorityFee = (txBytes: Buffer) => {
  const tx = VersionedTransaction.deserialize(txBytes);
  const priorityFee = tx.message.staticAccountKeys.find(
    (key) => key.toBase58() === ComputeBudgetProgram.programId.toBase58()
  );
  return !!priorityFee;
};

type TransactionCustomError = TransactionError & {
  InstructionError: [number, { Custom: string }];
};

const getErrorFromRPCResponse = (
  rpcResponse: RpcResponseAndContext<SimulatedTransactionResponse>
) => {
  const error = rpcResponse.value.err as TransactionCustomError | null;
  if (error) {
    if (typeof error === 'object') {
      const errorKeys = Object.keys(error);
      if (errorKeys.length === 1) {
        if (errorKeys[0] !== 'InstructionError') {
          throw new Error(`Unknown RPC error: ${error}`);
        }
        const instructionError = error.InstructionError;
        throw new Error(
          `Error in transaction: instruction index ${instructionError[0]}, custom program error ${instructionError[1]['Custom']}`
        );
      }
    }
    throw Error(error.toString());
  }
};

export const getSimulationComputeUnits = async (
  connection: Connection,
  instructions: Array<TransactionInstruction>,
  payer: PublicKey,
  lookupTables: Array<AddressLookupTableAccount> | []
): Promise<number | null> => {
  const testInstructions = [
    // Set an arbitrarily high number in simulation
    // so we can be sure the transaction will succeed
    // and get the real compute units used
    ComputeBudgetProgram.setComputeUnitLimit({ units: 14e5 }),
    ...instructions,
  ];
  const testTransaction = new VersionedTransaction(
    new TransactionMessage({
      instructions: testInstructions,
      payerKey: payer,
      // RecentBlockhash can by any public key during simulation
      // since 'replaceRecentBlockhash' is set to 'true' below
      recentBlockhash: PublicKey.default.toString(),
    }).compileToV0Message(lookupTables)
  );
  const rpcResponse = await connection.simulateTransaction(testTransaction, {
    replaceRecentBlockhash: true,
    sigVerify: false,
  });
  getErrorFromRPCResponse(rpcResponse);
  return rpcResponse.value.unitsConsumed || null;
};
