import { cn } from "@/lib/utils";

// TinaMarkdown components for multi-paragraph body text: a gap between
// paragraphs, none after the last one.
export const spacedParagraphs = (className: string) => ({
  p: (props) => <p {...props} className={cn("mb-4 last:mb-0", className)} />,
});
