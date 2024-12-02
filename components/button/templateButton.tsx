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
  className,
  data,
}: {
  className: string;
  data: Consultingv2BlocksImageTextBlockButtons;
}) => {
  const variants: ColorVariant[] = ["primary", "secondary"];
  return (
    <RippleButton className={className} variant={variants[data.colour]}>
      {data.buttonText}
    </RippleButton>
  );
};
