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
      './signers/web.d.ts',
      './signers/react-native.d.ts'
    ],
    platform: 'browser',
    external: ['crypto', 'stream', '@cosmjs'],
    plugins: [
      NodeModulesPolyfillPlugin(),
    ]
  }
};