import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Normalize uppercase characters in the FIRST path segment only.
  // Every top-level app-router segment and Tina `pages` filename in this
  // repo is lowercase, but some deeper Tina filenames are intentionally
  // mixed-case (e.g. /consulting/TenderPortals), so we must not touch
  // anything beyond the first segment.
  if (shouldNormalizeCase(pathname)) {
    const firstSlash = pathname.indexOf("/", 1);
    const firstSegment =
      firstSlash === -1 ? pathname.slice(1) : pathname.slice(1, firstSlash);

    if (firstSegment !== firstSegment.toLowerCase()) {
      const url = request.nextUrl.clone();
      url.pathname =
        "/" +
        firstSegment.toLowerCase() +
        (firstSlash === -1 ? "" : pathname.slice(firstSlash));
      return NextResponse.redirect(url, 308);
    }
  }

  const response = NextResponse.next();

  // Add HSTS headers (180 days)
  response.headers.set("Strict-Transport-Security", "max-age=15552000");
  // Allow AI to index the llms.txt file - just like a robots.txt file for bots - https://thedaviddias.medium.com/getting-started-with-llms-txt-226df8012257
  response.headers.set("X-Robots-Tag", "llms-txt");

  addNoIndexHeaders(request, response);

  return response;
}

function shouldNormalizeCase(pathname: string): boolean {
  if (pathname.startsWith("/_next/")) return false;
  if (pathname.startsWith("/api/")) return false;
  // Skip anything that looks like a static file (has an extension in the
  // last segment), e.g. /favicon.ico, /sitemap-0.xml, /images/foo.png.
  const lastSlash = pathname.lastIndexOf("/");
  const lastSegment = pathname.slice(lastSlash + 1);
  if (lastSegment.includes(".")) return false;
  return true;
}
