import { NextRequest, NextResponse } from "next/server";

export const addNoIndexHeaders = (
  request: NextRequest,
  response: NextResponse
) => {
  const host = request.headers.get("host");

  if (host?.includes("pr") || host?.includes("staging")) {
    response.headers.set("X-Robots-Tag", "noindex");
  }
};
