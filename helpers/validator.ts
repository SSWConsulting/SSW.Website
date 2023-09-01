import { sanitize } from "isomorphic-dompurify";

export const isEmail = (email: string): boolean => {
  // Found at https://emailregex.com/
  /* eslint-disable */
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  return regex.test(email);
};

export const sanitiseXSS = (input: string) => {
  if (!input) return input;
  return sanitize(input);
};
