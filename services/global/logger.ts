import pino from "pino";

const NODE_ENV = process.env.NODE_ENV || "development";

// trace < debug < info < warn < error < fatal
// use logger.[info|debug|trace] for development, levels above for production
const logger = pino({
  // WORKS BOTH IN PR BUILD AND PRODUCTION BUILD
  level: NODE_ENV === "production" ? "warn" : "debug",
});

export default logger;
