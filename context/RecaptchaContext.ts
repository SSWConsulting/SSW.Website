import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
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
  const appInsights = useAppInsightsContext();

  let error;
  if (!value || !value.recaptchaKey) {
    const errorText = "useRecaptcha must be used within a RecaptchaProvider";

    appInsights?.trackException({ exception: new Error("bad") });

    error = errorText;
  }
  return { recaptchaKey: value?.recaptchaKey || "", error };
};
