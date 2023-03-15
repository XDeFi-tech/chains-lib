const path = require('path');
const { merge } = require('webpack-merge');
const common = require('../../utility-packages/webpack/webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'xdefichainsevm',
            type: 'umd',
        },
    },
    stats: 'minimal',
})
