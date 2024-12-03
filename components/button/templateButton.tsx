import { Icon } from "@/components/blocks/sharedTinaFields/icons/icon";
import classNames from "classnames";
import { tinaField } from "tinacms/dist/react";
import RippleButton, { ButtonTinaFields, ColorVariant } from "./rippleButtonV2";

enum ButtonColors {
  Red = 0,
  Transparent = 1,
}

export interface TemplateButtonOptions extends ButtonTinaFields {
  buttonText?: string;
  colour?: ButtonColors;
  iconFirst?: boolean;
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
  const { iconFirst, buttonText, colour } = data;
  return (
    <RippleButton
      textTinaField={tinaField(data, "buttonText")}
      className={className}
      fontClassName={classNames(
        "gap-0.5",
        iconFirst ? "flex-row" : "flex-row-reverse"
      )}
      variant={variants[colour]}
    >
      <Icon
        tinaField={tinaField(data, "icon")}
        className="size-6"
        data={{
          name: data.icon,
        }}
      />

      {buttonText}
    </RippleButton>
  );
};
