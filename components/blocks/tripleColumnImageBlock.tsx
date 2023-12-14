import Image from "next/image";
import { Key } from "react";
import type { Template } from "tinacms";
import { isEmpty } from "../training/eventBooking";

export type TripleColumnImageBlockProps = {
  imageList: ImgCardProps[];
};

export type ImgCardProps = {
  title: string;
  subTitle?: string;
  altText: string;
  imageSrc: string;
  height?: number | undefined;
  width?: number | undefined;
};

export const TripleColumnImageBlock: React.FC<TripleColumnImageBlockProps> = ({
  imageList,
}) => {
  return (
    <div className="grid grid-cols-12 px-4 py-1">
      {imageList?.map((imageblock, index: Key) => {
        return <ImgCard {...imageblock} key={index} />;
      })}
    </div>
  );
};

const ImgCard = ({
  title,
  subTitle,
  imageSrc,
  altText,
  height,
  width,
}: ImgCardProps) => {
  return (
    <div className="col-span-12 p-4 md:col-span-4">
      <h3 className="font-normal">{title}</h3>
      <div className="h-4 text-xs font-normal text-ssw-gray">
        {subTitle ?? ""}
      </div>
      {imageSrc && (
        <div className="py-4">
          <Image
            src={imageSrc}
            alt={altText ?? ""}
            height={isEmpty(height) ? 150 : height} // IsEmpty - Tina converts height to empty string after removing the text from the field
            width={isEmpty(width) ? 150 : width} // IsEmpty - Tina converts width to empty string after removing the text from the field
          />
        </div>
      )}
    </div>
  );
};

export const tripleColumnImageBlockSchema: Template = {
  name: "TripleColumnImageBlock",
  label: "Triple Column Image Block",
  fields: [
    {
      type: "object",
      label: "Image List",
      name: "imageList",
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          required: true,
        },
        {
          type: "string",
          label: "Sub Title",
          name: "subTitle",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          required: true,
        },
        {
          type: "number",
          name: "height",
          label: "Height",
          description: "Default 150px",
        },
        {
          type: "number",
          name: "width",
          label: "Width",
          description: "Default 150px",
        },
        {
          type: "image",
          label: "Image",
          name: "imageSrc",
          required: true,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "company",
        },
      ],
    },
  ],
};
