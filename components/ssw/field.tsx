import {
  type ChangeEvent,
  type ComponentProps,
  type FocusEvent,
  type ReactNode,
  type Ref,
  useCallback,
  useId,
  useState,
} from "react";
import { SSWInput } from "@/components/ssw/input";
import { SSWTextarea } from "@/components/ssw/textarea";
import {
  FieldLabel as BaseFieldLabel,
  Field,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

/*
 * SSWAdaptiveField — implements SSW's "adaptive placeholders" UX rule:
 *   https://www.ssw.com.au/rules/use-adaptive-placeholders-on-your-forms
 *
 * The label starts INSIDE the input (acting as the placeholder) and floats up
 * to the top edge when the field is focused OR has a value. This keeps the
 * label visible at all times while a value is being entered, which a static
 * placeholder cannot do.
 *
 * Architecture rule (CLAUDE.md): this composes the reserved ui/ primitives
 * (Field + FieldLabel + Input) and adds behaviour here — it does NOT edit them.
 *
 * Accessibility: the label is a real <label> (via the ui FieldLabel ->
 * ui/label -> <label>) associated to the input through htmlFor/id, so screen
 * readers announce it as the input's accessible name. The visual float is
 * purely presentational (transform/scale); the DOM label is unchanged. We do
 * NOT set a native `placeholder`, because the floating label already serves
 * that role and a duplicate placeholder would be read twice.
 *
 * Float trigger: tracked via React state — `focused` (onFocus/onBlur) OR
 * `hasValue` (derived from the input's value on change, plus the initial
 * defaultValue/value). When either is true the field gets data-float="true"
 * and the label animates to the top edge.
 *
 * Token-driven: colours come from --background, --muted-foreground, --primary,
 * --destructive via existing utility classes — no hardcoded brand colours.
 */

type SSWAdaptiveFieldProps = Omit<
  ComponentProps<typeof SSWInput>,
  "placeholder"
> & {
  /** Visible, floating label text. Rendered as a real <label>. */
  label: ReactNode;
  /** Optional helper text shown under the input. */
  description?: ReactNode;
  /** Error message; when set the field renders in its invalid state. */
  error?: ReactNode;
  /** Class applied to the outer Field wrapper. */
  className?: string;
  /** Class applied to the input element. */
  inputClassName?: string;
  /** Render a multi-line textarea instead of a single-line input. */
  multiline?: boolean;
  /** Rows for the multi-line variant (default 4). */
  rows?: number;
  /** Forwarded to the underlying input/textarea element. */
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
};

function SSWAdaptiveField({
  id,
  label,
  description,
  error,
  className,
  inputClassName,
  multiline = false,
  rows = 4,
  type,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  disabled,
  ref,
  ...props
}: SSWAdaptiveFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId =
    error != null && error !== false && error !== ""
      ? `${inputId}-error`
      : undefined;

  const isControlled = value !== undefined;
  const initialHasValue =
    (isControlled ? value : defaultValue) != null &&
    String(isControlled ? value : defaultValue).length > 0;

  const [focused, setFocused] = useState(false);
  const [uncontrolledHasValue, setUncontrolledHasValue] =
    useState(initialHasValue);

  const hasValue = isControlled
    ? value != null && String(value).length > 0
    : uncontrolledHasValue;

  const float = focused || hasValue;
  const invalid = error != null && error !== false && error !== "";

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!isControlled) {
        setUncontrolledHasValue(event.target.value.length > 0);
      }
      onChange?.(event as ChangeEvent<HTMLInputElement>);
    },
    [isControlled, onChange]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(event as FocusEvent<HTMLInputElement>);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(event as FocusEvent<HTMLInputElement>);
    },
    [onBlur]
  );

  return (
    <Field
      className={className}
      data-invalid={invalid ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
    >
      <div
        data-slot="adaptive-field"
        data-float={float ? "true" : "false"}
        className="relative w-full"
      >
        {multiline ? (
          // @ts-expect-error – `props` is typed for the input branch; the
          // textarea safely ignores any input-only attributes
          <SSWTextarea
            ref={ref as Ref<HTMLTextAreaElement>}
            id={inputId}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // SSWTextarea supplies the shared field chrome; the extra top
            // padding reserves an opaque strip for the floated label to sit on.
            className={cn("resize-y pb-2 pt-7", inputClassName)}
            {...props}
          />
        ) : (
          <SSWInput
            ref={ref as Ref<HTMLInputElement>}
            id={inputId}
            type={type}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            // SSWInput supplies the shared 48px field chrome; the padding split
            // reserves vertical room for the floated label inside the input.
            className={cn("pb-1 pt-4", inputClassName)}
            {...props}
          />
        )}
        {multiline && (
          // Opaque strip behind the floated label: masks textarea content that
          // scrolls up under the label so it never overlaps the text. While
          // disabled the textarea can't scroll, and the strip's solid
          // background would cut a white band out of the grey disabled fill —
          // so let the disabled chrome show through instead.
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-px top-px h-7 rounded-t-[3px]",
              disabled ? "bg-transparent" : "bg-background"
            )}
          />
        )}
        <BaseFieldLabel
          htmlFor={inputId}
          // A real <label> positioned over the control. It animates between the
          // resting (placeholder) position and the floated (top-edge) position.
          className={cn(
            "pointer-events-none absolute left-3 origin-left text-muted-foreground transition-all duration-150 ease-out",
            // Resting: looks like a placeholder. Single-line is vertically
            // centred; multi-line sits at the top, where the first line begins.
            multiline
              ? "top-3.5 text-base font-normal"
              : "top-1/2 -translate-y-1/2 text-base font-normal",
            // Floated: small, pinned just under the top edge. Muted until the
            // field is focused; foreground while focused. Destructive only for
            // errors — red otherwise reads as a validation problem.
            "data-[float=true]:top-1.5 data-[float=true]:-translate-y-0 data-[float=true]:text-xs data-[float=true]:font-medium",
            float && (focused ? "text-foreground" : "text-muted-foreground"),
            invalid && "text-destructive"
          )}
          data-float={float ? "true" : "false"}
        >
          {label}
        </BaseFieldLabel>
      </div>
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      {invalid && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  );
}

export type { SSWAdaptiveFieldProps };
export { SSWAdaptiveField };
