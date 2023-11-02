import * as appInsight from "applicationinsights";
import { NextApiRequest, NextApiResponse } from "next";
import { AddContactToNewslettersData } from "../../services/server/events";

import { PowerAutomate_Endpoint } from "../../services/model";
import { invokePowerAutomateFlow } from "../../services/server/power-automate-flow";

import axios from "axios";
import { CustomError } from "../../services/server/customError";

export const addContactToNewsletters = async (
  data: AddContactToNewslettersData
) =>
  await axios.post(process.env.NEWSLETTERS_ENDPOINT, data, {
    headers: { "Content-Type": "application/json" },
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const subscribeNewsletter = await invokePowerAutomateFlow(
        req.body,
        process.env.NEWSLETTERS_ENDPOINT
      );
      res.status(subscribeNewsletter.status).json(subscribeNewsletter.data);
    } else {
      res.status(405).json({ message: "Unsupported method" });
    }
  } catch (error) {
    if (error instanceof CustomError) {
      appInsight.defaultClient?.trackException({
        exception: new Error(error.message),
        properties: {
          Method: `${PowerAutomate_Endpoint.NEWSLETTERS} - ${error.method}`,
          RequestBody: error.requestBody,
          Status: error.statusCode,
        },
        severity: error.severity,
      });
      res.status(error.statusCode).json({ message: error.message });
    } else {
      appInsight.defaultClient?.trackException({
        exception: new Error(error.response.data.message),
        properties: {
          Method: `${PowerAutomate_Endpoint.NEWSLETTERS}`,
          RequestBody: req.body,
          Status: error.response.status,
        },
        severity: appInsight.Contracts.SeverityLevel.Error,
      });
      res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
  }
}
