import client from "@/tina/client";
import * as appInsights from "applicationinsights";
import { NextApiRequest, NextApiResponse } from "next";
import { cache } from "services/server/cacheService";
import * as yup from "yup";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;

const querySchema = yup.object({
  paletteName: yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);

  try {
    const query = await querySchema.validate(req.query);

    const paletteName = query.paletteName;

    const cached = cache.get(paletteName);

    if (cached == undefined) {
      const tinaData = await client.queries.palette({
        relativePath: `${paletteName}.json`,
      });

      cache.set(paletteName, tinaData.data.palette, CACHE_SECS);

      res.status(200).json(tinaData.data.palette);
    } else {
      res.status(200).json(cached);
    }
  } catch (err) {
    appInsights?.defaultClient?.trackException({
      exception: err,
      properties: {
        Request: "GET /api/get-colors",
        Status: 500,
      },
      severity: appInsights.Contracts.SeverityLevel.Error,
    });

    console.error(err);

    res.status(200).json({});
  }
}
