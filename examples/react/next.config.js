const withTM = require("next-transpile-modules")(["@xdefi/chains-core"]);

module.exports = withTM({
    reactStrictMode: true,
});
