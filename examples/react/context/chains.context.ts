import React from 'react';
import { ChainController } from '@xdefi-tech/chains-controller';
import { EVM_MANIFESTS, EvmProvider } from '@xdefi-tech/chains-evm';
import {
  SeedPhraseSigner as EvmSeedPhraseSigner,
  PrivateKeySigner as EvmPrivateKeySigner,
} from '@xdefi-tech/chains-evm/dist/signers/web';
import { COSMOS_MANIFESTS, CosmosProvider } from '@xdefi-tech/chains-cosmos';
import {
  SeedPhraseSigner as CosmosSeedPhraseSigner,
  PrivateKeySigner as CosmosPrivateKeySigner,
} from '@xdefi-tech/chains-cosmos/dist/signers/web';
import { SOLANA_MANIFEST, SolanaProvider } from '@xdefi-tech/chains-solana';
import {
  SeedPhraseSigner as SolanaSeedPhraseSigner,
  PrivateKeySigner as SolanaPrivateKeySigner,
} from '@xdefi-tech/chains-solana/dist/signers/web';
import { THORCHAIN_MANIFESTS, ThorProvider } from '@xdefi-tech/chains-thor';
import {
  SeedPhraseSigner as ThorSeedPhraseSigner,
  PrivateKeySigner as ThorPrivateKeySigner,
} from '@xdefi-tech/chains-thor/dist/signers/web';
import { BITCOIN_MANIFEST, BitcoinProvider } from '@xdefi-tech/chains-bitcoin';
import {
  SeedPhraseSigner as BitcoinSeedPhraseSigner,
  PrivateKeySigner as BitcoinPrivateKeySigner,
} from '@xdefi-tech/chains-bitcoin/dist/signers/web';
import {
  LITECOIN_MANIFEST,
  LitecoinProvider,
} from '@xdefi-tech/chains-litecoin';
import {
  SeedPhraseSigner as LitecoinSeedPhraseSigner,
  PrivateKeySigner as LitecoinPrivateKeySigner,
} from '@xdefi-tech/chains-litecoin/dist/signers/web';
import {
  DOGECOIN_MANIFEST,
  DogecoinProvider,
} from '@xdefi-tech/chains-dogecoin';
import {
  SeedPhraseSigner as DogecoinSeedPhraseSigner,
  PrivateKeySigner as DogecoinPrivateKeySigner,
} from '@xdefi-tech/chains-dogecoin/dist/signers/web';
import {
  BITCOINCASH_MANIFEST,
  BitcoinCashProvider,
} from '@xdefi-tech/chains-bitcoincash';
import {
  SeedPhraseSigner as BitcoinCashSeedPhraseSigner,
  PrivateKeySigner as BitcoinCashPrivateKeySigner,
} from '@xdefi-tech/chains-bitcoincash/dist/signers/web';
import { TronProvider, TRON_MANIFEST } from '@xdefi-tech/chains-tron';

import {
  SeedPhraseSigner as TronSeedPhraseSigner,
  PrivateKeySigner as TronPrivateKeySigner,
} from '@xdefi-tech/chains-tron/dist/signers/web';

export const ChainsContextDefaultValue = new ChainController();

