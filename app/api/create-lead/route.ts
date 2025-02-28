// import * as appInsight from "applicationinsights";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "../../../services/model";
import { CustomError } from "../../../services/server/customError";
import { validateRecaptcha } from "../../../services/server/google-recaptcha";
import { invokePowerAutomateFlow } from "../../../services/server/power-automate-flow";

const RECAPATCHA_VALIDATION_SUCCESS_RESULT = {
  data: {
    success: true,
  },
  status: 200,
};

export async function POST(request: NextRequest) {
  try {
    // this is the code to validate with the recaptcha service
    const requestBody = await request.json();
    const { Recaptcha } = requestBody;
    const Note = requestBody.Note;
    // Note: bypassing recaptcha is intended for weekly testing the lead capture form only
    const key_matched = Note.includes(process.env.RECAPTCHA_BYPASS_SECRET);

    if (key_matched) {
      requestBody.Note = Note.replace(process.env.RECAPTCHA_BYPASS_SECRET, "");
    }

    // Documentation - Create Lead - https://sswcom.sharepoint.com/:w:/r/sites/SSWDevelopers/_layouts/15/Doc.aspx?sourcedoc=%7BE8A18D9B-DE74-47EC-B836-01A5AD193DCC%7D&file=Create-lead-Flow.docx&action=default&mobileredirect=true
    if (Recaptcha || key_matched) {
      // Recaptcha value provided by google Recaptcha API
      const recaptchaValidation = key_matched
        ? RECAPATCHA_VALIDATION_SUCCESS_RESULT
        : await validateRecaptcha(Recaptcha);
      // const recaptchaValidation = { data: { success: true } }; // uncomment this to bypass recaptcha for testing purpose
      if (recaptchaValidation && recaptchaValidation.data.success) {
        const createLeadFlow = await invokePowerAutomateFlow(
          requestBody,
          process.env.CREATE_LEAD_ENDPOINT
        );
        if (createLeadFlow.status !== HttpStatusCode.Accepted) {
          // throw new CustomError(
          //   JSON.stringify(createLeadFlow.data),
          //   createLeadFlow.status,
          //   JSON.stringify(request.body),
          //   appInsight.KnownSeverityLevel.Critical,
          //   STAGE.PA_FLOW
          // );
        }
        return NextResponse.json(
          { success: true },
          { status: createLeadFlow.status }
        );
      } else {
        // throw new CustomError(
        //   JSON.stringify(recaptchaValidation.data),
        //   recaptchaValidation.status,
        //   JSON.stringify(requestBody),
        //   appInsight.KnownSeverityLevel.Error,
        //   STAGE.GOOGLE_RECAPTCHA
        // );
      }
    } else {
      return NextResponse.json(
        { message: "Recaptcha not found!", success: false },
        { status: HttpStatusCode.OK }
      );
    }
  } catch (error) {
    if (error instanceof CustomError) {
      // appInsight.defaultClient?.trackException({
      //   exception: new Error(error.message),
      //   properties: {
      //     Method: `${PowerAutomate_Endpoint.CREATE_LEAD} - ${error.method}`,
      //     RequestBody: error.requestBody,
      //     Status: error.statusCode,
      //   },
      //   severity: error.severity,
      // });
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode }
      );
    } else {
      return NextResponse.json(
        { message: error.message },
        { status: HttpStatusCode.MethodNotAllowed }
      );
    }
  }
}
