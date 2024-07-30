export const setAllowOriginIfTrusted = (responseHeaders, origin) => {
  if (trustedOrigins.includes(origin)) {
    responseHeaders.headers["Access-Control-Allow-Origin"] = origin;
  }
};

const trustedOrigins = process.env.ALLOWED_ORIGINS?.split(", ") ?? [];
