import { FC } from "react";
import { FaAngleDown } from "react-icons/fa";
import layoutData from "../../content/global/index.json";

export const Booking: FC<{
  title?: string;
  subTitle?: string;
  videoBackground?: string;
  children: React.ReactNode;
}> = ({ title, subTitle, videoBackground, children }) => {
  const sydneyOfficeLayoutData = layoutData.offices.find(
    (o) => o.addressLocality === "Sydney"
  );

  return (
    <>
      <article className="main-container">
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <h2>{subTitle}</h2>
        {children}
        <h2>or call us on {sydneyOfficeLayoutData.phone}</h2>
        <div className="animate-more-bounce pt-20">
          <a
            href="#more"
            className="cursor-default text-5xl no-underline hover:!text-gray-450"
          >
            <FaAngleDown />
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
