import Image from "next/image";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";

export const CustomImage = ({ data }) => {
  return (
    <LinkWrapper link={data.link}>
      <Image
        src={data.src}
        alt={data.altText}
        height={data.height ?? 400}
        width={data.width ?? 400}
        className="inline-block"
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
  ],
};
