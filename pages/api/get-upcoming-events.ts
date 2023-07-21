import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { cache } from "../../services/server/cacheService";
import { getEvents } from "../../services/server/events";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;
const CACHE_KEY = "upcoming-events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const topCountParam = req.query.top;
    if (!topCountParam) {
      res.status(400).json({ message: "Unsupported query param" });
      return;
    }

    const topCount = parseInt(topCountParam as string);
    if (isNaN(topCount)) {
      res.status(400).json({ message: "Invalid top count" });
      return;
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const odataFilter = `$filter=fields/Enabled ne false \
      and fields/EndDateTime gt '${startOfDay.toISOString()}'\
      &$orderby=fields/StartDateTime asc\
      &$top=${topCount}`;

    try {
      const cachedEvents = cache.get(`${CACHE_KEY}-${topCount}`);
      if (cachedEvents == undefined) {
        const events = await getEvents(odataFilter);
        cache.set(`${CACHE_KEY}-${topCount}`, events, CACHE_SECS);

        res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);
        return res.status(200).json(events);
      }

      res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);
      res.status(200).json(cachedEvents);
    } catch (err) {
      const properties = {
        Request: "GET /api/get-upcoming-events",
        Status: 500,
        FailedSharePointRequest: false,
      };

      if (err instanceof AxiosError) {
        console.error(err.response.data);
        properties.Status = err.response.status;
        properties.FailedSharePointRequest = true;
      }

      appInsights.defaultClient.trackException({
        exception: err,
        properties,
        severity: appInsights.Contracts.SeverityLevel.Error,
      });
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
