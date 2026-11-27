// How a link written in rich-text content should behave, per the SSW rules
// https://www.ssw.com.au/rules/indicate-external-links,
// https://www.ssw.com.au/rules/open-external-links and
// https://www.ssw.com.au/rules/use-icons-to-not-surprise-users:
//
// - internal: a page on this site. Same tab, no icon.
// - branded:  another SSW site: People, Rules, the old /ssw site, an SSW
//             subdomain such as rules.ssw.com.au, or an SSW-owned domain such
//             as tina.io or yakshaver.ai. Same tab, no icon - it's still "us".
// - youtube:  a YouTube video or channel. New tab, YouTube icon.
// - maps:     a Google Maps link. New tab, map pin icon.
// - external: any other site. New tab, external-link icon.
// - email:    a mailto: link. Same tab, email icon.
// - other:    tel: and other non-web links. Left as they are.
export type LinkKind =
  "internal" | "branded" | "youtube" | "maps" | "external" | "email" | "other";

// This site. Any other SSW subdomain (rules., blog., design.) is another app.
const SSW_WEBSITE_HOST = /^(www\.)?ssw\.com\.au$/i;
// Paths on this domain that are separate SSW apps.
export const SSW_SUBSITE_PATH = /^\/(people|rules|ssw)(\/|$)/i;
// Every domain SSW owns. A link to one of these, or any of its subdomains, is
// SSW's own site, not an outside one.
const SSW_OWNED_DOMAINS = [
  "ssw.com.au",
  "ssw.com",
  "ssw.fr",
  "ssw.com.cn",
  "sswchapel.com.au",
  "sswdigital.com.au",
  "tina.io",
  "yakshaver.ai",
  "sugarlearning.com",
  "firebootcamp.com",
  "codeauditor.com",
];
const YOUTUBE_HOST = /(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/i;
// google.com, google.com.au, etc.
const GOOGLE_HOST = /(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/i;
const GOOGLE_MAPS_HOST = /^maps\.(google\.[a-z.]+|app\.goo\.gl)$/i;
const ABSOLUTE_WEB_URL = /^(https?:)?\/\//i;
const ANY_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];
const BASE_URL = "https://www.ssw.com.au";

export const isSswOwnedHost = (hostname: string): boolean => {
  const host = hostname.toLowerCase();
  return SSW_OWNED_DOMAINS.some(
    (domain) => host === domain || host.endsWith(`.${domain}`)
  );
};

const parseAbsolute = (value: string): URL | null => {
  try {
    return new URL(value.startsWith("//") ? `https:${value}` : value);
  } catch {
    return null;
  }
};

/**
 * An absolute link to an SSW-owned site (any SSW domain or subdomain),
 * including the separate apps on www.ssw.com.au such as /rules.
 */
export const isSswOwnedUrl = (href?: string | null): boolean => {
  const value = href?.trim() ?? "";
  if (!ABSOLUTE_WEB_URL.test(value)) return false;
  const url = parseAbsolute(value);
  return !!url && isSswOwnedHost(url.hostname);
};

/**
 * An absolute link to one of the separate SSW apps on www.ssw.com.au
 * (/people, /rules, /ssw).
 */
export const isSswSubsiteUrl = (href?: string | null): boolean => {
  const value = href?.trim() ?? "";
  if (!ABSOLUTE_WEB_URL.test(value)) return false;
  const url = parseAbsolute(value);
  return (
    !!url &&
    SSW_WEBSITE_HOST.test(url.hostname) &&
    SSW_SUBSITE_PATH.test(url.pathname)
  );
};

/**
 * Drops links with a scheme other than http, https, mailto or tel (e.g.
 * `javascript:`), as TinaMarkdown's own link renderer does. The scheme is read
 * the way the browser reads it, so `java\tscript:` is caught too.
 */
export const safeHref = (href?: string | null): string => {
  const value = href?.trim() ?? "";
  if (!value) return value;
  try {
    const { protocol } = new URL(value, BASE_URL);
    return ALLOWED_PROTOCOLS.includes(protocol) ? value : "about:blank";
  } catch {
    return "about:blank";
  }
};

const isGoogleMaps = (url: URL) =>
  GOOGLE_MAPS_HOST.test(url.hostname) ||
  (GOOGLE_HOST.test(url.hostname) && /^\/maps(\/|$)/i.test(url.pathname)) ||
  (/^goo\.gl$/i.test(url.hostname) && /^\/maps(\/|$)/i.test(url.pathname));

export const getLinkKind = (href?: string | null): LinkKind => {
  const value = href?.trim() ?? "";
  if (!value || value === "about:blank") return "other";
  if (!ABSOLUTE_WEB_URL.test(value)) {
    if (/^mailto:/i.test(value)) return "email";
    if (ANY_SCHEME.test(value)) return "other";
    // Relative paths, #anchors and ?queries stay on this site - except
    // root-relative links to the SSW subsites (/rules, /people), which are
    // separate apps.
    const { pathname } = new URL(value, BASE_URL);
    return value.startsWith("/") && SSW_SUBSITE_PATH.test(pathname)
      ? "branded"
      : "internal";
  }

  const url = parseAbsolute(value);
  if (!url) return "other";

  if (SSW_WEBSITE_HOST.test(url.hostname)) {
    return SSW_SUBSITE_PATH.test(url.pathname) ? "branded" : "internal";
  }
  if (isSswOwnedHost(url.hostname)) return "branded";
  if (YOUTUBE_HOST.test(url.hostname)) return "youtube";
  if (isGoogleMaps(url)) return "maps";
  return "external";
};

/**
 * Whether a content link opens in a new tab. Only outside sites do; SSW's own
 * sites, email and phone links stay in the same tab.
 */
export const opensInNewTab = (kind: LinkKind): boolean =>
  kind === "external" || kind === "youtube" || kind === "maps";

/**
 * The `rel` for a link that opens in a new tab: outside sites get
 * `noopener noreferrer nofollow`, as in CustomLink. SSW's own sites only need
 * `noopener`.
 */
export const getLinkRel = (href?: string | null): string =>
  getLinkKind(href) === "branded" ? "noopener" : "noopener noreferrer nofollow";
