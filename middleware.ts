import { NextResponse } from "next/server";
// import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware() {
  const response = NextResponse.next();

  // addNoIndexHeaders(request, response);

  return response;
}
