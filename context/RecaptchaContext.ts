import { createContext, useContext } from "react";

interface RecaptchaContextType {
  recaptchaKey: string;
}

export const RecaptchaContext = createContext<RecaptchaContextType>(null);

export const useRecaptcha = () => {
  const value = useContext(RecaptchaContext);
  if (!value || !value.recaptchaKey) {
    throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  }
  return value;
};
