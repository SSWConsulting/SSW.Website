import { NextApiRequest, NextApiResponse } from "next";
import { getUpcomingEvents } from "../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datetimeParam = req.query["datetime"];
    const topCountParam = +req.query["top"];
    if (typeof datetimeParam !== "string" || !topCountParam) {
      res.status(401).json({ message: "Unsupported query param" });
    }

    const upcomingEventsRes = await getUpcomingEvents(
      <string>datetimeParam,
      topCountParam
    );
    res.status(upcomingEventsRes.status).json(upcomingEventsRes.data);
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
