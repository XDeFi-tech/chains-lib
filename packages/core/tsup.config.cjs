const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill');

module.exports = {
  tsup: {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    splitting: true,
    dts: true,
    shims: true,
    types: ['./dist/index.d.ts'],
    platform: 'browser',
    target: 'ES6',
    external: ['crypto', 'stream', '@cosmjs'],
    plugins: [NodeModulesPolyfillPlugin()],
  },
};
