export enum HttpStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  InternalServerError = 500,
  BadGateway = 502,
}

export interface PA_FLOW_Data {
  flowURL: string;
}

export enum STAGE {
  PA_FLOW_AXIOS = "Power Automate flow - Axio",
  PA_FLOW = "Power Automate flow",
  GOOGLE_RECAPTCHA = "Google - Recaptcha",
}

export enum PowerAutomate_Endpoint {
  CREATE_LEAD = "Create Lead API",
  NEWSLETTERS = "Newsletter API",
}
