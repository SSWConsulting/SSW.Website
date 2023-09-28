import { NextApiRequest, NextApiResponse } from "next";
import { getInternalSpeakers } from "../../services/server/events";
import { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const speakers = await getInternalSpeakers();
      res.status(200).json({ speakers });
    } catch (err) {
      if (err instanceof AxiosError) {
        res.status(500).json(err);
        return;
      }

      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
