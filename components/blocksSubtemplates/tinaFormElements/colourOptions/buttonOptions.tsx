import type { ColorVariant } from "../../../button/rippleButtonV2";
import type { ColorPickerOptions } from "../colourSelector";

/** Default picker index for embedded card buttons (the "Red" style). */
export const DEFAULT_BUTTON_COLOUR = 0;

type ButtonColorOption = ColorPickerOptions & {
  /** RippleButton variant this picker index maps to (source of truth). */
  variant: ColorVariant;
};

export const buttonOptions: ButtonColorOption[] = [
  {
    name: "Red",
    classes: "bg-ssw-red text-white",
    //Note: this is necessary as Tina doesn't recognise tailwind config settings
    editorClasses: "bg-[#cc4141] text-white",
    reference: 0,
    variant: "primary",
  },
  {
    name: "Transparent",
    classes: "bg-transparent text-gray-950",
    reference: 1,
    variant: "secondary",
  },
];

// Index → variant lookup derived from the picker, so the dependency flows
// CMS-config → button, not the other way.
export const buttonColorVariants: ColorVariant[] = buttonOptions.map(
  (option) => option.variant
);
