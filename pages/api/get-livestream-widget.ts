import { NextApiRequest, NextApiResponse } from "next";
import { getLiveStreamWidgetInfo } from "../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const eventIdParam = req.query["eventId"];
    if (typeof eventIdParam !== "string") {
      res.status(401).json({ message: "Unsupported query param" });
    }

    const widgetInfoRes = await getLiveStreamWidgetInfo(<string>eventIdParam);
    res.status(widgetInfoRes.status).json(widgetInfoRes.data);
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
