import classNames from "classnames";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Template } from "tinacms";
import layoutData from "../../content/global/index.json";
import { recaptchaToastId, useRecaptcha } from "../../context/RecaptchaContext";
import { UtilityButton } from "../button/utilityButton";
import Popup from "../popup/popup";
import SuccessToast from "../successToast/successToast";

const BookingForm = dynamic(
  () => import("../bookingForm/bookingForm").then((mod) => mod.BookingForm),
  { ssr: false }
);

export interface BookingButtonProps {
  buttonText?: string;
  containerClass?: string;
  buttonClass?: string;
}

export const SUCCESS_MESSAGE =
  "Form submitted. We'll be in contact as soon as possible.";

export const BookingButton = ({ data }) => {
  const { containerClass, buttonClass, buttonText }: BookingButtonProps = data;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const showBookingForm = () => setIsVisible((curr) => !curr);

  const { error: recaptchaError } = useRecaptcha();

  if (recaptchaError) {
    toast.error("Failed to load recaptcha key.", { toastId: recaptchaToastId });
  }

  const bookingPhone = layoutData.bookingPhone;

  const showSuccessToast = () => {
    toast.success(
      <div id="success-toaster" className="text-left">
        {SUCCESS_MESSAGE}
      </div>
    );
  };

  return (
    <div
      className={classNames(
        "flex w-full flex-col items-center",
        containerClass
      )}
    >
      <UtilityButton
        className={classNames(buttonClass, "mt-14")}
        onClick={showBookingForm}
        buttonText={buttonText}
      />
      <h2 className="mx-auto max-w-full text-center">
        or call us on {bookingPhone}
      </h2>
      <Popup isVisible={isVisible} onClose={setIsVisible}>
        {isVisible && (
          <BookingForm
            onClose={setIsVisible}
            showSuccessToast={showSuccessToast}
          />
        )}
      </Popup>
      <SuccessToast />
    </div>
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
