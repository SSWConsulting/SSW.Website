import { NextApiRequest, NextApiResponse } from "next";
import client from "../../.tina/__generated__/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tinaData = await client.queries.megamenu({ relativePath: "menu.json" });

  res.status(200).json(tinaData.data.megamenu);
}
