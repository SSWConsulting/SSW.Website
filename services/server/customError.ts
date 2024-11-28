import { KnownSeverityLevel } from "applicationinsights";

export class CustomError extends Error {
  statusCode: number;
  requestBody: string;
  severity: KnownSeverityLevel;
  method: string;

  constructor(
    message: string,
    statusCode: number,
    requestBody?: string,
    severity?: KnownSeverityLevel,
    method?: string
  ) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
    this.requestBody = requestBody;
    this.severity = severity;
    this.method = method;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
