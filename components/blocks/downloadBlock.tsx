import classNames from "classnames";
import Image from "next/image";
import { FaFileDownload } from "react-icons/fa";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";

export type DownloadBlockProps = {
  title?: string;
  downloads: Downloads[] | [];
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
        {img && (
          <div
            className={classNames(
              `${bgOptions[imgBackground] || "bg-white"}`,
              "flex justify-center"
            )}
          >
            <Image src={img} alt={header} height={400} width={210} />
          </div>
        )}
        <div className={"bg-gray-300 p-2 font-bold"}>Download</div>
        <div
          className={classNames(
            "grid grid-cols-2 gap-x-0.25 border-t-2 border-white text-black"
          )}
        >
          {pngLink && <DownloadButton link={pngLink} text="PNG" />}
          {pdfLink && <DownloadButton link={pdfLink} text="PDF" />}
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
        target="_blank"
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
            label: `${item?.header ?? "Download"}`,
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
          // @ts-expect-error - tina-cms types are incorrect
          uploadDir: () => "company-logos",
        },
        {
          type: "string",
          label: "Image Background",
          name: "imgBackground",
          options: Object.keys(bgOptions),
        },
        {
          type: "image",
          label: "PNG Link",
          name: "pngLink",
          // @ts-expect-error - tina-cms types are incorrect
          uploadDir: () => "company-logos/downloads/",
        },
        {
          type: "image",
          label: "PDF Link",
          name: "pdfLink",
          // @ts-expect-error - tina-cms types are incorrect
          uploadDir: () => "company-logos/downloads/",
        },
      ],
    },
  ],
};
