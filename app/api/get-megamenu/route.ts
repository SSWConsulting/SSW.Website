import client from "@/tina/client";
import * as appInsights from "applicationinsights";
import { cache } from "services/server/cacheService";
import megaMenuJson from "../../../content/megamenu/menu.json";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;

export async function GET() {
  const responseHeaders = {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": `s-maxage=${CACHE_SECS}`,
    },
  };

  try {
    const cached = cache.get("megamenu");
    if (cached == undefined) {
      const tinaData = await client.queries.megamenu({
        relativePath: "menu.json",
      });
      cache.set("megamenu", tinaData.data.megamenu, CACHE_SECS);
      return Response.json(tinaData.data.megamenu, responseHeaders);
    } else {
      return Response.json(cached, responseHeaders);
    }
  } catch (err) {
    appInsights?.defaultClient?.trackException({
      exception: err,
      properties: {
        Request: "GET /api/get-megamenu",
        Status: 500,
      },
      severity: appInsights.KnownSeverityLevel.Error,
    });
    return Response.json(megaMenuJson, responseHeaders);
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
