import Link from "next/link";
import { FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { Components } from "tinacms/dist/rich-text";
import { getYouTubeId } from "../../helpers/embeds";
import { BookingForm } from "../bookingForm/bookingForm";
import Button from "../button/button";
import { YouTubeEmbed } from "../embeds/youtubeEmbed";
import { componentRenderer } from "./mdxComponentRenderer";
import { SolutionsRow } from "./solutionsRow";

export const DownloadWhitepaperLink = ({ whitepaperFile, children }) => (
  <Link href={whitepaperFile} passHref legacyBehavior>
    <a target="_blank">{children}</a>
  </Link>
);

export const ContactUs = ({ buttonText, link }) => (
  <div className="mb-16 flex justify-center">
    <a href={link}>
      <Button
        ripple
        className="!h-10 !bg-ssw-black bg-arrow-right bg-right bg-no-repeat pl-3 pr-8 text-sm"
      >
        {buttonText}
      </Button>
    </a>
  </div>
);

export const Whitepaper = ({
  title,
  description,
  buttonText,
  whitepaperFile,
}) => (
  <div className="mt-4 border-1 border-gray-300 bg-gray-125 px-6 py-4">
    <h4 className="mb-3 mt-6">{title}</h4>
    <p className="mb-4">{description}</p>
    <div className="flex justify-center">
      <DownloadWhitepaperLink whitepaperFile={whitepaperFile}>
        <Button ripple className="done mx-2 inline-flex !h-10 pl-3">
          <FaFileDownload className="m-icon" />
          {buttonText}
        </Button>
      </DownloadWhitepaperLink>
    </div>
  </div>
);

export const VideoEmbed = ({ url }) => (
  <div className="relative h-0 overflow-hidden pb-9/16">
    <div className="absolute h-full w-full">
      <YouTubeEmbed id={getYouTubeId(url) || ""} width="100%" height="100%" />
    </div>
  </div>
);

const showSuccessToast = () => {
  toast.success(
    <div className="text-left">
      {"Form submitted. We'll be in contact as soon as possible."}
    </div>
  );
};

export const industryRenderer: Components<{
  VideoEmbed: {
    url: string;
  };
  Whitepaper: {
    title: string;
    description: string;
    buttonText: string;
    whitepaperFile: string;
  };
  BookingForm: Record<string, never>;
  ContactUs: {
    buttonText: string;
    link: string;
  };
  SolutionsRow: {
    imgSrc1: string;
    header1: string;
    body1: string;
    imgSrc2: string;
    header2: string;
    body2: string;
    imgSrc3: string;
    header3: string;
    body3: string;
  };
}> = {
  ...componentRenderer,
  VideoEmbed: (props) => <VideoEmbed {...props} />,
  Whitepaper: (props) => <Whitepaper {...props} />,
  BookingForm: () => <BookingForm showSuccessToast={showSuccessToast} />,
  ContactUs: (props) => <ContactUs {...props} />,
  SolutionsRow: (props) => <SolutionsRow {...props} />,
};
