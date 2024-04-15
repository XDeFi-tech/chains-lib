import { ethers } from 'ethers';

import erc20Abi from '../../consts/erc20.json';
export const getBalanceByBatch = async (
  rpc: string,
  walletAddress: string,
  tokenAddresses: string[]
) => {
  try {
    const provider = new ethers.providers.JsonRpcBatchProvider(rpc);
    const callPromise = tokenAddresses.map(async (tokenAddress) => {
      const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
      const [balanceOf, symbol, name, decimal] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.callStatic.symbol(),
        contract.callStatic.name(),
        contract.callStatic.decimals(),
      ]);
      return {
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
      };
    });
    return Promise.all(callPromise);
  } catch (error) {
    throw error;
  }
};
