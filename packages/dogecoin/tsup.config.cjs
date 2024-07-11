const {
  NodeModulesPolyfillPlugin,
} = require('@esbuild-plugins/node-modules-polyfill');

module.exports = {
  tsup: {
    entry: [
      'src/index.ts',
      'src/signers/web.ts',
      'src/signers/react-native.ts',
    ],
    format: 'cjs',
    splitting: false,
    dts: true,
    shims: true,
    types: [
      './dist/index.d.ts',
      './dist/signers/web.d.ts',
      './dist/signers/react-native.d.ts',
    ],
    platform: 'browser',
    target: 'ES6',
    plugins: [NodeModulesPolyfillPlugin()],
    skipNodeModulesBundle: true,
  },
};
