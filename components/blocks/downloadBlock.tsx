import classNames from "classnames";
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";

export type DownloadBlockProps = {
  title?: string;
  downloads?: Downloads[];
};

export type Downloads = {
  header: string;
  img: string;
  imgBackground: keyof typeof bgOptions;
  pngLink: string;
  pdfLink: string;
};

const bgOptions = {
  black: "bg-sswBlack",
  grey: "bg-gray-100",
  white: "bg-white",
};

export const DownloadBlock = ({ title, downloads }: DownloadBlockProps) => {
  return (
    <Container className="prose prose-img:my-0">
      <h2>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {downloads?.map((download, index) => (
          <Download key={index} {...download} />
        ))}
      </div>
    </Container>
  );
};

const Download = ({
  header,
  img,
  imgBackground,
  pngLink,
  pdfLink,
}: Downloads) => {
  return (
    <div className="col-span-1">
      <div className={classNames("text-black", "py-3 px-6")}>
        <h3>{header}</h3>
        <div className={classNames(`${bgOptions[imgBackground]}`)}>
          <Image src={img} alt={header} height={400} width={400} />
        </div>

        <div className={"bg-gray-300 p-2 font-bold"}>Download</div>
        <div
          className={classNames(
            "grid grid-cols-2 gap-x-0.25 border-t-2 border-white text-black"
          )}
        >
          <DownloadButton link={pngLink} text="PNG" />
          <DownloadButton link={pdfLink} text="PDF" />
        </div>
      </div>
    </div>
  );
};

const DownloadButton = ({ link, text }) => {
  return (
    <div className={classNames("col-span-1 bg-gray-100 p-4 w-full")}>
      <CustomLink
        href={link}
        className="done inline-flex w-full cursor-pointer px-4"
        target="_self"
      >
        <FaFileDownload className="m-icon" />

        {text}
      </CustomLink>
    </div>
  );
};

export const downloadBlockSchema: Template = {
  name: "DownloadBlock",
  label: "Download Block",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      label: "Downloads",
      name: "downloads",
      ui: {
        itemProps(item) {
          return {
            label: `${item?.header}`,
          };
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header",
        },
        {
          type: "image",
          label: "Image",
          name: "img",
          // @ts-ignore
          uploadDir: () => "company-logos",
        },
        {
          type: "string",
          label: "Image Background",
          name: "imgBackground",
          options: Object.keys(bgOptions),
        },
        {
          type: "string",
          label: "PNG Link",
          name: "pngLink",
        },
        {
          type: "string",
          label: "PDF LInk",
          name: "pdfLink",
        },
      ],
    },
  ],
};
