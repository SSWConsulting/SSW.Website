import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url: NextURL = request.nextUrl.clone();
  const path = url.pathname.toString();
  if (path.startsWith("/images/newsletter-uploads")) {
    url.pathname = path.replace("/images", "");
    return NextResponse.redirect(url, { status: 307 });
  }
  addNoIndexHeaders(request, response);
  return response;
}
