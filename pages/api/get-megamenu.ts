import { NextApiRequest, NextApiResponse } from "next";
import client from "../../.tina/__generated__/client";

const CACHE_MINS = 60;
const CACHE_SECS = CACHE_MINS * 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", `s-maxage=${CACHE_SECS}`);

  const tinaData = await client.queries.megamenu({ relativePath: "menu.json" });

  res.status(200).json(tinaData.data.megamenu);
}
