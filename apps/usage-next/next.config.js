const withTM = require("next-transpile-modules")(["@xdefi/chains-ethereum"]);

module.exports = withTM({
  reactStrictMode: true,
});
