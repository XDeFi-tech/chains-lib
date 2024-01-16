const {
  NodeModulesPolyfillPlugin,
} = require('@esbuild-plugins/node-modules-polyfill');

module.exports = {
  tsup: {
    entry: ['src/**/*.ts', '!src/**/*.spec.*'],
    format: 'cjs',
    splitting: false,
    dts: true,
    platform: 'browser',
    target: 'ES6',
    external: ['crypto', 'bip32'],
    plugins: [NodeModulesPolyfillPlugin()],
  },
};
