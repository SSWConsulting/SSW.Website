import xss, { type IFilterXSSOptions } from "xss";

// Found at https://emailregex.com/
/* eslint-disable */
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = (email: string): boolean => {
  /* eslint-enable */
  return EMAIL_REGEX.test(email);
};

export const spanWhitelist = {
  whiteList: { span: ["data-tina-field", "class"], br: [] },
};

export const sanitiseXSS = (input: string, options?: IFilterXSSOptions) => {
  if (!input) return input;
  return xss(input, options);
};
