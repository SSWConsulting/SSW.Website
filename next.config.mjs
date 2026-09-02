import bundleAnalyser from "@next/bundle-analyzer";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// CI passes the footer's deployment info in as Docker build args. Locally
// there are none, so read them off the checkout instead of hardcoding a
// placeholder in .env that silently goes stale. Returns undefined when git
// isn't available (e.g. the Docker build context has no .git).
const fromGit = (command) => {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return undefined;
  }
};

// Turbopack resolves resolveAlias values against the project root and prepends
// "./" to whatever it is given, so this has to stay a project-relative path — an
// absolute one becomes "./Users/..." and fails to resolve, 500ing every page
// that renders <TinaMarkdown>.
const TINACMS_MDX_SHIM = "./lib/tinacms-mdx-shim.js";

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  images: {
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    // Next 16 will only serve qualities listed here. 75 is the default; 100 is
    // used by the hero and event banners.
    qualities: [75, 100],
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
      {
        source: "/consulting/web-application-development",
        destination: "/consulting/web-applications",
        permanent: true,
      },
      {
        source: "/eagle-eye",
        destination: "https://ssweagleeye.com",
        permanent: true,
      },
      {
        source: "/eagleeye",
        destination: "https://ssweagleeye.com",
        permanent: true,
      },
      {
        source: "/yakshaver",
        destination: "https://yakshaver.ai",
        permanent: true,
      },
    ];
  },
  serverExternalPackages: ["applicationinsights"],
  turbopack: {
    // A stray lockfile in a parent directory (e.g. ~/package-lock.json) makes
    // Turbopack infer the workspace root above this project, breaking
    // resolution of root-level files like instrumentation.ts. Pin it explicitly.
    root: fileURLToPath(new URL(".", import.meta.url)),
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    // `tinacms/dist/rich-text` imports `sanitizeUrl` from `@tinacms/mdx`, whose
    // single entry point bundles the entire markdown parser (~1.97 MB) to supply
    // a 22-line function. Swap in a shim that keeps sanitizeUrl and drops the
    // parser. Remove once tinacms#7233 lands a `@tinacms/mdx/sanitize-url`
    // subpath.
    resolveAlias: {
      "@tinacms/mdx": TINACMS_MDX_SHIM,
    },
  },
  experimental: {
    optimizePackageImports: ["tinacms", "@fortawesome/fontawesome-svg-core"],
    inlineCss: true,
    staticGenerationRetryCount: 2,
    staticGenerationMaxConcurrency: 20,
    staticGenerationMinPagesPerWorker: 30,
  },
  expireTime: 3600, // to set the cache-control header - https://nextjs.org/docs/app/api-reference/config/next-config-js/expireTime
  env: {
    NEXT_PUBLIC_GITHUB_RUN_DATE:
      process.env.NEXT_PUBLIC_GITHUB_RUN_DATE ||
      fromGit("git log -1 --format=%cI"),
    NEXT_PUBLIC_GITHUB_SHA:
      process.env.NEXT_PUBLIC_GITHUB_SHA || fromGit("git rev-parse HEAD"),
    NEXT_PUBLIC_GITHUB_REPOSITORY:
      process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || "SSWConsulting/SSW.Website",
  },
};

const withBundleAnalyzer = bundleAnalyser({
  enabled: process.env.BUNDLE_ANALYSE === "true",
});

export default withBundleAnalyzer(config);
