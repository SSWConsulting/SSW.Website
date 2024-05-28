import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  addNoIndexHeaders(request, response);

  const url = request.nextUrl.clone();
  const pathname = url.pathname.toLowerCase();

  // Skip middleware for API routes and static files
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/static/")
  ) {
    return response;
  }

  if (url.pathname !== pathname) {
    url.pathname = pathname;
    return NextResponse.redirect(url);
  }

  return response;
}
