import * as appInsights from "applicationinsights";
import { NextApiRequest, NextApiResponse } from "next";
import { cache } from "services/server/cacheService";
import client from "../../.tina/__generated__/client";
import megaMenuJson from "../../content/megamenu/menu.json";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);

  try {
    const cached = cache.get("megamenu");

    if (cached == undefined) {
      const tinaData = await client.queries.megamenu({
        relativePath: "menu.json",
      });

      cache.set("megamenu", tinaData.data.megamenu, CACHE_SECS);

      res.status(200).json(tinaData.data.megamenu);
    } else {
      res.status(200).json(cached);
    }
  } catch (err) {
    appInsights?.defaultClient?.trackException({
      exception: err,
      properties: {
        Request: "GET /api/get-megamenu",
        Status: 500,
      },
      severity: appInsights.Contracts.SeverityLevel.Error,
    });

    console.error(err);

    res.status(200).json(megaMenuJson);
  }
}
