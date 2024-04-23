import { View, Button } from "react-native";
import {
  SOLANA_MANIFEST,
  SolanaProvider,
} from '@xdefi-tech/chains-solana';
import { SeedPhraseSigner } from "@xdefi-tech/chains-solana/dist/signers/react-native";

function App() {
  const dataSource = new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST);
  const provider = new SolanaProvider(dataSource, {
    providerId: "solana",
  });

  const derivationPath = "m/44'/501'/0'/0'";
  const msg = provider.createMsg({
    from: 'YOUR_ADDRESS',
    to: 'YOUR_ADDRESS',
    amount: 0.001,
  })

  const signer = new SeedPhraseSigner('YOUR_SEED_PHRASE');

  signer.sign(msg, derivationPath).then(() => {
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