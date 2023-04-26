import Button from "../button/button";

import { Template } from "tinacms";

import classNames from "classnames";

export const CustomBookingButton = ({ data }) => {
  const { btnText } = data;
  const bookingButtonText = data.bookingText ?? "Book a FREE Initial Meeting";

  const onBtnClicked = () => {
    const bookingButton = document.querySelector("button");
    if (bookingButton.innerText === bookingButtonText) {
      bookingButton.click();
    } else {
      alert("Couldn't find the booking button on the page!");
    }
  };
  return (
    <div className={classNames("flex w-full flex-col items-center", "mt-1")}>
      <Button
        ripple
        className={classNames("mx-auto mt-14 w-96 max-w-full p-3")}
        onClick={onBtnClicked}
        data-aos="fade-up"
      >
        {btnText}
      </Button>
    </div>
  );
};

export const CustomBookingButtonSchema: Template = {
  name: "CustomBookingButton",
  label: "Custom Booking Button",
  ui: {
    previewSrc: "/blocks/hero.png",
    itemProps: (item) => ({ label: item?.btnText }),
  },
  fields: [
    {
      type: "string",
      label: "Button Text",
      name: "btnText",
    },
  ],
};
