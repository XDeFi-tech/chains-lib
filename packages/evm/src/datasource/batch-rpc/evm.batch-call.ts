import { ethers } from 'ethers';

import erc20Abi from '../../consts/erc20.json';
export const getBalanceByBatch = async (
  rpc: string,
  walletAddress: string,
  tokenAddresses: string[]
) => {
  try {
    const provider = new ethers.providers.JsonRpcBatchProvider(rpc);
    const response = [];
    for (const tokenAddress of tokenAddresses) {
      const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
      const [balanceOf, symbol, name, decimal] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.callStatic.symbol(),
        contract.callStatic.name(),
        contract.callStatic.decimals(),
      ]);
      response.push({
        address: walletAddress,
        amount: {
          value: ethers.BigNumber.from(balanceOf._hex).toString(),
          scalingFactor: ethers.BigNumber.from(decimal._hex).toString(),
        },
        asset: {
          decimals: ethers.BigNumber.from(decimal._hex).toString(),
          contract: tokenAddress,
          name,
          symbol,
        },
      });
    }
    return [...response];
  } catch (error) {
    throw error;
  }
};
