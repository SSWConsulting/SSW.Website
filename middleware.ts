import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Clacks-Overhead", "GNU Terry Pratchett");
  addNoIndexHeaders(request, response);

  return response;
}
