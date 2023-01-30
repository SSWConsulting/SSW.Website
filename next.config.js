module.exports = {
  images: {
    domains: ["assets.tina.io", "i.ytimg.com", "www.ssw.com.au"],
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
};
