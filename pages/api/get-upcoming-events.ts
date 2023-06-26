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
      res.status(401).json({ message: "Unsupported query param" });
    }

    const odataFilter = `$filter=fields/Enabled ne false \
      and fields/EndDateTime gt ${datetimeParam as string}\
      &$orderby=fields/StartDateTime desc\
      &$top=${topCountParam as string}`;

    const events = await getEvents(odataFilter);

    res.status(200).json(events);
  } else if (req.method == "POST") {
    res.json(await getToken());
    return;
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
