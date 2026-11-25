import { cn } from "@/lib/utils";
import { contentLinkComponents } from "@/components/contentLink";

// TinaMarkdown components for multi-paragraph body text: a gap between
// paragraphs, none after the last one.
export const spacedParagraphs = (className: string) => ({
  ...contentLinkComponents,
  p: (props) => <p {...props} className={cn("mb-4 last:mb-0", className)} />,
});
