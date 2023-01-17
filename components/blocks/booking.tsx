import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VFC, useState } from "react";
import layoutData from "../../content/global/index.json";
import BookingFormPopup from "../bookingFormPopup/bookingFormPopup";
import Button from "../button/button";

export const Booking: VFC<{
  title?: string;
  subTitle?: string;
  buttonText?: string;
  videoBackground?: string;
}> = ({ title, subTitle, buttonText, videoBackground }) => {
  const [isVisible, setIsVisible] = useState(false);
  const showBookingForm = () => setIsVisible(!isVisible);

  const sydneyOfficeLayoutData = layoutData.offices.find(
    (o) => o.addressLocality === "Sydney"
  );

  return (
    <>
      <article className="main-container">
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <h2>{subTitle}</h2>
        <Button
          ripple
          className="mx-auto mt-14 w-96"
          onClick={showBookingForm}
          data-aos="fade-up"
        >
          {buttonText}
        </Button>
        <BookingFormPopup
          isVisible={isVisible}
          showBookingForm={setIsVisible}
        />
        <h2>or call us on {sydneyOfficeLayoutData.phone}</h2>
        <div className="animate-more-bounce pt-20">
          <a
            href="#more"
            className="cursor-default text-5xl no-underline hover:!text-gray-450"
          >
            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
          </a>
        </div>
      </article>

      <video
        className="-z-100 transition-opacity duration-1000"
        playsInline
        autoPlay
        muted
        loop
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </>
  );
};
