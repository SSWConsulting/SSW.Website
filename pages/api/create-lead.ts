import { NextApiRequest, NextApiResponse } from "next";
import * as appInsight from "applicationinsights";
import { BookingFormSubmissionData } from "../../services";
import axios from "axios";

const createLead = async (data: BookingFormSubmissionData) => {
  return await axios.post(process.env.CREATE_LEAD_ENDPOINT, data, {
    headers: { "Content-Type": "application/json" },
  });
};

const validateRecaptcha = async ({ Recaptcha }) => {
  return await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_KEY_V2}&response=${Recaptcha}`
  );
};

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
