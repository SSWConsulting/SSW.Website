import bundleAnalyser from "@next/bundle-analyzer";
import createNextPluginPreval from "next-plugin-preval/config.js";
const withNextPluginPreval = createNextPluginPreval();

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,

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
  serverExternalPackages: ["applicationinsights"],
  experimental: {
    optimizePackageImports: ["tinacms", "@fortawesome/fontawesome-svg-core"],
    turbo: {
      moduleIdStrategy: "deterministic",
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
    staleTimes: {
      dynamic: 1800, // 30 minutes
      static: 3600, // 1 hour
    },
  },
  productionBrowserSourceMaps: true,
  expireTime: 3600,
};

const withBundleAnalyzer = bundleAnalyser({
  enabled: process.env.BUNDLE_ANALYSE === "true",
});

export default withNextPluginPreval(withBundleAnalyzer(config));
