const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('../../utility-packages/webpack/webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'xdefichainsbtc',
            type: 'umd',
        },
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
})
