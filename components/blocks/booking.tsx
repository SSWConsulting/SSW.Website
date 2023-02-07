import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

export const Booking: FC<{
  title?: string;
  subTitle?: string;
  videoBackground?: string;
  children: React.ReactNode;
}> = ({ title, subTitle, videoBackground, children }) => {


  return (
    <>
      <article className="main-container">
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <h2>{subTitle}</h2>
        {children}
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
