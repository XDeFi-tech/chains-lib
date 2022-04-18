const config = require('../../packages/webpack/webpack.config.js');

module.exports = {
  ...config,
  output: {
    ...config.output,
    library: {
      name: 'xdefichainscore',
      type: 'umd',
    },
  },
};
