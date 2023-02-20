import ChainController from './chain-controller';
import { evmManifests, EvmProvider, XdefiRepository } from '@xdefi/chains-evm';

describe('ChainController', () => {
    let chainController: ChainController;

    beforeEach(() => {
        chainController = new ChainController();
        chainController.setProvider(
            new EvmProvider(new XdefiRepository(evmManifests.ethereum))
        );
        chainController.setProvider(
            new EvmProvider(new XdefiRepository(evmManifests.binancesmartchain))
        );
        chainController.setProvider(
            new EvmProvider(new XdefiRepository(evmManifests.polygon))
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getProviderByChain should return ethereum EVM provider', () => {
        const chain = 'ethereum';
        const provider = chainController.getProviderByChain(chain);

        expect(provider.manifest.chain).toEqual(chain);
    });

    it('setProvider should add new provider to the list', () => {
        const chain = 'fantom';
        const provider = new EvmProvider(new XdefiRepository(evmManifests[chain]));
        const testChainController = new ChainController();
        testChainController.setProvider(provider);
        const providers = chainController.getProviderList();

        expect(providers).toHaveLength(1);
        expect(providers[0].manifest.chain).toEqual(chain);
    });

    it('setProviderList should add providers to the list', () => {
        const initialProviders = [
            new EvmProvider(new XdefiRepository(evmManifests.arbitrum)),
            new EvmProvider(new XdefiRepository(evmManifests.aurora)),
        ];
        const testChainController = new ChainController();
        testChainController.setProviderList(initialProviders);
        const providers = testChainController.getProviderList();

        expect(providers).toHaveLength(initialProviders.length);
    });

    it('getProviderByType should return 3 EVM providers', () => {
        const evmProviders = chainController.getProviderByType('EVM');

        expect(evmProviders).toHaveLength(3);
    });

    it('getProviderList should return all providers (3)', () => {
        const providers = chainController.getProviderList();

        expect(providers).toHaveLength(3);
    });

    it('serializeParams should return serialized Params for all chains', () => {
        const mockParams = '';
        const params = chainController.serializeParams();

        expect(params).toEqual(mockParams);
    });

    it('clearProviders should remove all providers', () => {
        chainController.clearProvidersStorage();
        const providers = chainController.getProviderList();

        expect(providers).toHaveLength(0);
    });
});
