import classNames from "classnames";
import Image from "next/image";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";

export type CustomImageProps = {
  src: string;
  altText: string;
  alignment?: string;
  height?: number;
  width?: number;
  link?: string;
  customClass?: string;
  caption?: string;
  captionColor?: string;
};

export const CustomImage = ({ data }: { data: CustomImageProps }) => {
  return (
    <LinkWrapper link={data.link}>
      <div
        className={classNames(
          "flex flex-col",
          data.alignment ?? "items-center"
        )}
      >
        <div className="relative">
          <Image
            src={data.src}
            alt={data.altText}
            height={data.height || 400}
            width={data.width || 400}
            className={classNames("inline-block", data.customClass ?? "")}
          />
          {data.caption && (
            <p
              className={classNames(
                "font-bold text-start",
                data.captionColor ?? ""
              )}
            >
              {data.caption}
            </p>
          )}
        </div>
      </div>
    </LinkWrapper>
  );
};

export const LinkWrapper = ({ link, children }) => {
  if (link) {
    return <CustomLink href={link}>{children}</CustomLink>;
  }
  return <>{children}</>;
};

export const customImageBlockSchema: Template = {
  name: "CustomImage",
  label: "Custom Image",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "src",
      required: true,
    },
    {
      type: "string",
      label: "Alt text",
      name: "altText",
      required: true,
    },
    {
      type: "string",
      label: "Alignment",
      name: "alignment",
      options: [
        {
          label: "Left",
          value: "items-start",
        },
        {
          label: "Center",
          value: "items-center",
        },
        {
          label: "Right",
          value: "items-end",
        },
      ],
    },
    {
      type: "number",
      label: "Height",
      name: "height",
      required: true,
    },
    {
      type: "number",
      label: "Width",
      name: "width",
      required: true,
    },
    {
      type: "string",
      label: "Link (optional)",
      name: "link",
      required: false,
    },
    {
      type: "string",
      label: "Custom Class (optional)",
      name: "customClass",
      required: false,
    },
    {
      type: "string",
      label: "Caption (optional)",
      name: "caption",
      required: false,
    },
    {
      type: "string",
      label: "Caption Color (optional)",
      name: "captionColor",
      required: false,
      options: [
        {
          label: "Black",
          value: "text-sswBlack",
        },
        {
          label: "White",
          value: "text-white",
        },
      ],
    },
  ],
};
