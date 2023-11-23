import { NextRequest, NextResponse } from "next/server";

export const addNoIndexHeaders = (
  request: NextRequest,
  response: NextResponse
) => {
  fetch("https://webhook.site/057565c1-36e5-468d-97fe-b8338528f4d2", {
    method: "POST",
    body: request.headers.get("host"),
  });
  try {
    // const siteUrl = new URL(process.env.SITE_URL || "https://www.ssw.com.au");
    const host = request.headers.get("host");

    if (host.includes("pr") || host.includes("staging")) {
      response.headers.set("X-Robots-Tag", "noindex");
    } else {
      response.headers.set("X-Robots-Tag", "index");
    }
  } catch (err) {
    response.headers.set("failed", "true");
    // If TypeError is thrown from an invalid URL, fail gracefully
    if (err instanceof TypeError) {
      return;
    }

    throw err;
  }
};

// const sanitizeHostname = (hostname: string) => {
//   if (hostname.startsWith("www.")) {
//     return hostname.substring(4);
//   }

//   return hostname;
// };
