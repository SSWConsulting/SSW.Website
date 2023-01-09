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
    <article className="max-w-[1170px] mx-auto px-[15px]">
      <h1 dangerouslySetInnerHTML={{ __html: props.title }} className="text-[3.28rem] pb-[20px] pt-[60px] my-4"></h1>
      <h2 className="text-[2.2rem] mt-[20px] mb-[10px]">{props.subTitle}</h2>
      <Button onClick={showBookingForm} data-aos="fade-up">
        {props.buttonText}
      </Button>
      <BookingFormPopup
        isVisible={isVisible}
        showBookingForm={setIsVisible}
        isShareForm={false}
      />
      <h2 className="mt-8">or call us on {sydneyOfficeLayoutData.phone}</h2>
    </article>
  );
};
