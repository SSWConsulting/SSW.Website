import { createContext, useContext } from "react";

interface RecaptchaContextType {
  recaptchaKey: string;
}

export const RecaptchaContext = createContext<RecaptchaContextType>(null);

interface useRecaptchaType {
  recaptchaKey: string;
  error?: string;
}

export const useRecaptcha = (): useRecaptchaType => {
  const value = useContext(RecaptchaContext);
  let error;
  if (!value || !value.recaptchaKey) {
    const errorText = "useRecaptcha must be used within a RecaptchaProvider";

    if (process.env.NODE_ENV !== "production") throw new Error(errorText);
    error = errorText;
  }
  return { recaptchaKey: value?.recaptchaKey || "", error };
};
