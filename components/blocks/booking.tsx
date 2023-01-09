import { useState } from "react";
import BookingFormPopup from "../bookingFormPopup/bookingFormPopup";
import Button from "../button/button";
import layoutData from "../../content/global/index.json";

export const Booking = (props: {
  title?: string;
  subTitle?: string;
  buttonText?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const showBookingForm = () => setIsVisible(!isVisible);

  const sydneyOfficeLayoutData = layoutData.offices.find(
    (o) => o.addressLocality === "Sydney"
  );

  return (
    <div className="flex flex-col">
      <h1 dangerouslySetInnerHTML={{ __html: props.title }}></h1>
      <h2>{props.subTitle}</h2>
      <Button onClick={showBookingForm} data-aos="fade-up">
        {props.buttonText}
      </Button>
      <BookingFormPopup
        isVisible={isVisible}
        showBookingForm={setIsVisible}
        isShareForm={false}
      />
      <h2 className="mt-8">or call us on {sydneyOfficeLayoutData.phone}</h2>
    </div>
  );
};
