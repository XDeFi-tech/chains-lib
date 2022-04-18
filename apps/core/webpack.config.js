const path = require('path');
const config = require('../../packages/webpack/webpack.config.js');

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
