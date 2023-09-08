import { Chain, ChainDecorator } from '@xdefi-tech/chains-core';
import { UtxoProvider } from '@xdefi-tech/chains-utxo';

@ChainDecorator('DogecoinProvider', {
  deps: [],
  providerType: 'UTXO',
  features: [Chain.ChainFeatures.TOKENS],
})
export class DogecoinProvider extends UtxoProvider {}
