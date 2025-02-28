import * as appInsights from "applicationinsights";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json(
      { message: "Missing url query param" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://publish.twitter.com/oembed?url=${url}&omit_script=1`
    );
    const body = await response.json();
    return Response.json(body, { status: 200 });
  } catch (err) {
    appInsights.defaultClient.trackException({
      properties: {
        Request: "GET /api/get-tweet-embed",
        Status: 500,
      },
      exception: err,
      severity: appInsights.KnownSeverityLevel.Error,
    });
    return Response.json({ message: err.message }, { status: 500 });
  }
}

// Handle unsupported methods
export async function POST() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}

export async function PUT() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}

export async function DELETE() {
  return Response.json({ message: "Unsupported method" }, { status: 405 });
}
