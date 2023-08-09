const config = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  poweredByHeader: false,
  images: {
    domains: [
      "assets.tina.io",
      "i.ytimg.com",
      "img.youtube.com",
      "ssw.com.au",
      "www.ssw.com.au",
      "i.vimeocdn.com",
      "secure-content.meetupstatic.com",
    ],
  },
  output: "standalone", // required for Docker support
  swcMinify: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" &&
        process.env.BUILD_TAG === "production"
        ? {
          exclude: ["error", "warn"],
        }
        : false,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: true,
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.BUNDLE_ANALYSE === "true",
});

module.exports = withBundleAnalyzer(config);
