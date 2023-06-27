import { NextApiRequest, NextApiResponse } from "next";
import { getEvents, getToken } from "../../services/events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datetimeParam = req.query["datetime"];
    const topCountParam = req.query["top"];
    if (typeof datetimeParam !== "string" || !topCountParam) {
      res.status(400).json({ message: "Unsupported query param" });
      return;
    }

    const odataFilter = `$filter=fields/Enabled ne false \
      and fields/EndDateTime gt '${datetimeParam as string}'\
      &$orderby=fields/StartDateTime asc\
      &$top=${topCountParam as string}`;

    try {
      const events = await getEvents(odataFilter);
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    res.status(200).send(await getToken());
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
