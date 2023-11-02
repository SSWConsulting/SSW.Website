import xss, { type IFilterXSSOptions } from "xss";

export const isEmail = (email: string): boolean => {
  // Found at https://emailregex.com/
  /* eslint-disable */
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  return regex.test(email);
};

export const spanWhitelist = {
  whiteList: { span: ["data-tina-field", "class"], br: [] },
};

export const sanitiseXSS = (input: string, options?: IFilterXSSOptions) => {
  if (!input) return input;
  return xss(input, options);
};
