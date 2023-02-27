import { FC } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Container } from "../util/container";

export const Booking: FC<{
  title?: string;
  subTitle?: string;
  videoBackground?: string;
  children: React.ReactNode;
}> = ({ title, subTitle, videoBackground, children }) => {
  return (
    <>
      <Container padding="px-4" className="w-full">
        <h1 className="md:px-32 lg:px-48" dangerouslySetInnerHTML={{ __html: title }}></h1>
        <h2>{subTitle}</h2>
        {children}
        <div className="flex animate-more-bounce flex-col items-center pt-20">
          <a
            href="#more"
            className="cursor-default text-5xl no-underline hover:!text-gray-450"
          >
            <FaAngleDown />
          </a>
        </div>
      </Container>

      <video
        className="absolute -z-100 h-full min-w-full object-cover transition-opacity duration-1000"
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
