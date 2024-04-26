import { View, Button } from "react-native";
import {
  SOLANA_MANIFEST,
  SolanaProvider,
  ChainDataSource, // <=== has been changed
} from '@xdefi-tech/chains-solana';
import { Buffer } from "buffer";
import 'react-native-get-random-values';
// import { SeedPhraseSigner } from "@xdefi-tech/chains-solana/dist/signers/react-native";

function App() {
  const [nft, setNft] = useState(null)
  const dataSource =  new ChainDataSource(SOLANA_MANIFEST);
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

  // signer.sign(msg, derivationPath).then(() => {
  //   console.log('msg.hasSignature', msg.hasSignature)
  // })

  const handleTestFetch = useCallback(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 150 }}>
      <Button onPress={handleTestFetch} title={"Test Fetch"} />
      {
        nft && (
          <FlatList
          data={nft}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        )
      }
    </View>
  );
}
export default App;