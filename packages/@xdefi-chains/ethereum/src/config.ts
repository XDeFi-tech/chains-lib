import { Chain } from "@xdefi/chains-core";

export default {
  [Chain.Network.Testnet]: {
    rpc: {
      url: "http://www.google.com",
    },
  },
  [Chain.Network.Mainnet]: {
    rpc: {
      url: "http://www.google.com",
    },
  },
};
