import Image from "next/image";
import { Key } from "react";
import type { Template } from "tinacms";
import { CustomLink } from "../customLink";
import { isEmpty } from "../training/eventBooking";

export type TripleColumnImageBlockProps = {
  imageList: ImgCardProps[];
};

export type ImgCardProps = {
  title: string;
  subTitle?: string;
  link?: {
    url: string;
    label: string;
  };
  altText: string;
  imageSrc: string;
  height?: number;
  width?: number;
};

export const TripleColumnImageBlock: React.FC<TripleColumnImageBlockProps> = ({
  imageList,
}) => {
  return (
    <div className="grid grid-cols-12 gap-5 py-1">
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
  link,
}: ImgCardProps) => {
  return (
    <div className="relative col-span-12 flex flex-col justify-between rounded border-1 text-center md:col-span-3">
      {imageSrc && (
        <div className="flex justify-center py-4">
          <Image
            src={imageSrc}
            alt={altText ?? ""}
            height={isEmpty(height) ? 150 : height} // IsEmpty - Tina converts height to empty string after removing the text from the field
            width={isEmpty(width) ? 150 : width} // IsEmpty - Tina converts width to empty string after removing the text from the field
          />
        </div>
      )}
      <div className="not-prose bottom-0 w-full bg-gray-50 p-4 text-center">
        <h3 className="font-bold">{title}</h3>
        {subTitle && <span className="py-2 text-gray-400">{subTitle}</span>}
        {link?.url && (
          <CustomLink href={link.url} className="font-bold text-sswRed">
            <h3>{link.label}</h3>
          </CustomLink>
        )}
      </div>
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
          type: "object",
          label: "Link",
          name: "link",
          fields: [
            {
              type: "string",
              label: "URL",
              name: "url",
              required: true,
            },
            {
              type: "string",
              label: "Label",
              name: "label",
              required: true,
            },
          ],
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
