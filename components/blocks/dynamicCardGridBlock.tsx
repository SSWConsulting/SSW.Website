import classNames from "classnames";
import Image from "next/image";
import { Key } from "react";
import { Template } from "tinacms";
import { CustomLink } from "../customLink";
import { isEmpty } from "../training/eventBooking";

export type DynamicCardGridBlockProps = {
  gridLayout?: keyof typeof GridCols;
  imageList: ImgCard[];
};

export type ImgCard = {
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

const GridCols = {
  single: "col-span-12",
  double: "md:col-span-6",
  triple: "lg:col-span-6 xl:col-span-4",
  four: "md:col-span-6 lg:col-span-4 xl:col-span-3",
} as const;

export const DynamicCardGridBlock: React.FC<DynamicCardGridBlockProps> = ({
  imageList,
  gridLayout,
}) => {
  return (
    <div className="grid grid-cols-12 gap-5 py-1">
      {imageList?.map((imageblock, index: Key) => {
        return <Card card={imageblock} gridLayout={gridLayout} key={index} />;
      })}
    </div>
  );
};

interface CardProps {
  card: ImgCard;
  gridLayout: keyof typeof GridCols;
}

const Card = ({ card, gridLayout }: CardProps) => {
  const { title, subTitle, imageSrc, altText, height, width, link } = card;
  return (
    <div
      className={classNames(
        "relative col-span-12 flex flex-col justify-between rounded border-1 text-center",
        GridCols[gridLayout ?? "triple"]
      )}
    >
      {imageSrc && (
        <div className="flex grow justify-center py-4">
          <Image
            src={imageSrc}
            alt={altText ?? ""}
            height={isEmpty(height) ? 150 : height} // IsEmpty - Tina converts height to empty string after removing the text from the field
            width={isEmpty(width) ? 150 : width} // IsEmpty - Tina converts width to empty string after removing the text from the field
            className="object-contain"
            sizes="75w (max-width: 768px) 25vw"
          />
        </div>
      )}
      <div className="not-prose bottom-0 flex w-full flex-col place-content-center bg-gray-50 p-4 text-center md:h-24">
        <h4 className="font-bold">{title}</h4>
        {link?.url && (
          <CustomLink
            href={link.url}
            className="my-1 font-bold text-sswRed hover:text-sswDarkRed"
          >
            <h4>{link.label}</h4>
          </CustomLink>
        )}
        {subTitle && (
          <span className="flex justify-center text-gray-400">{subTitle}</span>
        )}
      </div>
    </div>
  );
};

export const dynamicCardGridBlockSchema: Template = {
  name: "DynamicCardGridBlock",
  label: "Dynamic Card Grid Block",
  fields: [
    {
      type: "string",
      label: "Grid Columns Layout",
      name: "gridLayout",
      description: "Default 3 columns",
      options: Object.keys(GridCols),
    },
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
