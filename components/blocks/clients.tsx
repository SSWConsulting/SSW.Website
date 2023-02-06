import React from "react";
import type { Template } from "tinacms";
import Image from "next/legacy/image";

/* TODO: refactor with next/image */
export const CustomImage = ({ data }) => {
  return (
    <Image
      src={data.src}
      alt={data.altText}
      height={data.height}
      width={data.width}
    />
  );
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
  ],
};
