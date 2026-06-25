import type { ComponentProps } from "react";
import { Textarea as BaseTextarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

// Wrapper around the shadcn Textarea primitive (field-consistency pass):
// - same chrome as SSWInput / SSWAdaptiveField — lighter fill
//   (`bg-background`), 4px radius (`rounded-sm`), `px-3`
// - `min-h-24` to match the adaptive field's multiline variant
// - grey focus highlight; invalid state shows only the error border while
//   resting, and a destructive border + soft destructive focus ring while
//   focused, mirroring SSWInput.
function SSWTextarea({
  className,
  ...props
}: ComponentProps<typeof BaseTextarea>) {
  return (
    <BaseTextarea
      className={cn(
        "min-h-24 rounded-sm bg-background px-3 py-3",
        "focus-visible:border-stroke-strong focus-visible:ring-stroke-weak",
        "aria-invalid:ring-0 aria-invalid:focus-visible:border-destructive dark:aria-invalid:ring-0",
        "aria-invalid:focus-visible:ring-destructive/20 aria-invalid:focus-visible:ring-3",
        "dark:aria-invalid:focus-visible:ring-destructive/40 dark:aria-invalid:focus-visible:ring-3",
        // The offending value itself is part of the error signal.
        "aria-invalid:text-destructive",
        className
      )}
      {...props}
    />
  );
}

export { SSWTextarea };
