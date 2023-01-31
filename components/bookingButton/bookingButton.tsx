import { VFC, useState } from "react";
import { BookingForm } from "../bookingForm/bookingForm";
import Button from "../button/button";
import Popup from "../popup/popup";

const BookingButton: VFC<{
  buttonText?: string;
  recaptchaKey?: string;
}> = ({ buttonText, recaptchaKey }) => {
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
      <Popup
        isVisible={isVisible}
        showBookingForm={setIsVisible}
        children={bookingForm}
      />
    </>
  );
};

export default BookingButton;
