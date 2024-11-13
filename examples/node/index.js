// should be before import any other chain lib modules
global.CHAINS_CORE_OPTIONS = {
    httpUri: 'https://gql-router.xdefi.services/graphql',
    wsUri: 'wss://gateway-ws.xdefi.services/',
    clientName: 'chain-lib-node-example',
    clientVersion: '0.0.1',
}
const { EVM_MANIFESTS, EvmProvider } = require('@xdefi-tech/chains-evm');
const XMLHttpRequest = require('xhr2');

global.XMLHttpRequest = XMLHttpRequest;

async function main() {
    const provider = new EvmProvider(new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS.ethereum));
    const balance = await provider.getBalance('0xb68E7481eb29477a2370803569EA6C65E54921E9');
    const data = await balance.getData();
}

main();
