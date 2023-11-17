import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.hostname.includes("staging") ||
    process.env.APP_ENV === "pull-request"
  ) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  }
}
