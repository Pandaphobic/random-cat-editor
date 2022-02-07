module.exports = {
  reactStrictMode: true,
  // Enables use of WASM specifically Phonto-RS
  webpack: function (config, options) {
    console.log(options.webpack.version); // 5.18.0
    config.experiments = { asyncWebAssembly: true, layers: true };
    return config;
  },
};
