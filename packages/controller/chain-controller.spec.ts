import ChainController from './chain-controller';
import { evmManifests, EvmProvider } from '@xdefi/chains-evm';
import { XdefiRepository } from '@xdefi/chains-evm';

describe("ChainController", () => {
    let chainController: ChainController;

    beforeEach(() => {
        chainController = new ChainController();
        chainController.setProvider(new EvmProvider(new XdefiRepository(evmManifests.ethereum)));
        chainController.setProvider(new EvmProvider(new XdefiRepository(evmManifests.binancesmartchain)));
        chainController.setProvider(new EvmProvider(new XdefiRepository(evmManifests.polygon)));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getProviderByChain should return ethereum EVM provider', () => {
        const chain = 'ethereum';
        const provider = chainController.getProviderByChain(chain);
        expect(provider.manifest.chain).toEqual(chain);
    })

    it('getProviderByType should return 3 EVM providers', () => {
        const evmProviders = chainController.getProviderByType('EVM');
        expect(evmProviders.length).toEqual(3);
    })

    it('getProviderList should return all providers (3)', () => {
        const providers = chainController.getProviderList();
        expect(providers.length).toEqual(3);
    })

    it('setProvider should add new provider to the list', () => {
        chainController.setProvider(new EvmProvider(new XdefiRepository(evmManifests.fantom)));
        const providers = chainController.getProviderList();
        expect(providers.length).toEqual(4);
    })

    it('serializeParams should return serialized Params for all chains', () => {
        const mockParams = '';
        const params = chainController.serializeParams();
        expect(params).toEqual(mockParams);
    })

    it('initProviders should add providers to list from constructor', () => {
        const initialProviders = [
            new EvmProvider(new XdefiRepository(evmManifests.arbitrum)),
            new EvmProvider(new XdefiRepository(evmManifests.aurora)),
        ];

        const testChainController = new ChainController(initialProviders);
        const providers = testChainController.getProviderList();
        expect(providers.length).toEqual(initialProviders.length);
    })
});