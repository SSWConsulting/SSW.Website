export class CustomError extends Error {
  statusCode: number;
  requestBody: any;
  severity: number;
  method: string;

  constructor(
    message: any,
    statusCode: number,
    requestBody?: any,
    severity?: number,
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
