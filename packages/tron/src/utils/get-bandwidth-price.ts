import axios from 'axios';

/**
 * Get the current bandwidth price from the given Tron RPC.
 * @param rpc - The Tron RPC URL.
 * @returns The current bandwidth price in SUN.
 */
export const getBandwidthPrice = async (rpc: string): Promise<number> => {
  const {
    data: { prices },
  } = await axios.get(`${rpc}/wallet/getbandwidthprices`);
  // prices: 0:10,1606240800000:40,1613044800000:140,1627279200000:1000
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
