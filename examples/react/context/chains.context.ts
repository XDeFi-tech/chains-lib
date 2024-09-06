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
import { BINANCE_MANIFEST, BinanceProvider } from '@xdefi-tech/chains-binance';
import {
  SeedPhraseSigner as BinanceSeedPhraseSigner,
  PrivateKeySigner as BinancePrivateKeySigner,
} from '@xdefi-tech/chains-binance/dist/signers/web';
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
    new BinanceProvider(
      new BinanceProvider.dataSourceList.IndexerDataSource(BINANCE_MANIFEST),
      {
        providerId: 'binance',
        signers: [BinanceSeedPhraseSigner, BinancePrivateKeySigner],
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
};

export const ChainsContext = React.createContext<ChainController>(
  ChainsContextDefaultValue
);
