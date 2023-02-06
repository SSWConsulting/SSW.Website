import { VFC, useState } from "react";
import { BookingForm } from "../bookingForm/bookingForm";
import Button from "../button/button";
import Popup from "../popup/popup";
import layoutData from "../../content/global/index.json";
import classNames from "classnames";

const BookingButton: VFC<{
  buttonText?: string;
  recaptchaKey?: string;
  containerClass?: string;
  buttonClass?: string;
}> = ({ buttonText, recaptchaKey, containerClass, buttonClass }) => {
  const [isVisible, setIsVisible] = useState(false);
  const showBookingForm = () => setIsVisible(!isVisible);

  const bookingForm = <BookingForm recaptchaKey={recaptchaKey} />;
  const sydneyOfficeLayoutData = layoutData.offices.find(
    (o) => o.addressLocality === "Sydney"
  );

  return (
    <div className={classNames("flex flex-col items-center", containerClass)}>
      <Button
        ripple
        className={classNames("mx-auto mt-14 w-96", buttonClass)}
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
      <h2>or call us on {sydneyOfficeLayoutData.phone}</h2>
    </div>
  );
};

export default BookingButton;
