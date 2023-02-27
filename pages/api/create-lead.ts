import { NextApiRequest, NextApiResponse } from "next";
import { createLead } from "../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const createLeadRes = await createLead(req.body);
    res.status(createLeadRes.status).json(createLeadRes.data);
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
