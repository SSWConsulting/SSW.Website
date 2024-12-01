import { Consultingv2BlocksImageTextBlockButtons } from "@/tina/types";
import RippleButton, { ColorVariant } from "./rippleButtonV2";

enum ButtonColors {
  Red = 0,
  Transparent = 1,
}
export interface ColorPickerOptions {
  buttonLink: string;
  buttonText: string;
  reference: number;
  color: ButtonColors;
  iconFirst: boolean;
}

export const Button = ({
  data,
}: {
  data: Consultingv2BlocksImageTextBlockButtons;
}) => {
  const variants: ColorVariant[] = ["primary", "secondary"];
  return (
    <RippleButton variant={variants[data.colour]}>
      {data.buttonText}
    </RippleButton>
  );
};
