import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow AI to index the llms.txt file - just like a robots.txt file for bots - https://thedaviddias.medium.com/getting-started-with-llms-txt-226df8012257
  response.headers.set("X-Robots-Tag", "llms-txt");

  addNoIndexHeaders(request, response);

  return response;
}
