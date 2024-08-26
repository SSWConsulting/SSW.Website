import type { Template, TinaField } from "tinacms";
import {
  default as defaultSetting,
  default as layoutData,
} from "../../content/global/index.json";
import { JotFormEmbed, JotFormEmbedProps } from "../blocks/jotFormEmbed";

export interface BookingButtonProps {
  buttonText?: string;
  containerClass?: string;
  buttonClass?: string;
  hideCallUs?: boolean;
  buttonSubtitle?: string;
  dataTinaField?: TinaField;
  animated?: boolean;
}

export const BookingButton = (data) => {
  const {
    containerClass,
    buttonClass,
    buttonText,
    buttonSubtitle = `or call ${layoutData.bookingPhone}`,
    hideCallUs,
    dataTinaField,
    animated = true,
  }: BookingButtonProps = data;


  const jotFormBookingForm: JotFormEmbedProps = {
    jotFormId: defaultSetting.bookingJotFormId,
    containerClass: containerClass,
    buttonClass: buttonClass,
    buttonText: buttonText,
    animated: animated,
  };
  //Create lead - JotForm Doc - https://sswcom.sharepoint.com/sites/SSWDevelopers/_layouts/15/doc.aspx?sourcedoc={45a11067-ef82-4dce-9b43-20812631a184}&action=edit
  return (
    <>
      <JotFormEmbed {...jotFormBookingForm}>
        {(!hideCallUs && buttonSubtitle) && (
          <h2 data-tina-field={dataTinaField} className="mx-auto max-w-full text-center">
            {buttonSubtitle}
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
    defaultItem: () => {return {buttonText: "Book Now"}},
    previewSrc: "/images/thumbs/tina/booking-button.jpg",
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
    {
      type: "string",
      label: "Button Subtitle",
      name: "buttonSubtitle",
    },
  ],
};
