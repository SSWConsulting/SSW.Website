import { Icon } from "@/components/blocksSubtemplates/tinaFormElements/icon";
import classNames from "classnames";
import { useState } from "react";
import Jotform from "react-jotform";
import { tinaField } from "tinacms/dist/react";
import Popup from "../popup/popup";
import RippleButton, { ButtonTinaFields, ColorVariant } from "./rippleButtonV2";

import globals from "../../content/global/index.json";

enum ButtonColors {
  Red = 0,
  Transparent = 1,
}

export interface TemplateButtonOptions extends ButtonTinaFields {
  buttonText?: string;
  colour?: ButtonColors;
  iconFirst?: boolean;
  icon?: string;
  showLeadCaptureForm?: boolean;
  leadCaptureFormOption?: string;
  onClick?: () => void;
}

export const Button = ({
  className,
  data,
}: {
  className: string;
  data: TemplateButtonOptions;
}) => {
  const [open, setOpen] = useState(false);
  const variants: ColorVariant[] = ["primary", "secondary"];
  const { iconFirst, buttonText, colour, leadCaptureFormOption } = data;
  const selectedForm = globals.forms[leadCaptureFormOption];
  let jotFormLink = "https://www.jotform.com/";

  if (selectedForm) {
    jotFormLink += selectedForm.id;
  }

  return (
    <>
      <RippleButton
        onClick={() => {
          if (data.showLeadCaptureForm) setOpen(true);
        }}
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
      {data.showLeadCaptureForm && (
        <Popup
          isVisible={open}
          showCloseIcon={true}
          onClose={() => setOpen(false)}
        >
          <Jotform src={jotFormLink}></Jotform>
        </Popup>
      )}
    </>
  );
};
