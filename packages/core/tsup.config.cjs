const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill');

module.exports = {
  tsup: {
    entry: ['src/index.ts', '!src/**/*.spec.*', '!src/custom.d.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    splitting: false,
    dts: true,
    shims: true,
    types: ['./dist/index.d.ts'],
    platform: 'browser',
    target: 'ES6',
    plugins: [NodeModulesPolyfillPlugin()],
    skipNodeModulesBundle: true,
  },
};
