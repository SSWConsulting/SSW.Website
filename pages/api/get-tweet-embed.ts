import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.url) {
      res.status(400).json({ message: "Missing url query param" });
      return;
    }

    const response = await fetch(
      `https://publish.twitter.com/oembed?url=${req.query.url}&omit_script=1`
    );
    const body = await response.json();

    console.log(body);

    res.status(200).json(body);
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
