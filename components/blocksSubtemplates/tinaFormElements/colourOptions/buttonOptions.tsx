import type { ColorVariant } from "../../../button/rippleButtonV2";
import type { ColorPickerOptions } from "../colourSelector";

/** Default picker index for embedded card buttons (the "Red" style). */
export const DEFAULT_BUTTON_COLOUR = 0;

type ButtonColorOption = ColorPickerOptions & {
  /**
   * The RippleButton variant this picker index maps to. The picker entry is
   * the single source of truth for the index → variant contract;
   * buttonColorVariants in rippleButtonV2 is derived from this list.
   */
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

// Tina colour pickers store an index; each picker entry declares the variant
// it maps to, so this list is the single source of the index → variant
// contract. It lives here (with the data it is derived from) rather than in the
// presentational button so the dependency flows CMS-config → button, never back.
export const buttonColorVariants: ColorVariant[] = buttonOptions.map(
  (option) => option.variant
);
