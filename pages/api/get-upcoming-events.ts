import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { cache } from "../../services/server/cacheService";
import { getEvents } from "../../services/server/events";

dayjs.extend(utc);
dayjs.extend(timezone);

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;
const CACHE_KEY = "upcoming-events";

const queryScema = yup.object({
  top: yup.number().required(),
  page: yup.number().notRequired(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Unsupported method" });
    return;
  }

  try {
    const query = await queryScema.validate(req.query);

    const startOfDay = dayjs()
      .tz("Australia/Sydney")
      .startOf("day")
      .toISOString();

    const odataFilter = `$filter=fields/Enabled ne false \
          and fields/EndDateTime gt '${startOfDay}'\
          &$orderby=fields/StartDateTime asc\
          &$top=${query.top}`;

    try {
      const cachedEvents = cache.get(`${CACHE_KEY}-${query.top}`);

      if (
        cachedEvents == undefined ||
        (cachedEvents && isCacheOutdated(cachedEvents))
      ) {
        const events = await getEvents(odataFilter, query.page);
        cache.set(`${CACHE_KEY}-${query.top}`, events, CACHE_SECS);

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
      } else {
        console.error(err);
      }
      appInsights.defaultClient.trackException({
        exception: err,
        properties,
        severity: appInsights.Contracts.SeverityLevel.Error,
      });
      res.status(500).json({ message: "SharePoint request failed" });
    }
  } catch (err) {
    if (!(err instanceof yup.ValidationError)) {
      return res.status(400).json({ message: "Invalid request" });
    }
    return res.status(400).json({ message: err.message });
  }
}

const isCacheOutdated = async (cacheEvents) => {
  return cacheEvents.some((event) => event.EndDateTime < Date.now());
};
