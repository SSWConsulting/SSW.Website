import Button from "../button/button";

import { Template } from "tinacms";

import classNames from "classnames";

export const RenderBookingButton = ({ data }) => {
  const { btnText } = data;
  const bookingButtonText = "Book a FREE Initial Meeting";

  const btnClicked = () => {
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
        onClick={btnClicked}
        data-aos="fade-up"
      >
        {btnText}
      </Button>
    </div>
  );
};

export const bookingButtonSchema: Template = {
  name: "bookingButton",
  label: "Button Text",
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
