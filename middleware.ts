import { addNoIndexHeaders } from "middleware/noIndex";
import { NextRequest, NextResponse } from "next/server";

const IGNORED_PATH_PREFIXES = [
  "/api/",
  "/_next/static/",
  "/images/",
  "/pubic/",
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  addNoIndexHeaders(request, response);
  const url = request.nextUrl.clone();

  // Skip middleware for API routes and static files
  if (IGNORED_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    return response;
  }

  const pathname = url.pathname.toLowerCase();

  if (url.pathname !== pathname) {
    url.pathname = pathname;
    const rewrittenResponse = NextResponse.rewrite(url);
    addNoIndexHeaders(request, rewrittenResponse);
    return rewrittenResponse;
  }

  return response;
}
