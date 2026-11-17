// How a link written in rich-text content should behave, per the SSW rules
// https://www.ssw.com.au/rules/indicate-external-links,
// https://www.ssw.com.au/rules/open-external-links and
// https://www.ssw.com.au/rules/use-icons-to-not-surprise-users:
//
// - internal: a page on this site. Same tab, no icon.
// - branded:  another SSW app on ssw.com.au (People, Rules, the old /ssw
//             site). New tab, no icon - it's still "us".
// - youtube:  a YouTube video or channel. New tab, YouTube icon.
// - maps:     a Google Maps link. New tab, map pin icon.
// - external: any other site. New tab, external-link icon.
// - other:    mailto:, tel: and other non-web links. Left as they are.
export type LinkKind =
  | "internal"
  | "branded"
  | "youtube"
  | "maps"
  | "external"
  | "other";

const SSW_HOST = /(^|\.)ssw\.com\.au$/i;
// Same paths CustomLink treats as separate SSW sites.
const SSW_SUBSITE_PATH = /^\/(people|rules|ssw)(\/|$)/i;
const YOUTUBE_HOST = /(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/i;
// google.com, google.com.au, etc.
const GOOGLE_HOST = /(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/i;
const GOOGLE_MAPS_HOST = /^maps\.(google\.[a-z.]+|app\.goo\.gl)$/i;
const ABSOLUTE_WEB_URL = /^(https?:)?\/\//i;
const ALLOWED_SCHEME = /^(https?|mailto|tel):/i;
const ANY_SCHEME = /^[a-z][a-z\d+.-]*:/i;

/**
 * Drops links with a scheme other than http, https, mailto or tel (e.g.
 * `javascript:`), as TinaMarkdown's own link renderer does.
 */
export const safeHref = (href?: string | null): string => {
  const value = href?.trim() ?? "";
  if (ANY_SCHEME.test(value) && !ALLOWED_SCHEME.test(value)) {
    return "about:blank";
  }
  return value;
};

const isGoogleMaps = (url: URL) =>
  GOOGLE_MAPS_HOST.test(url.hostname) ||
  (GOOGLE_HOST.test(url.hostname) && /^\/maps(\/|$)/i.test(url.pathname)) ||
  (/^goo\.gl$/i.test(url.hostname) && /^\/maps(\/|$)/i.test(url.pathname));

export const getLinkKind = (href?: string | null): LinkKind => {
  const value = href?.trim() ?? "";
  if (!value || value === "about:blank") return "other";
  if (!ABSOLUTE_WEB_URL.test(value)) {
    // Relative paths, #anchors and ?queries stay on this site.
    return ANY_SCHEME.test(value) ? "other" : "internal";
  }

  let url: URL;
  try {
    url = new URL(value.startsWith("//") ? `https:${value}` : value);
  } catch {
    return "other";
  }

  if (SSW_HOST.test(url.hostname)) {
    return SSW_SUBSITE_PATH.test(url.pathname) ? "branded" : "internal";
  }
  if (YOUTUBE_HOST.test(url.hostname)) return "youtube";
  if (isGoogleMaps(url)) return "maps";
  return "external";
};
