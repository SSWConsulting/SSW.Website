// import bundleAnalyser from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  poweredByHeader: false,
  images: {
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**ssw.com.au",
        port: "",
      },
      {
        protocol: "http",
        hostname: "**ssw.com.au",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "secure-content.meetupstatic.com",
        port: "",
      },
    ],
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
  experimental: {
    optimizePackageImports: ["tinacms", "@fortawesome/fontawesome-svg-core"],
  },
  productionBrowserSourceMaps: true,
};

// const withBundleAnalyzer = bundleAnalyser({
//   enabled: process.env.BUNDLE_ANALYSE === "true",
// });

export default config;
