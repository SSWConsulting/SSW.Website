import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getSpeakersInfo } from "../../services/events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const idsParam = req.query["ids"];
    const emailsParam = req.query["emails"];

    const ids = typeof idsParam === "string" ? [idsParam] : idsParam;
    const emails =
      typeof emailsParam === "string" ? [emailsParam] : emailsParam;

    try {
      const speakersInfo = await getSpeakersInfo(ids, emails);
      console.log(speakersInfo);
      res.status(200).json(speakersInfo);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.response.data);
      }
      res.status(500).json({ message: err.message });
      return;
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
