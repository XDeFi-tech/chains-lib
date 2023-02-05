import { Chain } from "@xdefi/chains-core";

export default {
  [Chain.Network.Testnet]: {
    rpc: {
      url: "h1ttp://www.google.com",
    },
  },
  [Chain.Network.Mainnet]: {
    rpc: {
      url: "htt2p://www.google.com",
    },
  },
};
