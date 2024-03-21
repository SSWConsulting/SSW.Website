import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { saveAs } from "file-saver";
import { FaFileDownload } from "react-icons/fa";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

import { Container } from "../util/container";
import Button from "../button/button";

export type DownloadBlockProps = {
  title?: string;
  downloads: Downloads[] | [];
  bottomBorder?: boolean;
};

export type Downloads = {
  header: string;
  img: string;
  imgBackground: keyof typeof bgOptions;
  firstLink: string;
  firstLinkText?: string;
  secondLink: string;
  secondLinkText?: string;
};

const bgOptions = {
  black: "bg-sswBlack",
  grey: "bg-gray-100",
  white: "bg-white",
  darkgrey: "bg-gray-650",
  darkgreen: "bg-[#3a4b49]",
};

export const DownloadBlock = (data: DownloadBlockProps) => {
  const { title, downloads, bottomBorder } = data;
  return (
    <Container className="prose !px-0 py-4 prose-img:my-0">
      <h2 data-tina-field={tinaField(data, "title")}>{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {downloads?.map((download, index) => (
          <Download key={index} {...download} />
        ))}
      </div>
      {bottomBorder && <hr />}
    </Container>
  );
};

const Download = (data: Downloads) => {
  const [isImgBroken, setIsImgBroken] = useState(false);
  const {
    header,
    img,
    imgBackground,
    firstLinkText,
    firstLink,
    secondLink,
    secondLinkText,
  } = data;
  return (
    <div className="col-span-1">
      <div className={classNames("py-3 text-black md:px-6")}>
        <h3 data-tina-field={tinaField(data, "header")}> {header}</h3>
        <div
          className={classNames(
            `${bgOptions[imgBackground] || "bg-white"}`,
            "flex h-32 justify-center"
          )}
          data-tina-field={tinaField(data, "img")}
        >
          {img && !isImgBroken && (
            <Image
              onError={() => setIsImgBroken(true)}
              src={img}
              alt={header}
              height={400}
              width={210}
              style={{ width: "auto", height: "100%" }}
            />
          )}
        </div>
        <div className={"bg-gray-300 p-2 font-bold"}>Download</div>
        <div
          className={classNames(
            "flex gap-x-0.25 border-t-2 border-white text-black"
          )}
        >
          {firstLink && (
            <DownloadButton
              link={firstLink}
              text={firstLinkText || "PNG"}
              field="firstLink"
              schema={data}
            />
          )}
          {secondLink && (
            <DownloadButton
              link={secondLink}
              text={secondLinkText || "PDF"}
              field="secondLink"
              schema={data}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const DownloadButton = (data) => {
  const { link, text, schema, field } = data;
  const match = link.match(/\/([^/]+)(?=\.\w+$)/);
  const filename = match ? match[1] : "download";
  return (
    <div className={classNames("col-span-1 w-full bg-gray-100 p-4")}>
      <Button
        className="done inline-flex w-full cursor-pointer px-4"
        onClick={() => {
          fetch(link)
            .then((res) => res.blob())
            .then((blob) => saveAs(blob, filename));
        }}
        data-tina-field={tinaField(schema, field)}
      >
        <FaFileDownload className="m-icon" />

        {text}
      </Button>
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
          type: "string",
          label: "First Link Text",
          name: "firstLinkText",
          description: "Defaults to PNG",
        },
        {
          type: "image",
          label: "First Link",
          name: "firstLink",
          // @ts-expect-error - tina-cms types are incorrect
          uploadDir: () => "company-logos/downloads/",
        },
        {
          type: "string",
          label: "Second Link Text",
          name: "secondLinkText",
          description: "Defaults to PDF",
          // @ts-expect-error - tina-cms types are incorrect
          uploadDir: () => "company-logos/downloads/",
        },
        {
          type: "image",
          label: "Second Link",
          name: "secondLink",
          // @ts-expect-error - tina-cms types are incorrect
          uploadDir: () => "company-logos/downloads/",
        },
      ],
    },
    {
      type: "boolean",
      label: "Bottom border",
      name: "bottomBorder",
    },
  ],
};
