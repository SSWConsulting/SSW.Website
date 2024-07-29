export const setAllowOriginIfTrusted = (responseHeaders, origin) => {
  responseHeaders.set("Access-Control-Allow-Origin", origin);
  if (trustedOrigins.includes(origin)) {
    responseHeaders["Access-Control-Allow-Origin"] = origin;
  }
};

const trustedOrigins = [
  "https://www.tfs365.com",
  "https://tfs365.com",
  "https://sapeopleprod7bktxxg33i3v.z8.web.core.windows.net",
  "https://sapeoplestagjthgmptzb46i.z8.web.core.windows.net",
];
