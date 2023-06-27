import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getSpeakersInfo } from "../../services/events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const idsParam = req.query.ids;
    const emailsParam = req.query.emails;

    console.log(idsParam);

    const ids: number[] =
      typeof idsParam === "string"
        ? [parseInt(idsParam)]
        : idsParam.map((id) => parseInt(id));

    if (ids.some((id) => isNaN(id))) {
      res.status(400).json({ message: "Invalid speaker id" });
      return;
    }

    const emails =
      typeof emailsParam === "string" ? [emailsParam] : emailsParam;

    try {
      const speakersInfo = await getSpeakersInfo(ids, emails);
      res.status(200).json(speakersInfo);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.response.data);
      }
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
