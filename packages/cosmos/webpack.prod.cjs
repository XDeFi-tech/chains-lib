const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('../../utility-packages/webpack/webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './src/index.ts',
    web: './src/signers/web.ts',
    'react-native': './src/signers/react-native.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      name: 'xdefichainscosmos',
      type: 'umd',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
})
