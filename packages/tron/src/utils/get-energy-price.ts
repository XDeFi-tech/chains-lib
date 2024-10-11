import axios from 'axios';

/**
 * Get the current energy price from the given Tron RPC.
 * @param rpc - The Tron RPC URL.
 * @returns The current energy price in SUN.
 */
export const getEnergyPrice = async (rpc: string): Promise<number> => {
  const {
    data: { prices },
  } = await axios.get(`${rpc}/wallet/getenergyprices`);
  // prices: 0:100,1542607200000:20,1544724000000:10,1606240800000:40,1613044800000:140,1635422400000:280,1670133600000:420,1726747200000:210
  const now = Date.now();
  const price = prices
    .split(',')
    .reverse()
    .find((price: string) => {
      const [time, _] = price.split(':');
      return parseInt(time) < now;
    });
  return parseInt(price.split(':')[1]);
};
