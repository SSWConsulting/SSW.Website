import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import type { Template } from "tinacms";
import layoutData from "../../content/global/index.json";
import { recaptchaToastId, useRecaptcha } from "../../context/RecaptchaContext";
import JotFormScript from "../../pages/jotFormScript";
import { UtilityButton } from "../button/utilityButton";

export interface BookingButtonProps {
  buttonText?: string;
  containerClass?: string;
  buttonClass?: string;
  hideCallUs?: boolean;
}

export const BookingButton = ({ data }) => {
  const {
    containerClass,
    buttonClass,
    buttonText,
    hideCallUs,
  }: BookingButtonProps = data;

  const { error: recaptchaError } = useRecaptcha();

  if (recaptchaError) {
    toast.error("Failed to load recaptcha key.", { toastId: recaptchaToastId });
  }

  const JOTFORM_ID = process.env.NEXT_PUBLIC_JOTFORM_ID;

  const bookingPhone = layoutData.bookingPhone;
  const jotFormClass = buttonClass ?? "mt-14" + " " + `lightbox-${JOTFORM_ID}`; // lightbox-id class is a trigger point for the JotForm Iframe

  return (
    <>
      <JotFormScript />
      <div
        className={twMerge("flex w-full flex-col items-center", containerClass)}
      >
        <UtilityButton className={jotFormClass} buttonText={buttonText} />
        {!hideCallUs && (
          <h2 className="mx-auto max-w-full text-center">
            or call us on {bookingPhone}
          </h2>
        )}
      </div>
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
  ],
};
