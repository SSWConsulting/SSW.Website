import { NextApiRequest, NextApiResponse } from "next";
import { LiveStreamWidgetInfo, getEvents } from "../../services/events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const eventIdParam = req.query["eventId"];
    if (typeof eventIdParam !== "string") {
      res.status(401).json({ message: "Unsupported query param" });
    }

    const odataFilter =
      "$orderby=fields/StartDateTime desc\
      &$top=10";

    const events: LiveStreamWidgetInfo[] = await getEvents(odataFilter);
    res.status(200).json(events);
    return;

    const event = events?.length ? events[0] : null;

    const eventRes: LiveStreamWidgetInfo = {
      ...event,
      ChannelId: "UCBFgwtV9lIIhvoNh0xoQ7Pg", // hard coded for now
    };

    res.status(200).json(eventRes);
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
