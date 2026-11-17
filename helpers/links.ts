// How a link written in rich-text content should behave, per the SSW rules
// https://www.ssw.com.au/rules/indicate-external-links and
// https://www.ssw.com.au/rules/open-external-links:
//
// - internal: a page on this site. Same tab, no icon.
// - branded:  another SSW app on ssw.com.au (People, Rules, the old /ssw
//             site) or tina.io. New tab, no icon - they're still "us".
// - external: any other site. New tab, plus an icon.
// - other:    mailto:, tel: and other non-web links. Left as they are.
export type LinkKind = "internal" | "branded" | "external" | "other";

const SSW_HOST = /(^|\.)ssw\.com\.au$/i;
const TINA_HOST = /(^|\.)tina\.io$/i;
// Same paths CustomLink treats as separate SSW sites.
const SSW_SUBSITE_PATH = /^\/(people|rules|ssw)(\/|$)/i;
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
  if (TINA_HOST.test(url.hostname)) return "branded";
  return "external";
};
