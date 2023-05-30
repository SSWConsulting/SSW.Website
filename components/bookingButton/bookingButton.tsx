import { useState } from "react";
import { BookingForm } from "../bookingForm/bookingForm";
import Button from "../button/button";
import Popup from "../popup/popup";
import layoutData from "../../content/global/index.json";
import classNames from "classnames";
import { Template } from "tinacms";
import { HeaderButton } from "../button/headerButton";

export interface BookingButtonProps {
  buttonText?: string;
  containerClass?: string;
  buttonClass?: string;
}

export const BookingButton = ({
  buttonText,
  containerClass,
  buttonClass,
}: BookingButtonProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const showBookingForm = () => setIsVisible((curr) => !curr);

  const bookingPhone = layoutData.bookingPhone;

  return (
    <div
      className={classNames(
        "flex w-full flex-col items-center",
        containerClass
      )}
    >
      <HeaderButton
        className={classNames(buttonClass, "w-96")}
        onClick={showBookingForm}
      >
        {buttonText}
      </HeaderButton>
      <h2 className="mx-auto max-w-full text-center">
        or call us on {bookingPhone}
      </h2>
      <Popup isVisible={isVisible} onClose={setIsVisible}>
        <BookingForm />
      </Popup>
    </div>
  );
};

export const BookingButtonSchema: Template = {
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
      type: "string",
      label: "Container CSS classes",
      name: "containerClass",
      required: false,
    },
    {
      type: "string",
      label: "Button CSS classes",
      name: "buttonClass",
      required: false,
    },
  ],
};
