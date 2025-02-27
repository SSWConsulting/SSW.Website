import client from "@/tina/client";
import * as appInsights from "applicationinsights";
import { NextResponse } from "next/server";
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

      return NextResponse.json(tinaData.data.megamenu, responseHeaders);
    } else {
      return NextResponse.json(cached, responseHeaders);
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

    console.error(err);

    return NextResponse.json(megaMenuJson, responseHeaders);
  }
}
