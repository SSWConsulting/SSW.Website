import { NextApiRequest, NextApiResponse } from "next";
import * as appInsight from "applicationinsights";
import { BookingFormSubmissionData, HttpStatusCode } from "../../services";
import { CustomError } from "../../services/customError";
import axios, { AxiosError } from "axios";

enum STEP {
  PA_FLOW_AXIOS = "Power Automate flow - Axio",
  PA_FLOW = "Power Automate flow",
  GOOGLE_RECAPTCHA = "Google - Recaptcha",
}

const createLead = async (data: BookingFormSubmissionData) => {
  try {
    const response = await axios.post(process.env.CREATE_LEAD_ENDPOINT, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      throw new CustomError(
        axiosError.cause,
        HttpStatusCode.NotFound,
        data,
        appInsight.Contracts.SeverityLevel.Critical,
        STEP.PA_FLOW_AXIOS
      );
    } else {
      throw new Error(error);
    }
  }
};

const validateRecaptcha = async (Recaptcha) => {
  return await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_KEY_V2}&response=${Recaptcha}`
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { Recaptcha } = req.body;
      if (Recaptcha) {
        const recaptchaValidation = await validateRecaptcha(Recaptcha);
        // const recaptchaValidation = { data: { success: true } }; uncomment this to bypass recaptcha for testing purpose

        if (recaptchaValidation && recaptchaValidation.data.success) {
          const createLeadFlow = await createLead(req.body);

          if (createLeadFlow.status !== HttpStatusCode.Accepted) {
            throw new CustomError(
              JSON.stringify(createLeadFlow.data),
              createLeadFlow.status,
              req.body,
              appInsight.Contracts.SeverityLevel.Critical,
              STEP.PA_FLOW
            );
          }

          res
            .status(createLeadFlow.status)
            .json({ message: "Lead successfully submitted!" });
        } else {
          throw new CustomError(
            JSON.stringify(recaptchaValidation.data),
            HttpStatusCode.OK,
            req.body,
            appInsight.Contracts.SeverityLevel.Error,
            STEP.GOOGLE_RECAPTCHA
          );
        }
      } else {
        throw new Error("Recaptcha not found!");
      }
    } else {
      throw new Error("Unsupported method");
    }
  } catch (error) {
    if (error instanceof CustomError) {
      appInsight.defaultClient?.trackException({
        exception: new Error(error.message),
        properties: {
          Method: `Create lead API - ${error.method}`,
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
