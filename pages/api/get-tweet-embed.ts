import * as appInsights from "applicationinsights";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.url) {
      res.status(400).json({ message: "Missing url query param" });
      return;
    }

    try {
      const response = await fetch(
        `https://publish.twitter.com/oembed?url=${req.query.url}&omit_script=1`
      );
      const body = await response.json();

      res.status(200).json(body);
    } catch (err) {
      appInsights.defaultClient.trackException({
        properties: {
          Request: "GET /api/get-tweet-embed",
          Status: 500,
        },
        exception: err,
        severity: appInsights.Contracts.SeverityLevel.Error,
      });
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
