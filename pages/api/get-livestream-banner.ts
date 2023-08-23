import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { cache } from "../../services/server/cacheService";
import { getEvents } from "../../services/server/events";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;
const CACHE_KEY = "banner-events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const isoTime = new Date().toISOString();

    const odataFilter = `$filter=fields/Enabled ne false \
    and fields/EndDateTime ge '${isoTime}'\
    and fields/CalendarType eq 'User Groups'\
    &$orderby=fields/StartDateTime asc\
    &$top=1`;

    try {
      const cachedEvents = cache.get(CACHE_KEY);

      if (cachedEvents == undefined) {
        const bannerInfoRes = await getEvents(odataFilter);
        cache.set(CACHE_KEY, bannerInfoRes, CACHE_SECS);

        res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);
        return res.status(200).json(bannerInfoRes);
      }

      res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);
      res.status(200).json(cachedEvents);
    } catch (err) {
      const properties = {
        Request: "GET /api/get-livestream-banner",
        Status: 500,
        FailedSharePointRequest: false,
      };

      if (err instanceof AxiosError) {
        console.error(err.response.data);
        properties.Status = err.response.status;
        properties.FailedSharePointRequest = true;
      }

      appInsights?.defaultClient?.trackException({
        exception: err,
        properties,
        severity: appInsights.Contracts.SeverityLevel.Error,
      });

      res.status(500).json({ message: "SharePoint event request failed" });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
