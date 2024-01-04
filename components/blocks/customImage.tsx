import classNames from "classnames";
import Image from "next/image";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";

export type CustomImageProps = {
  src: string;
  altText: string;
  height?: number;
  width?: number;
  link?: string;
  customClass?: string;
};

// To Update the screenshots of PowerBi reports on Consulting Options (i.e /consulting/consulting), here is the link - https://github.com/SSWConsulting/SSW.Website/wiki/Consulting-options-%E2%80%90-Updating-screenshots
export const CustomImage = ({ data }: { data: CustomImageProps }) => {
  return (
    <LinkWrapper link={data.link}>
      <Image
        src={data.src}
        alt={data.altText}
        height={data.height || 400}
        width={data.width || 400}
        className={classNames("inline-block", data.customClass ?? "")}
      />
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
  ],
};
