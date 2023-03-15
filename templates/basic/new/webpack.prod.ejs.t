---
to: packages/<%= name.toLowerCase() %>/webpack.prod.js
---

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
            name: 'xdefichains<%= name.toLowerCase() %>',
            type: 'umd',
        },
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
})
