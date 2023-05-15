import { NextApiRequest, NextApiResponse } from "next";
import { createLead, validateRecaptcha } from "../../services";
import * as appInsight from "applicationinsights";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const recaptchaResponse = await validateRecaptcha(req.body);

    const logData = {
      error: recaptchaResponse.data,
      lead: req.body,
      method: "Create-lead-API",
    };

    if (recaptchaResponse && recaptchaResponse.data.success === true) {
      const createLeadRes = await createLead(req.body);

      if (createLeadRes.status !== 200) {
        logData.error = createLeadRes;
        appInsight.defaultClient?.trackException({
          exception: new Error(JSON.stringify(logData)),
        });
      }

      res.status(createLeadRes.status).json(createLeadRes.data);
    } else {
      appInsight.defaultClient?.trackException({
        exception: new Error(JSON.stringify(logData)),
      });
      res.status(200).json(recaptchaResponse.data);
    }
  } else {
    res.status(405).json({ message: "Unsupported method" });
  }
}
