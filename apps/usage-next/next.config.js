const withTM = require("next-transpile-modules")(["@xdefi/chains-evm"]);

module.exports = withTM({
    reactStrictMode: true,
});
