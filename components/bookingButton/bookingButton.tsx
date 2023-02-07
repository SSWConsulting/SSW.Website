import { VFC, useState } from "react";
import { BookingForm } from "../bookingForm/bookingForm";
import Button from "../button/button";
import Popup from "../popup/popup";
import layoutData from "../../content/global/index.json";

const BookingButton: VFC<{
  buttonText?: string;
  recaptchaKey?: string;
}> = ({ buttonText, recaptchaKey }) => {
  const sydneyOfficeLayoutData = layoutData.offices.find(
    (o) => o.addressLocality === "Sydney"
  );

  const [isVisible, setIsVisible] = useState(false);
  const showBookingForm = () => setIsVisible(!isVisible);

  const bookingForm = <BookingForm recaptchaKey={recaptchaKey} />;

  return (
    <>
      <Button
        ripple
        className="mx-auto mt-14 w-96"
        onClick={showBookingForm}
        data-aos="fade-up"
      >
        {buttonText}
      </Button>
      <h2 className="mx-auto w-max">or call us on {sydneyOfficeLayoutData.phone}</h2>
      <Popup
        isVisible={isVisible}
        showBookingForm={setIsVisible}
        children={bookingForm}
      />
    </>
  );
};

export default BookingButton;
