import { FaFileDownload } from "react-icons/fa";
import { Components } from "tinacms/dist/rich-text";
import { getYouTubeId } from "../../helpers/embeds";
import Button from "../button/rippleButton";
import { CustomLink } from "../customLink";
import { YouTubeEmbed } from "../embeds/youtubeEmbed";
import { componentRenderer } from "./mdxComponentRenderer";
import { SolutionsRow } from "./solutionsRow";

export const DownloadWhitepaperLink = ({ whitepaperFile, children }) => (
  <CustomLink target={"_blank"} href={whitepaperFile}>
    {children}
  </CustomLink>
);

export const ContactUs = ({ buttonText, link }) => (
  <div className="mb-8 flex justify-center">
    <CustomLink href={link}>
      <Button
        ripple
        className="!h-10 !bg-ssw-black bg-arrow-right bg-right bg-no-repeat pl-3 pr-8 text-sm"
      >
        {buttonText}
      </Button>
    </CustomLink>
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
    <div className="absolute size-full">
      <YouTubeEmbed id={getYouTubeId(url) || ""} width="100%" height="100%" />
    </div>
  </div>
);

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
  ContactUs: (props) => <ContactUs {...props} />,
  SolutionsRow: (props) => <SolutionsRow {...props} />,
};
