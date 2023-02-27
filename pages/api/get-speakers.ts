import { NextApiRequest, NextApiResponse } from "next";
import { getSpeakersInfo } from "../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const idsParam = req.query["ids"];
    const emailsParam = req.query["emails"];

    console.log('query', req.query)

    const ids = typeof idsParam === "string" ? [idsParam] : idsParam;
    const emails =
      typeof emailsParam === "string" ? [emailsParam] : emailsParam;

    const speakersInfo = await getSpeakersInfo(ids, emails);
    res.status(200).json(speakersInfo);
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
