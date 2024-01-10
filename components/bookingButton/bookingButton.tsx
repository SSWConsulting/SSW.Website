import type { Template } from "tinacms";
import {
  default as defaultSetting,
  default as layoutData,
} from "../../content/global/index.json";
import {
  JotFormEmbed,
  JotFormEmbedProps,
  formType,
} from "../blocks/jotFormEmbed";

export interface BookingButtonProps {
  buttonText?: string;
  containerClass?: string;
  buttonClass?: string;
  hideCallUs?: boolean;
  animated?: boolean;
}

export const BookingButton = ({ data }) => {
  const {
    containerClass,
    buttonClass,
    buttonText,
    hideCallUs,
    animated = true,
  }: BookingButtonProps = data;

  const bookingPhone = layoutData.bookingPhone;

  const jotFormBookingForm: JotFormEmbedProps = {
    data: {
      jotForm: {
        id: defaultSetting.jotForm.id,
        formTitle: defaultSetting.jotForm.id,
        backgroundColor: defaultSetting.jotForm.backgroundColor,
        fontColor: defaultSetting.jotForm.fontColor,
        formType: defaultSetting.jotForm.formType as formType,
        height: defaultSetting.jotForm.height,
        width: defaultSetting.jotForm.width,
      },
      containerClass: containerClass,
      buttonClass: buttonClass,
      buttonText: buttonText,
      animated: animated,
    },
  };
  //Create lead - JotForm Doc - https://sswcom.sharepoint.com/sites/SSWDevelopers/_layouts/15/doc.aspx?sourcedoc={45a11067-ef82-4dce-9b43-20812631a184}&action=edit
  return (
    <>
      <JotFormEmbed {...jotFormBookingForm}>
        {!hideCallUs && (
          <h2 className="mx-auto max-w-full text-center">
            or call us on {bookingPhone}
          </h2>
        )}
      </JotFormEmbed>
    </>
  );
};

export const bookingButtonSchema: Template = {
  name: "BookingButton",
  label: "Booking Button",
  ui: {
    previewSrc: "/blocks/hero.png",
    itemProps: (item) => ({ label: item?.btnText }),
  },
  fields: [
    {
      type: "string",
      label: "Button Text",
      name: "buttonText",
      required: false,
    },
    {
      type: "boolean",
      label: "Animated",
      name: "animated",
    },
  ],
};
