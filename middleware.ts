import { NextRequest, NextResponse } from "next/server";
import { addNoIndexHeaders } from "./middleware/noIndex";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add HSTS headers (2 years) — note: includeSubDomains/preload intentionally omitted
  response.headers.set("Strict-Transport-Security", "max-age=63072000");
  // Stop other sites from framing us (clickjacking) — but allow ourselves (TinaCMS preview)
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  // Stop the browser guessing file types (MIME sniffing)
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Don't leak full URLs (with query strings) to other sites on outbound links
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Allow AI to index the llms.txt file - just like a robots.txt file for bots - https://thedaviddias.medium.com/getting-started-with-llms-txt-226df8012257
  response.headers.set("X-Robots-Tag", "llms-txt");

  addNoIndexHeaders(request, response);

  return response;
}