export const initDefaultProviders = () => {
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.ethereum),
      {
        providerId: 'ethereum',
        signers: [EvmSeedPhraseSigner, EvmPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new SolanaProvider(
      new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST),
      {
        providerId: 'solana',
        signers: [SolanaSeedPhraseSigner, SolanaPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(
        EVM_MANIFESTS.smartchain
      ),
      {
        providerId: 'smartchain',
        signers: [EvmSeedPhraseSigner, EvmPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.polygon),
      {
        providerId: 'polygon',
        signers: [EvmSeedPhraseSigner, EvmPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.avalanche),
      {
        providerId: 'avalanche',
        signers: [EvmSeedPhraseSigner, EvmPrivateKeySigner],
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.fantom),
      {
        providerId: 'fantom',
        signers: [EvmSeedPhraseSigner, EvmPrivateKeySigner],
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.arbitrum),
      {
        providerId: 'arbitrum',
        signers: [EvmSeedPhraseSigner, EvmPrivateKeySigner],
      }
    )
  );

  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.aurora),
      {
        providerId: 'aurora',
        signers: [EvmSeedPhraseSigner, EvmPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.CtrlDataSource({
        name: 'Base',
        description: '',
        rpcURL: 'https://rpc-proxy.xdefi.services/base/rpc/mainnet',
        chainSymbol: 'ETH',
        blockExplorerURL: 'https://basescan.org',
        chainId: '8453',
        chain: 'base',
        decimals: 18,
        feeGasStep: {
          high: 1.5,
          medium: 1.25,
          low: 1,
        },
        multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        maxGapAmount: 0,
      }),
      {
        providerId: 'base-ctrl',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new EvmProvider(
      new EvmProvider.dataSourceList.CtrlDataSource({
        name: 'Blast',
        description: '',
        rpcURL: 'https://blast.drpc.org	',
        chainSymbol: 'ETH',
        blockExplorerURL: 'https://blastscan.io',
        chainId: '81457',
        chain: 'blast',
        decimals: 18,
        feeGasStep: {
          high: 1.5,
          medium: 1.25,
          low: 1,
        },
        multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        maxGapAmount: 0,
      }),
      {
        providerId: 'blast-ctrl',
      }
    )
  );
  // ChainsContextDefaultValue.addProvider(
  //   new EvmProvider(
  //     new EvmProvider.dataSourceList.IndexerDataSource({
  //       ...EVM_MANIFESTS.blast,
  //       name: `${EVM_MANIFESTS.blast.name} chain`,
  //     }),
  //     {
  //       providerId: 'blast-chain',
  //     }
  //   )
  // );
  // ChainsContextDefaultValue.addProvider(
  //   new EvmProvider(
  //     new EvmProvider.dataSourceList.IndexerDataSource({
  //       ...EVM_MANIFESTS.zkSync,
  //       name: `${EVM_MANIFESTS.zkSync.name} chain`,
  //     }),
  //     {
  //       providerId: 'zksync-chain',
  //     }
  //   )
  // );

  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(
      new CosmosProvider.dataSourceList.IndexerDataSource(
        COSMOS_MANIFESTS.cosmos
      ),
      {
        providerId: 'cosmos',
        signers: [CosmosSeedPhraseSigner, CosmosPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(
      new CosmosProvider.dataSourceList.IndexerDataSource(
        COSMOS_MANIFESTS.kava
      ),
      {
        providerId: 'kava',
        signers: [CosmosSeedPhraseSigner, CosmosPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(
      new CosmosProvider.dataSourceList.CtrlDataSource({
        name: 'Quasar',
        description: '',
        rpcURL: 'https://rpc-proxy.xdefi.services/quasar/rpc/mainnet',
        lcdURL: 'https://rpc-proxy.xdefi.services/quasar/lcd/mainnet',
        chainSymbol: 'KAVA',
        blockExplorerURL: 'https://www.mintscan.io/quasar',
        chainId: 'quasar-1',
        chain: 'quasar',
        denom: 'uqsr',
        decimals: 6,
        prefix: 'quasar',
        feeGasStep: {
          high: 0.05,
          medium: 0.01,
          low: 0.25,
        },
        maxGapAmount: 0,
      }),
      {
        providerId: 'quasar-ctrl',
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new ThorProvider(
      new ThorProvider.dataSourceList.IndexerDataSource(
        THORCHAIN_MANIFESTS.thorchain
      ),
      {
        providerId: 'thorchain',
        signers: [ThorSeedPhraseSigner, ThorPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new ThorProvider(
      new ThorProvider.dataSourceList.IndexerDataSource(
        THORCHAIN_MANIFESTS.mayachain
      ),
      {
        providerId: 'mayachain',
        signers: [ThorSeedPhraseSigner, ThorPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new BitcoinProvider(
      new BitcoinProvider.dataSourceList.IndexerDataSource(BITCOIN_MANIFEST),
      {
        providerId: 'bitcoin',
        signers: [BitcoinSeedPhraseSigner, BitcoinPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new LitecoinProvider(
      new LitecoinProvider.dataSourceList.IndexerDataSource(LITECOIN_MANIFEST),
      {
        providerId: 'litecoin',
        signers: [LitecoinSeedPhraseSigner, LitecoinPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new DogecoinProvider(
      new DogecoinProvider.dataSourceList.IndexerDataSource(DOGECOIN_MANIFEST),
      {
        providerId: 'dogecoin',
        signers: [DogecoinSeedPhraseSigner, DogecoinPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new BitcoinCashProvider(
      new BitcoinCashProvider.dataSourceList.IndexerDataSource(
        BITCOINCASH_MANIFEST
      ),
      {
        providerId: 'bitcoincash',
        signers: [BitcoinCashSeedPhraseSigner, BitcoinCashPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new TronProvider(
      new TronProvider.dataSourceList.IndexerDataSource(TRON_MANIFEST),
      {
        providerId: 'tron',
        signers: [TronSeedPhraseSigner, TronPrivateKeySigner],
      }
    )
  );
  ChainsContextDefaultValue.addProvider(
    new CosmosProvider(
      new CosmosProvider.dataSourceList.ChainDataSource({
        name: 'Agoric',
        description: '',
        rpcURL: 'https://agoric-mainnet-lcd.autostake.com:443',
        lcdURL: 'https://agoric-mainnet-lcd.autostake.com:443',
        chainSymbol: 'BLD',
        blockExplorerURL: 'https://www.mintscan.io/agoric',
        chainId: 'agoric-3',
        chain: 'agoric',
        denom: 'ubld',
        decimals: 6,
        prefix: 'agoric',
        feeGasStep: {
          high: 0.03,
          medium: 0.025,
          low: 0.01,
        },
      }),
      {
        providerId: 'agoric',
        signers: [CosmosSeedPhraseSigner, CosmosPrivateKeySigner],
      }
    )
  );
};

export const ChainsContext = React.createContext<ChainController>(
  ChainsContextDefaultValue
);
