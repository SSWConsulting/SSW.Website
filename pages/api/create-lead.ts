import { NextApiRequest, NextApiResponse } from "next";
import { createLead, validateRecaptcha } from "../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const recaptchaResponse = await validateRecaptcha(req.body);

    if (recaptchaResponse && recaptchaResponse.data.success === true) {
      const createLeadRes = await createLead(req.body);
      res.status(createLeadRes.status).json(createLeadRes.data);
    } else {
      console.log(
        "🚀 ~ file: validate-token.ts:15 ~ validition.data.data:",
        recaptchaResponse.data
      );
      res.status(200).json(recaptchaResponse.data);
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
