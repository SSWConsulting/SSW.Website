import * as appInsight from "applicationinsights";
import { NextApiRequest, NextApiResponse } from "next";

import {
  HttpStatusCode,
  PowerAutomate_Endpoint,
  STAGE,
} from "../../services/model";

import { GoogleRecaptcha } from "../../services/server/google-recaptcha";
import { PA_FLOW } from "../../services/server/power-automate-flow";

import { CustomError } from "../../services/server/customError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { Recaptcha } = req.body;
      if (Recaptcha) {
        const recaptchaValidation = await GoogleRecaptcha.validateRecaptcha(
          Recaptcha
        );
        // const recaptchaValidation = { data: { success: true } }; uncomment this to bypass recaptcha for testing purpose

        if (recaptchaValidation && recaptchaValidation.data.success) {
          const createLeadFlow = await PA_FLOW.invokePowerAutomateFlow(
            req.body,
            process.env.CREATE_LEAD_ENDPOINT
          );

          if (createLeadFlow.status !== HttpStatusCode.Accepted) {
            throw new CustomError(
              JSON.stringify(createLeadFlow.data),
              createLeadFlow.status,
              JSON.stringify(req.body),
              appInsight.Contracts.SeverityLevel.Critical,
              STAGE.PA_FLOW
            );
          }
          res.status(createLeadFlow.status).json({ success: true });
        } else {
          throw new CustomError(
            JSON.stringify(recaptchaValidation.data),
            recaptchaValidation.status,
            JSON.stringify(req.body),
            appInsight.Contracts.SeverityLevel.Error,
            STAGE.GOOGLE_RECAPTCHA
          );
        }
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ message: "Recaptcha not found!", success: false });
      }
    } else {
      throw new Error("Unsupported method");
    }
  } catch (error) {
    if (error instanceof CustomError) {
      appInsight.defaultClient?.trackException({
        exception: new Error(error.message),
        properties: {
          Method: `${PowerAutomate_Endpoint.CREATE_LEAD} - ${error.method}`,
          RequestBody: error.requestBody,
          Status: error.statusCode,
        },
        severity: error.severity,
      });

      res.status(error.statusCode).json({ message: error.message });
    } else {
      res
        .status(HttpStatusCode.MethodNotAllowed)
        .json({ message: error.message });
    }
  }
}
