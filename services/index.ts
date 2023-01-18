import axios from "axios";

export const createLead = async (data: BookingFormSubmissionData) => {
  return await axios.post("/ssw/api/crm/createlead", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export type BookingFormSubmissionData = {
  Name: string;
  Topic: string;
  Company: String;
  Country: string;
  State: string;
  Email: string;
  Phone: string;
  Recaptcha: string;
  SourceWebPageURL: string;
  EmailSubject: string;
  EmailBody: string;
  Note?: string | null;
};
