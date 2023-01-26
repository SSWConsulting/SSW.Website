import React from "react";
import type { Template } from "tinacms";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const ColumnLayout = ({ data }) => {
  console.log(data);

  return (
    <div className="grid grid-cols-2 gap-1">
      <Image
        src={data.imageSrc}
        alt={data.altText}
        height={data.height ?? 0}
        width={data.width ?? 0}
        layout="responsive"
      />
      <div>
        <TinaMarkdown content={data.message} />
      </div>
    </div>
  );
};

export const columnLayoutBlockSchema: Template = {
  name: "ColumnLayout",
  label: "Column Layout",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imageSrc",
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
      type: "rich-text",
      label: "Message",
      name: "message",
      required: true,
    },
  ],
};
