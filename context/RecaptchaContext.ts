import { createContext } from "react";

export interface RecaptchaContextType {
  recaptchaKey?: string;
}

export const RecaptchaContext = createContext<RecaptchaContextType>(null);

