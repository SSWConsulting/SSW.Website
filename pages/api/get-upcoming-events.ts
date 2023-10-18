import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { cache } from "../../services/server/cacheService";
import { getEvents } from "../../services/server/events";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;
const CACHE_KEY = "upcoming-events";

const isCacheOutdated = async (cacheEvents) => {
  return cacheEvents.some((event) => event.EndDateTime < Date.now());
};

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

    res.status(200).json(startOfDay);
    return;

    const odataFilter = `$filter=fields/Enabled ne false \
      and fields/EndDateTime gt '${startOfDay.toISOString()}'\
      &$orderby=fields/StartDateTime asc\
      &$top=${topCount}`;

    try {
      const cachedEvents = cache.get(`${CACHE_KEY}-${topCount}`);

      if (
        cachedEvents == undefined ||
        (cachedEvents && isCacheOutdated(cachedEvents))
      ) {
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
      console.log("err", err);
      appInsights.defaultClient.trackException({
        exception: err,
        properties,
        severity: appInsights.Contracts.SeverityLevel.Error,
      });
      res.status(500).json({ message: "SharePoint request failed" });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
