import { NextApiRequest, NextApiResponse } from "next";
import { getEvents } from "../../services/events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datetimeParam = req.query["datetime"];
    if (typeof datetimeParam !== "string") {
      res.status(400).json({ message: "Unsupported query param" });
      return;
    }

    const odataFilter = `$filter=fields/Enabled ne false \
    and fields/EndDateTime ge '${datetimeParam as string}'\
    and fields/CalendarType eq 'User Groups'\
    &$orderby=fields/StartDateTime asc\
    &$top=1`;

    try {
      const bannerInfoRes = await getEvents(odataFilter);
      res.status(200).json(bannerInfoRes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
