import { useState } from "react";
import { BookingForm } from "../bookingForm/bookingForm";
import Button from "../button/button";
import Popup from "../popup/popup";
import layoutData from "../../content/global/index.json";
import classNames from "classnames";
import { Template } from "tinacms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const showSuccessToast = () => {
    toast.success("Thank you, your form has been submitted successfully. We will be in contact as soon as possible.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      theme: "light",
    });
  }

  return (
    <div
      className={classNames(
        "flex w-full flex-col items-center",
        containerClass
      )}
    >
      <Button
        ripple
        className={classNames("mx-auto mt-14 w-96 max-w-full p-3", buttonClass)}
        onClick={showBookingForm}
        data-aos="fade-up"
      >
        {buttonText}
      </Button>
      <h2 className="mx-auto max-w-full text-center">
        or call us on {bookingPhone}
      </h2>
      <Popup isVisible={isVisible} onClose={setIsVisible}>
        <BookingForm onClose={setIsVisible} showSuccessToast={showSuccessToast} />
      </Popup>
      <ToastContainer />
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
