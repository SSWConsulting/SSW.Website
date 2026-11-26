import { cn } from "@/lib/utils";

// Each hero line rises in after the one before it. A CSS animation rather
// than framer-motion, so the server-rendered headline shows (and counts for
// LCP) before the page hydrates.
export const rise = (step: number, className: string) => ({
  className: cn(className, "motion-safe:animate-rise-in"),
  style: { animationDelay: `${80 * step}ms` },
});
