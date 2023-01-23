// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const withTM = require("next-transpile-modules")(["ssw.megamenu"])

module.exports = withTM({
  experimental:{
    esmExternals: "loose"
  },
  images: {
    domains: ["assets.tina.io"],
  },
  output: "standalone", // required for Docker support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
});
