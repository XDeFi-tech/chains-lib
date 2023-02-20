const path = require('path');
const config = require('../../webpack/webpack.config.js');

module.exports = {
    ...config,
    output: {
        ...config.output,
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'xdefichainscore',
            type: 'umd',
        },
    },
};
