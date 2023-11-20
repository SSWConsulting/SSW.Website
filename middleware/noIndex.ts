import { NextRequest, NextResponse } from "next/server";

export const addNoIndexHeaders = (
  request: NextRequest,
  response: NextResponse
) => {
  try {
    const siteUrl = new URL(process.env.SITE_URL || "https://www.ssw.com.au");

    if (
      sanitizeHostname(request.nextUrl.hostname) !== sanitizeHostname(siteUrl.hostname)
    ) {
      response.headers.set("X-Robots-Tag", "noindex");
    }
  } catch (err) {
    // If TypeError is thrown from an invalid URL, fail gracefully
    if (err instanceof TypeError) {
      return;
    }

    throw err;
  }
};

const sanitizeHostname = (hostname: string) => {
  if (hostname.startsWith("www.")) {
    return hostname.substring(4);
  }

  return hostname;
};
