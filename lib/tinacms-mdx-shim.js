/**
 * Stand-in for `@tinacms/mdx`, aliased in via `next.config.mjs`.
 *
 * WHY THIS EXISTS
 * ---------------
 * `tinacms/dist/rich-text` — the module behind `<TinaMarkdown>`, imported by 65
 * components in this repo — starts with:
 *
 *     import { sanitizeUrl } from "@tinacms/mdx";
 *
 * `@tinacms/mdx` publishes a single "." entry point built with `bundleDeps`, so
 * that one import drags the whole remark / mdast / micromark / prettier parsing
 * toolchain into the bundle: 1,973,803 bytes (@tinacms/mdx 2.1.9) to reach a
 * 22-line URL sanitiser. It was ~1.14 MB minified on the deployed site and the
 * single largest attributable slice of the page's JavaScript.
 *
 * Aliasing the package here keeps `sanitizeUrl` — the only export any browser
 * code path actually needs — and drops the parser.
 *
 * HOW TO REMOVE THIS
 * ------------------
 * Upstream tinacms#7232 tracks the same problem and tinacms#7233 adds a
 * dependency-free `@tinacms/mdx/sanitize-url` subpath. Once that ships in a
 * release we consume, delete this file and its two aliases in `next.config.mjs`
 * and bump `tinacms` / `@tinacms/mdx`. See SSW.Website#4896.
 *
 * KEEPING IT HONEST
 * -----------------
 * `sanitizeUrl` below is a verbatim copy from @tinacms/mdx@2.1.9 (byte-identical
 * in both `dist/index.js` and `dist/index.browser.js`). If you bump the Tina
 * packages, re-diff it against the new build before assuming it still matches.
 */

// Verbatim from @tinacms/mdx@2.1.9 — do not "improve" it; it must match upstream.
export const sanitizeUrl = (url) => {
  const allowedSchemes = ["http", "https", "mailto", "tel", "xref"];
  if (!url) return "";
  let parsedUrl = null;
  try {
    parsedUrl = new URL(url);
  } catch (error) {
    return url;
  }
  const scheme = parsedUrl.protocol.slice(0, -1);
  if (allowedSchemes && !allowedSchemes.includes(scheme)) {
    // eslint-disable-next-line no-console -- upstream behaviour, kept as-is
    console.warn(`Invalid URL scheme detected ${scheme}`);
    return "";
  }
  if (parsedUrl.pathname === "/") {
    if (url.endsWith("/")) {
      return parsedUrl.href;
    }
    return `${parsedUrl.origin}${parsedUrl.search}${parsedUrl.hash}`;
  } else {
    return parsedUrl.href;
  }
};

/**
 * The other two exports of `@tinacms/mdx`. Neither runs in a browser on a public
 * page: `serializeMDX` is reached only from `tinacms/dist/index.js` on the
 * editor's save path, and `parseMDX` only from the Tina GraphQL layer, which runs
 * in the `@tinacms/cli` process and in `/admin` — both built outside this Next
 * config, so both still get the real package.
 *
 * They throw rather than returning a plausible-looking value so that if that
 * assumption is ever wrong we get a loud, traceable failure instead of silently
 * mangled content.
 */
const unavailable = (name) => () => {
  throw new Error(
    `${name}() is not available: @tinacms/mdx is aliased to lib/tinacms-mdx-shim.js ` +
      `to keep the ~2 MB markdown parser out of the browser bundle. If you genuinely ` +
      `need ${name}() in the Next build, remove the alias in next.config.mjs and ` +
      `re-measure the bundle. See SSW.Website#4896.`
  );
};

export const parseMDX = unavailable("parseMDX");
export const serializeMDX = unavailable("serializeMDX");
