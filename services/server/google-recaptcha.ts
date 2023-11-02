import axios from "axios";

export const validateRecaptcha = async (recaptcha: string) => {
  const recaptchaKey = process.env.GOOGLE_RECAPTCHA_KEY;
  const siteUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaKey}&response=${recaptcha}`;

  const response = await axios.post(siteUrl);
  return response;
};
