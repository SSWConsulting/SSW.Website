import { createContext, useContext } from "react";

interface RecaptchaContextType {
  recaptchaKey: string;
}

export const RecaptchaContext = createContext<RecaptchaContextType>(null);

interface useRecaptchaType {
  recaptchaKey: string;
  error?: string;
}

export const recaptchaToastId = "recaptcha-toast";

export const useRecaptcha = (): useRecaptchaType => {
  const value = useContext(RecaptchaContext);
  let error = undefined;
  if (!value || !value.recaptchaKey) {
    error = "Recaptcha key not provided.";
  }
  return { recaptchaKey: value?.recaptchaKey || "", error };
};
