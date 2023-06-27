import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { isEmail } from "validator";
import { getSpeakersInfo } from "../../services/events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const idsParam = req.query.ids;
    const emailsParam = req.query.emails;

    // We know that ids are numbers of type string, e.g. "123", so we can validate query ids like this
    const ids: number[] =
      typeof idsParam === "string"
        ? [parseInt(idsParam)]
        : idsParam.map((id) => parseInt(id));

    if (ids?.some((id) => isNaN(id))) {
      res.status(400).json({ message: "Invalid speaker id" });
      return;
    }

    const emails =
      typeof emailsParam === "string" ? [emailsParam] : emailsParam;

    if (emails?.some((email) => !isEmail(email))) {
      res.status(400).json({ message: "Invalid email provided" });
      return;
    }

    try {
      const speakersInfo = await getSpeakersInfo(ids, emails);
      res.status(200).json(speakersInfo);
    } catch (err) {
      const properties = {
        Request: "GET /api/get-speakers",
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
