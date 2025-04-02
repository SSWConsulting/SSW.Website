import dynamic from "next/dynamic";
import { FC } from "react";
import { FaAngleDown } from "react-icons/fa";
import { tinaField } from "tinacms/dist/react";
import { sanitiseXSS, spanWhitelist } from "../../helpers/validator";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";

const VideoBackground = dynamic(() => import("./videoBackground"));

export const Booking: FC<{
  title?: string;
  subTitle?: string;
  videoBackground?: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <div className="flex w-full items-center text-center font-light after:absolute after:size-full after:bg-black/75 after:bg-video-mask after:z-videoMask">
      <Container padding="px-4" className="w-full z-content">
        <h1
          data-tina-field={tinaField(props, "title")}
          dangerouslySetInnerHTML={{
            __html: sanitiseXSS(props.title, spanWhitelist) || "",
          }}
        ></h1>
        <h2 data-tina-field={tinaField(props, "subTitle")}>{props.subTitle}</h2>
        {props.children}
        <div className="flex animate-more-bounce flex-col items-center pt-20">
          <CustomLink
            aria-label="Scroll down to learn more"
            href="#more"
            className="cursor-default text-5xl no-underline hover:!text-gray-450"
          >
            <FaAngleDown />
          </CustomLink>
        </div>
      </Container>

      <VideoBackground
        videoBackground={props.videoBackground}
        tinaField={tinaField}
        props={props}
      />
    </div>
  );
};
