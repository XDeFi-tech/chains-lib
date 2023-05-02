import "@ethersproject/shims";
import { useCallback } from "react";
import { View, Button } from "react-native";

import { Chain } from "@xdefi/chains-core";
import {
  EVM_MANIFESTS,
  EvmProvider,
  IndexerDataSource as EvmDataSource,
} from "@xdefi/chains-evm";
import { ethers } from "ethers";
import { ChainController } from "@xdefi/chains-controller";
import { TrustWalletSigner } from "./trust-wallet.signer";

// const provider = new ethers.providers.StaticJsonRpcProvider(
//   "https://polygon-rpc.com"
// );

// const somweting = async () => {
//   // const balance = await provider.getBalance(
//   //   "0xd0972E2312518Ca15A2304D56ff9cc0b7ea0Ea37"
//   // );
//   // const result = await evmProvider.getTransactions(
//   //   "0xb4D24357404C35A62b8B9228155FE9e77BDE4F53"
//   // );
//   // const txs = await result.getData();
//   // console.log(txs);
//   chains.addProvider(evmProvider);
//   // fetch("https://jsonplaceholder.typicode.com/todos/1")
//   //   .then((response) => response.json())
//   //   .then((json) => console.log(json));
// };
// somweting();

function App() {
  const evmDatasource = new EvmDataSource(EVM_MANIFESTS.polygon);
  const evmProvider = new EvmProvider(evmDatasource, {
    providerId: "polygon",
    signers: [TrustWalletSigner],
  });

  const msg = evmProvider.createMsg({
    from: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
    to: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
    amount: 0.00001,
  })

  console.log('msg', msg);

  const signers = evmProvider.getSigners();
  console.log('signers', signers[0]);
  const trustWalletSigner = new signers[0]();

  trustWalletSigner.sign('', msg).then(() => {
    console.log('msg.hasSignature', msg.hasSignature)
  })

  const handleTestFetch = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);
  return (
    <View style={{ flex: 1, paddingTop: 150 }}>
      <Button onPress={handleTestFetch} title={"Test Fetch"} />
    </View>
  );
}
export default App;