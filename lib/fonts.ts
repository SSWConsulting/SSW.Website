import { Inter } from "next/font/google";

// Single site-wide Inter instance — import this everywhere instead of calling
// Inter() per file, so the site ships one set of font files with one fallback
// adjustment. Inter is a variable font: omitting `weight` loads a single file
// covering all weights, smaller than multiple static-weight files.
export const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});
