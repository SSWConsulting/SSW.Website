import { NextApiRequest, NextApiResponse } from "next";
import { createLead, validateToken } from "../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const validitionRes = await validateToken(req.body);

    if (validitionRes && validitionRes.data.success == true) {
      const createLeadRes = await createLead(req.body);
      res.status(createLeadRes.status).json(createLeadRes.data);
    } else {
      console.log(
        "🚀 ~ file: validate-token.ts:15 ~ validition.data.data:",
        validitionRes.data
      );
      res.status(200).json(validitionRes.data);
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
