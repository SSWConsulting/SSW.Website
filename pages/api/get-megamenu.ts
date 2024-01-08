import * as appInsights from "applicationinsights";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../.tina/__generated__/client";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);

  try {
    const tinaData = await client.queries.megamenu({
      relativePath: "menu.json",
    });

    res.status(200).json(tinaData.data.megamenu);
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
    res.status(500).json({ message: "Error getting megamenu data" });
  }
}
