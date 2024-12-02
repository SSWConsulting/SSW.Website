import RippleButton, { ColorVariant } from "./rippleButtonV2";

import { Icon } from "@/components/blocks/sharedTinaFields/icon";

enum ButtonColors {
  Red = 0,
  Transparent = 1,
}
export interface TemplateButtonOptions {
  buttonText: string;
  colour: ButtonColors;
  iconFirst: boolean;
  icon?: string;
}

export const Button = ({
  className,
  data,
}: {
  className: string;
  data: TemplateButtonOptions;
}) => {
  const variants: ColorVariant[] = ["primary", "secondary"];
  return (
    <RippleButton
      className={className}
      fontClassName="gap-0.5"
      variant={variants[data.colour]}
    >
      <Icon
        className="size-6"
        data={{
          name: data.icon,
        }}
      />

      {data.buttonText}
    </RippleButton>
  );
};
