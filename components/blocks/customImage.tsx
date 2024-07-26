import classNames from "classnames";
import Image from "next/image";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";
import { customClasses } from "../util/constants";

type textColor = "text-white" | "text-sswBlack";
type alignment = "items-start" | "items-center" | "items-end";

export type CustomImageProps = {
  src: string;
  altText: string;
  alignment?: alignment;
  height?: number;
  width?: number;
  link?: string;
  customClass?: string | keyof typeof customClasses;
  caption?: string;
  captionColor?: textColor;
  sizes?: string;
};

// To Update the screenshots of PowerBi reports on Consulting Options (i.e /consulting/consulting), here is the link - https://github.com/SSWConsulting/SSW.Website/wiki/Consulting-options-%E2%80%90-Updating-screenshots
export const CustomImage = ({ data }: { data: CustomImageProps }) => {
  return (
    <CustomLink href={data.link}>
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
            className={classNames(
              "inline-block",
              (customClasses[data.customClass] || data.customClass) ?? ""
            )}
            sizes={data.sizes}
          />
          {data.caption && (
            <p
              className={classNames(
                "mt-1 text-start font-bold",
                data.captionColor ?? ""
              )}
              style={{ maxWidth: `${data.width || 400}px` }}
            >
              {data.caption}
            </p>
          )}
        </div>
      </div>
    </CustomLink>
  );
};

export const customImageBlockSchema: Template = {
  name: "CustomImage",
  label: "Custom Image",

  ui: {
    previewSrc: "/images/thumbs/tina/custom-image.jpg",
  },
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
      options: Object.keys(customClasses),
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
    {
      type: "string",
      name: "sizes",
      label: "Sizes - Advanced (optional)",
      description:
        "See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes or https://nextjs.org/docs/pages/api-reference/components/image#sizes for more info",
      required: false,
    },
  ],
};
