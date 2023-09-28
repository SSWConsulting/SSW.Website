import * as appInsight from "applicationinsights";
import axios, { AxiosError } from "axios";
import { HttpStatusCode, STAGE } from "../model";
import { CustomError } from "./customError";
import {
  AddContactToNewslettersData,
  BookingFormSubmissionData,
} from "./events";

export const invokePowerAutomateFlow = async (
  data: BookingFormSubmissionData | AddContactToNewslettersData,
  flowURL: string
) => {
  try {
    const response = await axios.post(flowURL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new CustomError(
        JSON.stringify(
          axiosError.response ? axiosError.response.data : axiosError.cause
        ),
        axiosError.response
          ? axiosError.response.status
          : HttpStatusCode.NotFound,
        JSON.stringify(data),
        axiosError.response &&
        axiosError.response.status === HttpStatusCode.Conflict
          ? appInsight.Contracts.SeverityLevel.Information
          : appInsight.Contracts.SeverityLevel.Critical,
        STAGE.PA_FLOW_AXIOS
      );
    } else {
      throw new Error(error);
    }
  }
};
