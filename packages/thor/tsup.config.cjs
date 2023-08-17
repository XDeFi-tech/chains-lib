const { NodeModulesPolyfillPlugin } = require("@esbuild-plugins/node-modules-polyfill");

module.exports = {
  tsup: {
    entry: [
      'src/index.ts',
      'src/signers/web.ts',
      'src/signers/react-native.ts'
    ],
    format: ['esm', 'cjs'],
    splitting: false,
    dts: true,
    legacy: true,
    types: [
      './dist/index.d.ts',
      './dist/signers/web.d.ts',
      './dist/signers/react-native.d.ts'
    ],
    platform: 'browser',
    external: ['crypto', 'bip32'],
    plugins: [
      NodeModulesPolyfillPlugin(),
    ]
  }
};