const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    webpack: function (config, options) {
        config.experiments = { asyncWebAssembly: true };
        return config;
    }
});
