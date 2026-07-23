import type { ColorVariant } from "../../../button/rippleButtonV2";
import type { ColorPickerOptions } from "../colourSelector";

export const DEFAULT_BUTTON_COLOUR = 0; // "Red"

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

// Index → variant lookup derived from the picker (dependency flows CMS-config → button).
export const buttonColorVariants: ColorVariant[] = buttonOptions.map(
  (option) => option.variant
);
