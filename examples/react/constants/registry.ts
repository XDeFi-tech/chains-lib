export const registry = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    chainId: 'bitcoin',
    blockchain: 'Bitcoin',
    icon: 'https://static.xdefi.services/icons/network/bitcoin.svg',
    nativeCoins: [
      {
        name: 'Bitcoin',
        decimals: 8,
        symbol: 'BTC',
        icon: 'https://static.xdefi.services/icons/network/bitcoin.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_bitcoin.svg',
      },
    ],
    derivation: [
      {
        name: 'segwit',
        path: "m/84'/0'/0'/0/0",
        xpub: 'zpub',
        xprv: 'zprv',
      },
      {
        name: 'legacy',
        path: "m/44'/0'/0'/0/0",
        xpub: 'xpub',
        xprv: 'xprv',
      },
      {
        name: 'testnet',
        path: "m/84'/1'/0'/0/0",
        xpub: 'zpub',
        xprv: 'zprv',
      },
    ],
    prefix: 'bc',
    explorer: [
      {
        name: 'Blockchair',
        url: 'https://blockchair.com',
        txPath: '/bitcoin/transaction/',
        accountPath: '/bitcoin/address/',
        sampleTx:
          '04711594492d0d1c3e5e5e318aa0768ab9b11260efb9bc4293dbbd1350b5ac7a',
        sampleAccount: 'bc1qlmywh0zkz0xlc9rkfjy5haqerjlzf4rrwpxd9m',
        icon: 'https://static.xdefi.services/icons/explorers/blockchair.png',
      },
    ],
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: '1',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
    nativeCoins: [
      {
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_ethereum.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Etherscan',
        url: 'https://etherscan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x90f0b519beabe3777de358ab3da229e89362961a4fab2dfa274d6bc3c91e5204',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
      },
    ],
  },
  {
    id: 'binance',
    name: 'Binance',
    chainId: 'Binance-Chain-Tigris',
    blockchain: 'Binance',
    icon: 'https://static.xdefi.services/icons/network/binance.svg',
    nativeCoins: [
      {
        name: 'BNB',
        decimals: 8,
        symbol: 'BNB',
        icon: 'https://static.xdefi.services/icons/network/binance.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_binance.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/714'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'BNB Beacon Chain Explorer',
        url: 'https://explorer.bnbchain.org',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '5C51BB1D95B728C08A65C680C93D7C061EFC34E05DD57CFD0488123023011621',
        sampleAccount: 'bnb1dqsxa4pxp2un58a9s8ty6ssvcvdq6t7wvf4kuk',
        icon: 'https://static.xdefi.services/icons/network/binance.svg',
      },
    ],
  },
  {
    id: 'bitcoincash',
    name: 'Bitcoin Cash',
    chainId: 'bitcoincash',
    blockchain: 'Bitcoin',
    icon: 'https://static.xdefi.services/icons/network/bitcoincash.svg',
    nativeCoins: [
      {
        name: 'Bitcoin Cash',
        decimals: 8,
        symbol: 'BCH',
        icon: 'https://static.xdefi.services/icons/network/bitcoincash.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_bitcoincash.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/145'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Blockchair',
        url: 'https://blockchair.com/bitcoin-cash',
        txPath: '/transaction/',
        accountPath: '/address/',
        sampleTx:
          '9a002c738d8cd09701a5a1c7044846df22051dfbd131dfd54ee2eaba77ada81f',
        sampleAccount: 'qpp6jxeuh8lsum4j30lf53aj5lal26knwy5etggmwx',
        icon: 'https://static.xdefi.services/icons/explorers/blockchair.png',
      },
    ],
  },
  {
    id: 'cosmos',
    name: 'Cosmos Hub',
    chainId: 'cosmoshub-4',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/cosmos.svg',
    prefix: 'cosmos',
    nativeCoins: [
      {
        name: 'ATOM',
        decimals: 6,
        symbol: 'ATOM',
        icon: 'https://static.xdefi.services/icons/network/cosmos.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_cosmos.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/cosmos',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '56AD690D7173301AF891094CC71556DC94A4AC51A4A941ED280897EF3EA875BF',
        sampleAccount: 'cosmos1vxez2cl456xl96zt6e5sku6e9gcra0gu3j8usr',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'osmosis',
    name: 'Osmosis',
    chainId: 'osmosis-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/osmosis.svg',
    prefix: 'osmo',
    nativeCoins: [
      {
        name: 'OSMO',
        decimals: 6,
        symbol: 'OSMO',
        icon: 'https://static.xdefi.services/icons/network/osmosis.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_osmosis.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/osmosis',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '9FB44FD45DDBCCFEDF160DC1CFD38DB31218B890CA871A23A8D32FDB2B4AD26D',
        sampleAccount: 'osmo1vxez2cl456xl96zt6e5sku6e9gcra0guef5vx3',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'axelar',
    name: 'Axelar',
    chainId: 'axelar-dojo-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/axelar.svg',
    prefix: 'axelar',
    nativeCoins: [
      {
        name: 'AXL',
        decimals: 6,
        symbol: 'AXL',
        icon: 'https://static.xdefi.services/icons/network/axelar.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_axelar.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/axelar',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          'AC58429BCB44D1AF320E9099AC43EDF24847E8FAAA2269694C287CAEF475FD34',
        sampleAccount: 'axelar1vxez2cl456xl96zt6e5sku6e9gcra0gu4u35mz',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'juno',
    name: 'Juno',
    chainId: 'juno-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/juno.svg',
    prefix: 'juno',
    nativeCoins: [
      {
        name: 'JUNO',
        decimals: 6,
        symbol: 'JUNO',
        icon: 'https://static.xdefi.services/icons/network/juno.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_juno.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/juno',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '61A4DD4BBF7A31FBEA31FDF32B51A6372261662EF2357AF1C3D47A22DE273DC4',
        sampleAccount: 'juno1vxez2cl456xl96zt6e5sku6e9gcra0gu8qy8hl',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'crescent',
    name: 'Crescent',
    chainId: 'crescent-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/crescent.svg',
    prefix: 'crescent',
    nativeCoins: [
      {
        name: 'CRE',
        decimals: 6,
        symbol: 'CRE',
        icon: 'https://static.xdefi.services/icons/network/crescent.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_crescent.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/crescent',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '23DFDDF2828007F37BE3FA779AD154EC87F1DD82CE810BC9EB645BED832D1269',
        sampleAccount: 'cre1vxez2cl456xl96zt6e5sku6e9gcra0gu465e9w',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'kava',
    name: 'Kava',
    chainId: 'kava_2222-10',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/kava.svg',
    prefix: 'kava',
    nativeCoins: [
      {
        name: 'KAVA',
        decimals: 6,
        symbol: 'KAVA',
        icon: 'https://static.xdefi.services/icons/network/kava.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_kava.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/459'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/kava',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '311DAFC8C9B40BD02A708696A9ACFF7B13B978913F8F9457E5105381B4231BE8',
        sampleAccount: 'kava1vxez2cl456xl96zt6e5sku6e9gcra0gud8npxy',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'kavaevm',
    name: 'Kava EVM',
    chainId: '2222',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    prefix: 'kava',
    nativeCoins: [
      {
        name: 'KAVA',
        decimals: 18,
        symbol: 'KAVA',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Kava EVM chain explorer',
        url: 'https://kavascan.com',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xfbb41f9a7f1e2519309fae25ab1e083ea011b4714beb42b5a87cdc31156af54f',
        sampleAccount: '0xe93685f3bBA03016F02bD1828BaDD6195988D950',
        icon: 'https://static.xdefi.services/icons/explorers/placeholder.jpeg',
      },
    ],
  },
  {
    id: 'stargaze',
    name: 'Stargaze',
    chainId: 'stargaze-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/stargaze.svg',
    prefix: 'stargaze',
    nativeCoins: [
      {
        name: 'STARS',
        decimals: 6,
        symbol: 'STARS',
        icon: 'https://static.xdefi.services/icons/network/stargaze.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_stargaze.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/stargaze',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '1B9811494D5B6F040B9C667DEDD0F707BCDA41156A9028381838992757664A23',
        sampleAccount: 'stars1vxez2cl456xl96zt6e5sku6e9gcra0gu9wspmj',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'akash',
    name: 'Akash',
    chainId: 'akashnet-2',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/akash.svg',
    prefix: 'akash',
    nativeCoins: [
      {
        name: 'AKT',
        decimals: 6,
        symbol: 'AKT',
        icon: 'https://static.xdefi.services/icons/network/akash.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_akash.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/akash',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '58F4770991078D679712961D6C02C3A27BEBA87938BCADF348DD28CBDE649A8D',
        sampleAccount: 'akash1vxez2cl456xl96zt6e5sku6e9gcra0guuf2mfe',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'cronos',
    name: 'CronosPOS',
    chainId: 'crypto-org-chain-mainnet-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/cronos.svg',
    prefix: 'cro',
    nativeCoins: [
      {
        name: 'CRO',
        decimals: 8,
        symbol: 'CRO',
        icon: 'https://static.xdefi.services/icons/network/cronos.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_cronos.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/394'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/crypto-org',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '408FD715AD517B9802F229811862ADE8B8D2F5DD0597BD25FB07AB152C0DE913',
        sampleAccount: 'cro1vxez2cl456xl96zt6e5sku6e9gcra0guff09vj',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'kujira',
    name: 'Kujira',
    chainId: 'kaiyo-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/kujira.svg',
    prefix: 'kujira',
    nativeCoins: [
      {
        name: 'KUJI',
        decimals: 6,
        symbol: 'KUJI',
        icon: 'https://static.xdefi.services/icons/network/kujira.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_kujira.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/kaiyo-1',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '840DCD30F4E8AB518DD14A19427A8F012F50FEB7AD98C9842A3F63DE0D2A4D54',
        sampleAccount: 'kujira1vxez2cl456xl96zt6e5sku6e9gcra0guq69yaf',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'stride',
    name: 'Stride',
    chainId: 'stride-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/stride.svg',
    prefix: 'stride',
    nativeCoins: [
      {
        name: 'STRD',
        decimals: 6,
        symbol: 'STRD',
        icon: 'https://static.xdefi.services/icons/network/stride.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_stride.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/stride',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '9A9E43B1619E2FE11A630136F587274DF449685BFBDC211B67FF8784416A99CA',
        sampleAccount: 'stride1vxez2cl456xl96zt6e5sku6e9gcra0guje8qy0',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    chainId: 'mars-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/mars.svg',
    prefix: 'mars',
    nativeCoins: [
      {
        name: 'STRD',
        decimals: 6,
        symbol: 'STRD',
        icon: 'https://static.xdefi.services/icons/network/mars.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_mars.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/mars-protocol',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '2C718CAB3DAF6E8171416100780A8AE32D86D6A3B5B0382582CFB9AD1B786A2E',
        sampleAccount: 'mars1vxez2cl456xl96zt6e5sku6e9gcra0guv0799c',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'terra',
    name: 'Terra',
    chainId: 'phoenix-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/terra.svg',
    prefix: 'terra',
    nativeCoins: [
      {
        name: 'LUNA',
        decimals: 6,
        symbol: 'LUNA',
        icon: 'https://static.xdefi.services/icons/network/terra.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_terra.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/330'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Terrascope',
        url: 'https://terrasco.pe/mainnet',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          'C6B71EC4F16F1272750FA8D8B5B9A5B2CBEFDDAA014BBB686A2B007FA79511A9',
        sampleAccount: 'terra16ljr8evka2gl0g7x3x8h8qz6rtrt9vgm60v0ur',
        icon: 'https://static.xdefi.services/icons/explorers/terrascope.png',
      },
    ],
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    chainId: 'dogecoin',
    blockchain: 'Bitcoin',
    icon: 'https://static.xdefi.services/icons/network/dogecoin.svg',
    nativeCoins: [
      {
        name: 'Dogecoin',
        decimals: 8,
        symbol: 'DOGE',
        icon: 'https://static.xdefi.services/icons/network/dogecoin.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/network/dogecoin.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/3'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Blockchair',
        url: 'https://blockchair.com',
        txPath: '/dogecoin/transaction/',
        accountPath: '/dogecoin/address/',
        sampleTx:
          'd103e56fe5598ab3d92c0e2a982163fd1f3850c3cee2570d27f6949dad2d5f84',
        sampleAccount: 'D8pkV5utTGT7mCnnC4oiFw7A2yEJqWCc9G',
        icon: 'https://static.xdefi.services/icons/explorers/blockchair.png',
      },
    ],
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    chainId: 'litecoin',
    blockchain: 'Bitcoin',
    icon: 'https://static.xdefi.services/icons/network/dogecoin.svg',
    nativeCoins: [
      {
        name: 'Litecoin',
        decimals: 8,
        symbol: 'LTC',
        icon: 'https://static.xdefi.services/icons/network/litecoin.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_litecoin.svg',
      },
    ],
    derivation: [
      {
        path: "m/84'/2'/0'/0/0",
        xpub: 'zpub',
        xprv: 'zprv',
      },
      {
        name: 'legacy',
        path: "m/44'/2'/0'/0/0",
        xpub: 'xpub',
        xprv: 'xprv',
      },
    ],
    explorer: [
      {
        name: 'Blockchair',
        url: 'https://blockchair.com',
        txPath: '/litecoin/transaction/',
        accountPath: '/litecoin/address/',
        sampleTx:
          '445e2f93898b6861613ad505b8c64582195f170630e1fc29c060cb616453a7e2',
        sampleAccount: 'ltc1qhlkz7xxvk8l3dm6sdnxmmzj6msx0skn2vcj0p0',
        icon: 'https://static.xdefi.services/icons/explorers/blockchair.png',
      },
    ],
  },
  {
    id: 'solana',
    name: 'Solana',
    chainId: 'mainnet-beta',
    blockchain: 'Solana',
    icon: 'https://static.xdefi.services/icons/network/solana.svg',
    nativeCoins: [
      {
        name: 'Solana',
        decimals: 9,
        symbol: 'SOL',
        icon: 'https://static.xdefi.services/icons/network/solana.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_solana.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/501'/0'/0'",
      },
      {
        path: "m/44'/501'/0'",
      },
    ],
    explorer: [
      {
        name: 'Solscan',
        url: 'https://solscan.io',
        txPath: '/tx/',
        accountPath: '/account/',
        sampleTx:
          '64xvob3Gsy7Xgysvev9QsBY3vLuAGtdgz2aiZrvMa2SvUEhJ2CUqACQkaqHBPefWuyPeyCLjbTihkjrE7N6TDcUe',
        sampleAccount: '4ZBA3RnSeB93ajJi1ChnoqFakdY7MCpVaB9ASy47xdKE',
        icon: 'https://static.xdefi.services/icons/explorers/solscan.png',
      },
    ],
  },
  {
    id: 'thorchain',
    name: 'THORChain',
    chainId: 'thorchain-1',
    blockchain: 'Thorchain',
    icon: 'https://static.xdefi.services/icons/network/thorchain.svg',
    nativeCoins: [
      {
        name: 'RUNE',
        decimals: 8,
        symbol: 'RUNE',
        icon: 'https://static.xdefi.services/icons/network/thorchain.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_thorchain.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/931'/0'/0/0",
      },
    ],
    prefix: 'thor',
    explorer: [
      {
        name: 'Viewblock',
        url: 'https://viewblock.io/thorchain',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '08D8CF2EF4F278AA5CF85093777063E2DD52550BBDF17FF2C2A7067FF594EE5B',
        sampleAccount: 'thor197fxjr8c6vyn44z8wjl2at4u42wl4pgg0xmjqk',
        icon: 'https://static.xdefi.services/icons/explorers/viewblock.svg',
      },
    ],
  },
  {
    id: 'tron',
    name: 'Tron',
    chainId: 'tron',
    blockchain: 'Tron',
    icon: 'https://static.xdefi.services/icons/network/tron.svg',
    nativeCoins: [
      {
        name: 'TRX',
        decimals: 6,
        symbol: 'TRX',
        icon: 'https://static.xdefi.services/icons/network/tron.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_tron.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/195'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Tronscan',
        url: 'https://tronscan.org',
        txPath: '/#/transaction/',
        accountPath: '/#/address/',
        sampleTx:
          'b5405b62955c33ff4daacb1a24ad697a8b61dfd6173151dd5d7734f781002c32',
        sampleAccount: 'THZFSyLeaMhrs8i12aBuUpiKCGW8fmYE4A',
        icon: 'https://static.xdefi.services/icons/explorers/tronscan.png',
      },
    ],
  },
  {
    id: 'smartchain',
    name: 'BNB Smart Chain',
    chainId: '56',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/smartchain.svg',
    nativeCoins: [
      {
        name: 'BNB',
        decimals: 18,
        symbol: 'BNB',
        icon: 'https://static.xdefi.services/icons/network/smartchain.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_smartchain.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'BscScan',
        url: 'https://bscscan.com',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x51e9dfa3a15509b79162fc90af0141e70e8eadd943aeda362abd87780a62d4d5',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/explorers/bssscan.jpeg',
      },
    ],
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: '137',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/polygon_pos.svg',
    nativeCoins: [
      {
        name: 'MATIC',
        decimals: 18,
        symbol: 'MATIC',
        icon: 'https://static.xdefi.services/icons/network/polygon_pos.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_polygon.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Polygonscan',
        url: 'https://polygonscan.com',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xf97fbc809b0c95b26c7f61d599ce8ff40aaa9be4252f266d80fc876651fdca35',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/network/polygon_pos.svg',
      },
    ],
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    chainId: '43114',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/avalanche.svg',
    nativeCoins: [
      {
        name: 'AVAX',
        decimals: 18,
        symbol: 'AVAX',
        icon: 'https://static.xdefi.services/icons/network/avalanche.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_avalanche.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Avascan',
        url: 'https://avascan.info',
        txPath: '/blockchain/c/tx/',
        accountPath: '/blockchain/c/address/',
        sampleTx:
          '0xec2b23d5a7c6d7ed9a5858d105b2e9ce801d34e8b0f6264732fc6da6287f97fc',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/explorers/avascan.png',
      },
    ],
  },
  {
    id: 'fantom',
    name: 'Fantom',
    chainId: '250',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/fantom.svg',
    nativeCoins: [
      {
        name: 'FTM',
        decimals: 18,
        symbol: 'FTM',
        icon: 'https://static.xdefi.services/icons/network/fantom.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_fantom.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'FTMScan',
        url: 'https://ftmscan.com',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xf2d8824cad3a0eed49bbcaae6baeff7485dcc8d2a95d7ecafc5e5b36aef577c0',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/explorers/ftmscan.png',
      },
    ],
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    chainId: '42161',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/arbitrum.svg',
    nativeCoins: [
      {
        name: 'ETH',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/arbitrum.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_arbitrum.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'ARBISCAN',
        url: 'https://arbiscan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xedb2ca98517c821b8ab9f08261a486ed896107f9bf77e15c23a29357a06c40b4',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/network/arbitrum.svg',
      },
    ],
  },
  {
    id: 'aurora',
    name: 'Aurora',
    chainId: '1313161554',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/aurora.svg',
    nativeCoins: [
      {
        name: 'ETH',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/aurora.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_aurora.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Aurora explorer',
        url: 'https://explorer.aurora.dev',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xd9f2de214ed3299305bbe99a6bc5e31b61f8220b651e52b14e16ea6f3f0c0b60',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/network/aurora.svg',
      },
    ],
  },
  {
    id: 'cantoevm',
    name: 'Canto EVM',
    chainId: '7700',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/canto.svg',
    nativeCoins: [
      {
        name: 'CANTO',
        decimals: 18,
        symbol: 'CANTO',
        icon: 'https://static.xdefi.services/icons/network/canto.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_canto.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Tuber',
        url: 'https://tuber.build',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xa24e27158a9cd79a8589555ae6ccf7598ed2b1180e83de80eb659c8212b88a7f',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/network/canto.svg',
      },
    ],
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: '10',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/optimism.svg',
    nativeCoins: [
      {
        name: 'ETH',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/optimism.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_optimism.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Optimism',
        url: 'https://optimistic.etherscan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x6af63c1acfd89fcf8671ce9b086964a445331c6ffdec31c7094dbdc33d73d920',
        sampleAccount: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
        icon: 'https://static.xdefi.services/icons/network/optimism.svg',
      },
    ],
  },
  {
    id: 'klaytn',
    name: 'Klaytn',
    chainId: '8217',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'KLAYTN',
        decimals: 18,
        symbol: 'KLAY',
        icon: 'https://static.xdefi.services/icons/network/klaytn.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Klaytn Scope',
        url: 'https://klaytnscope.com',
        txPath: '/txs/',
        accountPath: '/account/',
        sampleTx:
          '0x3bd7626a503a89714eb868105a71886a316d6bab4b2fad22c0c7ca133770f85c',
        sampleAccount: '0x83f18c25dc568930d41fed5ef3d3d78a711c2c64',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'injective',
    name: 'Injective',
    chainId: 'injective-1',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Injective',
        decimals: 6,
        symbol: 'INJ',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Injective Explorer',
        url: 'https://explorer.injective.network',
        txPath: '/transaction/',
        accountPath: '/account/',
        sampleTx:
          'A8599C5BCDA4E50163F23A2418B7925DADA336333CCB26D0741B82F7BA4AD690',
        sampleAccount: 'inj1utp6ktuhe96jjghdwhuz44wpxfgma6nkj8cjf5',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'gnosis',
    name: 'Gnosis',
    chainId: '100',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'xDAI',
        decimals: 18,
        symbol: 'xDAI',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: ' Gnosis Chain Explorer ',
        url: 'https://gnosisscan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x8915f0baa7a87b32015e0b379cbb56b3fa90e6960b00acb0a7aef5256b6265ac',
        sampleAccount: '0x12d7675398902ee1996b96717655a8901851a2da',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'cronosevm',
    name: 'Cronos EVM',
    chainId: '25',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Cronos',
        decimals: 18,
        symbol: 'CRO',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: ' Cronos Explorer',
        url: 'https://explorer.cronos.org',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xe2970de9eeba2e37daa80fdaf3841311c3b72a6f5624656396d0a547ddedbea6',
        sampleAccount: '0x25aa97464f38a1506a16160bbc03cfc6dd863da3',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'moonbeam',
    name: 'Moonbeam',
    chainId: '1284',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Glimmer',
        decimals: 18,
        symbol: 'GLMR',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Moonbeam Chain Explorer',
        url: 'https://moonscan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xc1f41f3f8e736a040a5d113661e89e8cbfb3d41a27e0a7c057aba2aa643fb142',
        sampleAccount: '0x54F62934eC42D05DD72b5bC3b4D56e17c0CDdC39',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'base',
    name: 'Base',
    chainId: '8453',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/base.svg',
    nativeCoins: [
      {
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/base.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Base Explorer',
        url: 'https://basescan.org',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x1b3ef217886185aa9d57c131d660c94ed7659b61da474ae255c8eadfc300276c',
        sampleAccount: '0xeb6509b4853e01917770fda1f5f06b98edf98e51',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'celo',
    name: 'Celo',
    chainId: '42220',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Celo',
        decimals: 18,
        symbol: 'CELO',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Celo Chain Explorer',
        url: 'https://celoscan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x6c1403c8e1cb812f86ba52b3d7c46e447633f24f65fa0bf230c28e65574271b7',
        sampleAccount: '0xd1c09ddc1cbc28d5cef4c0dd34d5b5882216a36f',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'oasis',
    name: 'Oasis',
    chainId: '26863',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Rose',
        decimals: 18,
        symbol: 'ROSE',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Oasis Explorer',
        url: 'https://explorer.oasis.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '56AD690D7173301AF891094CC71556DC94A4AC51A4A941ED280897EF3EA875BF',
        sampleAccount: 'oasis1qpcn7gzc5mvlw037awx7qrss3rw039jzzcck89hq',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'oasis-sapphire',
    name: 'Oasis Sapphire',
    chainId: '23294',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Rose',
        decimals: 18,
        symbol: 'ROSE',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Oasis Explorer',
        url: 'https://explorer.oasis.io/mainnet/sapphire',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x63f7a22c87380b224d1c18056b5311c9f1910c222bc73197d692f7cca194336b',
        sampleAccount: '0x98358D77006ee93E14522224aeBC04388Cb65319',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'near',
    name: 'Near',
    chainId: '397',
    blockchain: 'Near',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Near',
        decimals: 24,
        symbol: 'NEAR',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [],
    explorer: [
      {
        name: 'Near Explorer',
        url: 'https://explorer.near.org',
        txPath: '/txns/',
        accountPath: '/address/',
        sampleTx: 'H9ksUTXfUNYp3u9FrgoaMjJuFBZDKyqRJLoHHiCPDUbb',
        sampleAccount: 'relay.tg',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'mayachain',
    name: 'Maya Chain',
    chainId: 'mayachain-mainnet-v1',
    blockchain: 'MAYAChain',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Maya',
        decimals: 10,
        symbol: 'CACAO',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
      {
        name: 'Rune',
        decimals: 8,
        symbol: 'RUNE',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/931'/0'/0",
      },
    ],
    explorer: [
      {
        name: 'Mayascan',
        url: 'https://www.mayascan.org',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '007E46FC95FBF4DCC65E97DABC7B77E020BDA4482640BEA406978BD57232542B',
        sampleAccount: 'maya1x843445a6z2e3edem9se22hnekurl7tau4rklm',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'zetachain',
    name: 'Zeta Chain',
    chainId: '7000',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Zeta',
        decimals: 18,
        symbol: 'ZETA',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/placeholder.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Zeta Scan',
        url: 'https://explorer.zetachain.com',
        txPath: '/cc/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x4eabc34ce669b031fdaf13fb5a4d177eab53d963596d184051478dd9f4804185',
        sampleAccount: '0x77dd5be74EdFd9ADDed9De1ADF677473ce9a735F',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'zksync',
    name: 'zkSync',
    chainId: '324',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_ethereum.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'zkSync Era Block Explorer',
        url: 'https://explorer.zksync.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x7899f91a1e28bb49e777dd4f8884703cd22bff049f5dc0bf2de13359c5554b3b',
        sampleAccount: '0xf9F4eDAFa45922D4dBc2ca76D450CE2e796b6726',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'opbnb',
    name: 'opBNB',
    chainId: '204',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/opbnb.svg',
    nativeCoins: [
      {
        name: 'Binance Coin',
        decimals: 18,
        symbol: 'BNB',
        icon: 'https://static.xdefi.services/icons/network/smartchain.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_smartchain.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'opBNB Scan',
        url: 'https://opbnbscan.com',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xf96b33d8ece8edb2b8f4e1551034417b5c4e4b1891bc2452785f58b019565df7',
        sampleAccount: '0x6e7e6fbdaadd27033484442c1a247237a4251e39',
        icon: 'https://static.xdefi.services/icons/network/opbnb_scan.svg',
      },
    ],
  },
  {
    id: 'linea',
    name: 'Linea',
    chainId: '59144',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/linea.svg',
    nativeCoins: [
      {
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_ethereum.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Blockscout',
        url: 'https://explorer.linea.build',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x8b79608eb80d4ed600d98ff1694a3af380a01abf20bebc6287fc1a6ee1acba4d',
        sampleAccount: '0xe93685f3bBA03016F02bD1828BaDD6195988D950',
        icon: 'https://static.xdefi.services/icons/network/linea_explorer.svg',
      },
    ],
  },
  {
    id: 'manta',
    name: 'Manta Pacific',
    chainId: '169',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/mantapacific.svg',
    nativeCoins: [
      {
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_ethereum.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Manta Pacific Block Explorer',
        url: 'https://manta.socialscan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x9a5210ef526b49c58c99299e321f525359726521bac08bb43129d87765a42167',
        sampleAccount: '0x0c7c99776e2ca74c6589d962cfa0c84eccf8d437',
        icon: 'https://static.xdefi.services/icons/network/mantapacific_explorer.svg',
      },
    ],
  },
  {
    id: 'mantle',
    name: 'Mantle',
    chainId: '5000',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/mantle.svg',
    nativeCoins: [
      {
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_ethereum.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mantle Explorer',
        url: 'https://explorer.mantle.xyz',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x5d8bb250d2b48d3ea1f1b7a7c5e08faeea3c7e42ba075f1bd9064a870d053c3b',
        sampleAccount: '0x85fdbB6ADC02DF51eE6DB2932df1da61f2c9c816',
        icon: 'https://static.xdefi.services/icons/network/mantle_explorer.svg',
      },
    ],
  },
  {
    id: 'celestia',
    name: 'Celestia',
    chainId: 'celestia',
    blockchain: 'Cosmos',
    icon: 'https://static.xdefi.services/icons/network/celestia.svg',
    nativeCoins: [
      {
        name: 'TIA',
        decimals: 6,
        symbol: 'TIA',
        icon: 'https://static.xdefi.services/icons/network/celestia.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/celestia.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/118'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Mintscan',
        url: 'https://www.mintscan.io/celestia',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          'CB443435ABBFE254B223B999D52C25EB85535F4AE6DF46A90852DA2A2309517D',
        sampleAccount: 'celestia1rey2y7nf49mnur9auxcawfr3qvpxnhdfptl4rh',
        icon: 'https://static.xdefi.services/icons/explorers/mintscan.jpeg',
      },
    ],
  },
  {
    id: 'celo',
    name: 'Celo',
    chainId: '42220',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/celo.svg',
    nativeCoins: [
      {
        name: 'Celo',
        decimals: 18,
        symbol: 'CELO',
        icon: 'https://static.xdefi.services/icons/network/celo.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_celo.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Celo Explorer',
        url: 'https://explorer.celo.org/mainnet',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x386533bfb475e7719a03aa5a16d184d7d1de4b7ea215a74d5a1c6c8d902bea86',
        sampleAccount: '0x75b4597Fa8B83B3391F0a314d4b50B86CA6bfA56',
        icon: 'https://static.xdefi.services/icons/network/celo_explorer.svg',
      },
    ],
  },
  {
    id: 'dymension',
    name: 'Dymension',
    chainId: '1100',
    blockchain: 'Dymension',
    icon: 'https://static.xdefi.services/icons/network/dymension.svg',
    nativeCoins: [
      {
        name: 'Dymension',
        decimals: 18,
        symbol: 'DYM',
        icon: 'https://static.xdefi.services/icons/network/dymension.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_dymension.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/35'/0'/0",
      },
    ],
    explorer: [
      {
        name: 'Dymension Block Explorer',
        url: 'https://dymension.explorers.guru',
        txPath: '/transaction/',
        accountPath: '/account/',
        sampleTx:
          'FFF360DA9F596A7F530F5B3724FEC40DF1904B1E8B4CD11B03C628AD5D2798F8',
        sampleAccount: '0x15a5d75641a76e8F0a7DC0D69514468fefC8851d',
        icon: 'https://static.xdefi.services/icons/network/dymension_explorer.svg',
      },
    ],
  },
  {
    id: 'blast',
    name: 'Blast',
    chainId: '81457',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Ethereum',
        decimals: 18,
        symbol: 'ETH',
        icon: 'https://static.xdefi.services/icons/network/ethereum.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/fallback_ethereum.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Blast Explorer',
        url: 'https://blastexplorer.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x34c8872e534e5c90ee55c7372656fd6799b049cdd24af962a8a467ecee5292d3',
        sampleAccount: '0x74A8794E0b96ae0996DD019775e91Faf3b2b6b39',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'beam',
    name: 'Beam',
    chainId: '4337',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
    nativeCoins: [
      {
        name: 'Beam',
        decimals: 18,
        symbol: 'BEAM',
        icon: 'https://static.xdefi.services/icons/network/beam.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/beam.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Beam Explorer',
        url: 'https://subnets-test.avax.network/beam',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x0c90a8feba5ad482a97c80989a5c8cb917bed9f3f4e2c54401a69224d4d72492',
        sampleAccount: '0xbEc2B7FD0C02dD3d080BD7AF31CC8cbabcDE09C9',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'mode',
    name: 'Mode',
    chainId: '34443',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/mode.svg',
    nativeCoins: [
      {
        name: 'ETH',
        decimals: 18,
        symbol: 'BEAM',
        icon: 'https://static.xdefi.services/icons/network/beam.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/beam.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Modescan',
        url: 'https://modescan.io',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0xbc11fd9c1f5b01ff90848b3fdc4ca088bc7b90231f00709a5d7e6b1e17d81fc0',
        sampleAccount: '0x58c0179d43d2Ccb0459eb151F35CeB7eEdbB7FA4',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
  {
    id: 'scroll',
    name: 'Scroll',
    chainId: '534352',
    blockchain: 'Ethereum',
    icon: 'https://static.xdefi.services/icons/network/mode.svg',
    nativeCoins: [
      {
        name: 'ETH',
        decimals: 18,
        symbol: 'BEAM',
        icon: 'https://static.xdefi.services/icons/network/beam.svg',
        fallbackIcon:
          'https://static.xdefi.services/icons/fallback_network/beam.svg',
      },
    ],
    derivation: [
      {
        path: "m/44'/60'/0'/0/0",
      },
    ],
    explorer: [
      {
        name: 'Scrollscan',
        url: 'https://scrollscan.com',
        txPath: '/tx/',
        accountPath: '/address/',
        sampleTx:
          '0x03a35ff5410938181794e6593cc70be8f6a7d38eec53a759d92f79c6312ce025',
        sampleAccount: '0xbe27c3acB9C61AfDfd99b653c3f13fc7Ce7c6F69',
        icon: 'https://static.xdefi.services/icons/network/placeholder.svg',
      },
    ],
  },
];
