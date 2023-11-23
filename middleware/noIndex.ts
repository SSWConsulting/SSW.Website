import { NextRequest, NextResponse } from "next/server";

export const addNoIndexHeaders = (
  request: NextRequest,
  response: NextResponse
) => {
  try {
    const host = request.headers.get("host");

    if (host.includes("pr") || host.includes("staging")) {
      response.headers.set("X-Robots-Tag", "noindex");
    } else {
      response.headers.set("X-Robots-Tag", "index");
    }
  } catch (err) {
    // If TypeError is thrown from an invalid URL, fail gracefully
    if (err instanceof TypeError) {
      return;
    }

    throw err;
  }
};
