import { Icon } from "@/components/blocksSubtemplates/tinaFormElements/icon";
import classNames from "classnames";
import React, { useState } from "react";
import Jotform from "react-jotform";
import { tinaField } from "tinacms/dist/react";
import { useSessionStorage } from "usehooks-ts";
import globals from "../../content/global/index.json";
import Popup from "../popup/popup";
import { LOCAL_STORAGE_KEYS } from "../util/constants";
import RippleButton, { ButtonTinaFields, ColorVariant } from "./rippleButtonV2";

enum ButtonColors {
  Red = 0,
  Transparent = 1,
}

type TemplateButtonOptions = {
  buttonText?: string;
  colour?: ButtonColors;
  iconFirst?: boolean;
  icon?: string;
  leadCaptureFormOption?: string;
  onClick?: () => void;
} & ButtonTinaFields;

type ButtonProps = { className: string; data: TemplateButtonOptions };
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, data }: ButtonProps, ref) => {
    const [open, setOpen] = useState(false);
    const variants: ColorVariant[] = ["primary", "secondary"];
    const { iconFirst, buttonText, colour, leadCaptureFormOption } = data;
    const selectedFormId =
      globals.forms[leadCaptureFormOption] || globals.forms[0];
    let jotFormLink = "https://www.jotform.com/";

    const [landingPage] = useSessionStorage<string | null>(
      LOCAL_STORAGE_KEYS.LANDING_PAGE,
      null
    );

    if (selectedFormId) {
      jotFormLink += selectedFormId;
    }

    return (
      <>
        <RippleButton
          onClick={() => {
            if (leadCaptureFormOption) setOpen(true);
          }}
          ref={ref}
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
        {leadCaptureFormOption && open && (
          <Popup
            isVisible={open}
            showCloseIcon={true}
            onClose={() => setOpen(false)}
          >
            <Jotform
              defaults={{
                landingPage,
              }}
              src={jotFormLink}
            ></Jotform>
          </Popup>
        )}
      </>
    );
  }
);
Button.displayName = "Button";
