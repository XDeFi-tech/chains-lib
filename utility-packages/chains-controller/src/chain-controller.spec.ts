import { Chain } from '@xdefi-tech/chains-core';
import { EvmProvider, EVM_MANIFESTS } from '@xdefi-tech/chains-evm';
import { SolanaProvider, SOLANA_MANIFEST } from '@xdefi-tech/chains-solana';

import { ChainController } from './chain-controller';

describe('chain.provider', () => {
  let controller: ChainController;

  beforeEach(() => {
    controller = new ChainController();
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(
          EVM_MANIFESTS.ethereum
        ),
        { providerId: 'ethereum' }
      )
    );
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.polygon),
        { providerId: 'polygon' }
      )
    );
    controller.addProvider(
      new SolanaProvider(
        new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST),
        { providerId: 'solana' }
      )
    );
  });

  afterEach(() => {
    controller.clear();
  });

  it('should add provider to controller', () => {
    const controller = new ChainController();
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(
          EVM_MANIFESTS.ethereum
        ),
        { providerId: 'ethereum' }
      )
    );
    expect(controller.getProviderById('ethereum')).toBeDefined();
  });

  it('should clear all providers from controller', () => {
    controller.clear();
    const providers = controller.getProviderList();
    expect(providers.length).toEqual(0);
  });

  it('should return provider by id', () => {
    const provider = controller.getProviderById('ethereum');
    expect(provider).toBeDefined();
  });

  it('should delete provider from controller', () => {
    controller.deleteProvider('ethereum');
    expect(() => controller.getProviderById('ethereum')).toThrow(
      'Invalid identifier'
    );
  });

  it('should return all providers', () => {
    const controller = new ChainController();
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.ethereum)
      )
    );
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.polygon)
      )
    );
    controller.addProvider(
      new SolanaProvider(
        new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST)
      )
    );
    const providers = controller.getProviderList();
    expect(providers.length).toEqual(3);
  });

  it('should return all providers by chain', () => {
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(
          EVM_MANIFESTS.ethereum
        ),
        { providerId: 'ethereum-2' }
      )
    );
    const providers = controller.getProviderByChain('ethereum');
    expect(providers.length).toEqual(2);
  });

  it('should return all providers by type', () => {
    const controller = new ChainController();
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.ethereum)
      )
    );
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.polygon)
      )
    );
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.arbitrum)
      )
    );
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(
          EVM_MANIFESTS.avalanche
        )
      )
    );
    const providers = controller.getProviderByType('EVM');
    expect(providers.length).toEqual(4);
  });

  it('should get provider by feature', () => {
    const controller = new ChainController();
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.ethereum)
      )
    );
    controller.addProvider(
      new EvmProvider(
        new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.polygon)
      )
    );
    controller.addProvider(
      new SolanaProvider(
        new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST)
      )
    );
    const providers = controller.getProviderByFeature(
      Chain.ChainFeatures.TOKENS
    );
    expect(providers.length).toEqual(3);
  });

  it('should get provider by type and chain', () => {
    const providers = controller.getProviderByTypeAndChain(
      'EVM',
      EVM_MANIFESTS.ethereum.chain
    );
    expect(providers.length).toEqual(1);
  });

  it('should get serialized string', () => {
    const serialized = controller.serialize();
    console.log('serialized', serialized);
  });

  it('should restore providers from serialized string', () => {
    const controller = new ChainController();
    const parsedData = ChainController.deserialize(
      '{"ethereum":{"providerClassName":"EvmProvider","dataSourceClassName":"IndexerDataSource","providerId":"ethereum","manifest":{"name":"Ethereum","description":"","rpcURL":"https://ethereum-mainnet.xdefiservices.com","chainSymbol":"ETH","blockExplorerURL":"https://etherscan.io","chainId":"1","chain":"ethereum","decimals":18,"feeGasStep":{"high":1.5,"medium":1.25,"low":1}}},"polygon":{"providerClassName":"EvmProvider","dataSourceClassName":"IndexerDataSource","providerId":"polygon","manifest":{"name":"Polygon","description":"","rpcURL":"https://polygon-mainnet.xdefiservices.com","chainSymbol":"MATIC","blockExplorerURL":"https://polygonscan.com","chainId":"137","chain":"polygon","decimals":18,"feeGasStep":{"high":1.5,"medium":1.25,"low":1}}},"solana":{"providerClassName":"SolanaProvider","dataSourceClassName":"IndexerDataSource","providerId":"solana","manifest":{"name":"Solana","description":"","rpcURL":"https://solanalb-rpc.xdefi.services","chainSymbol":"SOL","blockExplorerURL":"https://explorer.solana.com/","chainId":"mainnet-beta","chain":"solana","decimals":6,"feeGasStep":{"high":1,"medium":1,"low":1}}}}'
    );
    const providerList = ChainController.providerList;
    Object.values(parsedData).forEach((chainParam) => {
      const provider = providerList.getProvider(
        chainParam.providerClassName,
        chainParam.manifest,
        {
          providerId: chainParam.providerId,
          dataSourceClassName: chainParam.dataSourceClassName,
        }
      );
      if (provider) {
        controller.addProvider(provider);
      }
    });
    expect(controller.getProviderList().length).toEqual(3);
  });
});
