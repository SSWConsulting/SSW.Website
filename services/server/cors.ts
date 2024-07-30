export const setAllowOriginIfTrusted = (responseHeaders, origin) => {
  if (trustedOrigins.includes(origin)) {
    responseHeaders.headers["Access-Control-Allow-Origin"] = origin;
  }
};

const trustedOrigins = [
  "https://www.tfs365.com",
  "https://sapeopleprod7bktxxg33i3v.z8.web.core.windows.net",
  "https://sapeoplestagjthgmptzb46i.z8.web.core.windows.net",
];
