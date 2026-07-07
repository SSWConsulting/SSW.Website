import { Search } from "lucide-react";
import type { ComponentProps } from "react";
import { Input as BaseInput } from "@/components/ui/input";

import { cn } from "@/lib/utils";

// Wrapper around the shadcn Input primitive (issues #20, field-consistency pass):
// - 48px tall (`h-12`) — the shared field chrome, matching the adaptive
//   SSWAdaptiveField so mixed forms line up (and meeting the 44px touch-target
//   guideline)
// - white/lighter fill so the field contrasts with its background (`bg-background`)
// - 4px corner radius (`rounded-sm`) to match Figma
// - `px-3` to match the adaptive field's horizontal padding
// - file input: 8px gap after the "Choose file" button (`file:mr-2`) and the
//   "No file chosen" text styled like a placeholder (`[type=file]:text-muted-foreground`)
// - grey focus highlight (`stroke-strong` border + soft `stroke-weak` ring) —
//   the upstream red-tinted ring reads as an error state
// - invalid state shows only the error border while resting (`aria-invalid:ring-0`
//   suppresses the upstream always-on error ring); while focused it keeps the
//   destructive border and shows a soft destructive focus ring — one signal,
//   "this field is in error", matching the selects' invalid treatment. The
//   compound `aria-invalid:focus-visible:*` classes win over
//   `aria-invalid:ring-0` on specificity.
function SSWInput({ className, ...props }: ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      className={cn(
        "[type=file]:text-muted-foreground h-12 rounded-sm bg-background px-3 file:mr-2",
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

/**
 * Search input: the SSW Input with a leading search icon. Replaces the
 * removed InputGroup search pattern. `className` styles the outer wrapper;
 * pass `inputClassName` to style the input itself.
 */
function SSWSearchInput({
  className,
  inputClassName,
  type = "search",
  ...props
}: ComponentProps<typeof SSWInput> & { inputClassName?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <SSWInput type={type} className={cn("pl-9", inputClassName)} {...props} />
    </div>
  );
}

export { SSWInput, SSWSearchInput };
