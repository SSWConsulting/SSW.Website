import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { ValidationError } from "yup";
import { cache } from "../../services/server/cacheService";
import { getEvents } from "../../services/server/events";
import { eventsQuerySchema } from "./get-upcoming-events";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;
const CACHE_KEY = "past-events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Unsupported method" });
    return;
  }

  try {
    const query = await eventsQuerySchema.validate(req.query);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const odataFilter = `$filter=fields/Enabled ne false \
      and fields/StartDateTime lt '${startOfDay.toISOString()}'\
      &$orderby=fields/StartDateTime desc\
      &$top=${query.top}`;

    try {
      const cachedEvents = cache.get(`${CACHE_KEY}-${query.top}-${query.page}`);

      if (!cachedEvents) {
        const events = await getEvents(odataFilter, query.page);
        cache.set(
          `${CACHE_KEY}-${query.top}-${query.page}`,
          events,
          CACHE_SECS
        );

        res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);
        return res.status(200).json(events);
      }

      res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);
      res.status(200).json(cachedEvents);
    } catch (err) {
      console.error(err);
      const properties = {
        Request: "GET /api/get-past-events",
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
      res.status(500).json({ message: "SharePoint request failed" });
    }
  } catch (err) {
    if (!(err instanceof ValidationError)) {
      return res.status(400).json({ message: "Invalid request" });
    }
    return res.status(400).json({ message: err.message });
  }
}
