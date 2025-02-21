import type { Template } from "tinacms";
import globals from "../../content/global/index.json";
import { JotFormEmbed, JotFormEmbedProps } from "../blocks/jotFormEmbed";
const DEFAULT_SUBTITLE = `or call ${globals.bookingPhone}`;
export interface BookingButtonProps {
  data?: {
    buttonText?: string;
    containerClass?: string;
    buttonClass?: string;
    hideCallUs?: boolean;
    buttonSubtitle?: string;
    tinaField?: string;
    animated?: boolean;
  };
}

export const BookingButton: React.FC<BookingButtonProps | undefined> = ({
  data = undefined,
}) => {
  const buttonText = data?.buttonText ?? globals.bookingButtonText;
  const buttonSubtitle = data?.buttonSubtitle ?? DEFAULT_SUBTITLE;
  const hideCallUs = data?.hideCallUs ?? false;
  const dataTinaField = data?.tinaField || undefined;
  const animated = data?.animated ?? true;
  const jotFormBookingForm: JotFormEmbedProps = {
    jotFormId: globals.forms.bookingJotFormId,
    containerClass: data?.containerClass || "",
    buttonClass: data?.buttonClass || "",
    buttonText: buttonText,
    animated: animated,
  };
  //Create lead - JotForm Doc - https://sswcom.sharepoint.com/sites/SSWDevelopers/_layouts/15/doc.aspx?sourcedoc={45a11067-ef82-4dce-9b43-20812631a184}&action=edit
  return (
    <>
      <JotFormEmbed {...jotFormBookingForm}>
        {!hideCallUs && buttonSubtitle && (
          <h2
            data-tina-field={dataTinaField}
            className="mx-auto max-w-full text-center"
          >
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
    previewSrc: "/images/thumbs/tina/booking-button.jpg",
    defaultItem: {
      buttonText: globals.bookingButtonText,
      buttonSubtitle: DEFAULT_SUBTITLE,
      animated: true,
    },
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
