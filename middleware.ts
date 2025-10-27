import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  // Set the pathname in request headers for conditional rendering in layouts
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add HSTS headers (180 days)
  response.headers.set("Strict-Transport-Security", "max-age=15552000");
  // Allow AI to index the llms.txt file - just like a robots.txt file for bots - https://thedaviddias.medium.com/getting-started-with-llms-txt-226df8012257
  response.headers.set("X-Robots-Tag", "llms-txt");

  addNoIndexHeaders(request, response);

  return response;
}
