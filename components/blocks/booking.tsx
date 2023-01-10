import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import layoutData from "../../content/global/index.json";
import BookingFormPopup from "../bookingFormPopup/bookingFormPopup";
import Button from "../button/button";

export const Booking = (props: {
  title?: string;
  subTitle?: string;
  buttonText?: string;
  videoBackground?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const showBookingForm = () => setIsVisible(!isVisible);

  const sydneyOfficeLayoutData = layoutData.offices.find(
    (o) => o.addressLocality === "Sydney"
  );

  return (
    <>
      <article className="mx-auto max-w-[1170px] px-[15px]">
        <h1
          dangerouslySetInnerHTML={{ __html: props.title }}
          className="my-4 pb-[20px] pt-[60px] text-[3.28rem]"
        ></h1>
        <h2 className="mt-[20px] mb-[10px] text-[2.2rem]">{props.subTitle}</h2>
        <Button onClick={showBookingForm} data-aos="fade-up">
          {props.buttonText}
        </Button>
        <BookingFormPopup
          isVisible={isVisible}
          showBookingForm={setIsVisible}
          isShareForm={false}
        />
        <h2 className="mt-[40px] mb-[10px] text-[2.2rem]">
          or call us on {sydneyOfficeLayoutData.phone}
        </h2>
        <div className="animate-more-bounce pt-20">
          <a
            href="#more"
            className="cursor-default text-5xl no-underline hover:!text-[#9e9e9e]"
          >
            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
          </a>
        </div>
      </article>

      <video
        className="absolute -z-[100] min-w-full object-cover transition-opacity duration-1000 max-[1402px]:hidden"
        playsInline
        autoPlay
        muted
        loop
      >
        <source src={props.videoBackground} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </>
  );
};
