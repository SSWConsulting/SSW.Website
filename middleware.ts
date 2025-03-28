import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add HSTS headers (180 days)
  response.headers.set("Strict-Transport-Security", "max-age=15552000");

  addNoIndexHeaders(request, response);

  return response;
}
