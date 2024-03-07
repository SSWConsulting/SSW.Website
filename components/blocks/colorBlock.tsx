import classNames from "classnames";
import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export type ColorBlockProps = {
  title?: string;
  subTitle?: string;
  colorRow: ColorRow[];
};

export type ColorRow = {
  firstColor: string;
  fText: string;
  secondColor: string;
  sText: string;
  caption?: TinaMarkdownContent;
};

export const ColorBlock = ({ title, subTitle, colorRow }: ColorBlockProps) => {
  console.log("🚀 ~ ColorBlock ~ data:", title, subTitle, colorRow);
  return (
    <>
      <div className="prose max-w-full">
        <div className="container mx-auto py-12">
          <h2>{title}</h2>
          <p>{subTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {colorRow.map((row, index) => (
              <>
                <ColorBlockComponentRenderer key={index} {...row} />
                <p>
                  <TinaMarkdown content={row.caption} />
                </p>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ColorBlockComponentRenderer = ({
  firstColor,
  fText,
  secondColor,
  sText,
}: ColorRow) => {
  return (
    <>
      <div className={classNames("col-span-1 h-10 md:h-80", firstColor)}>
        <div className="flex flex-col justify-center h-full px-8">
          <h3 className="font-bold text-white">{fText}</h3>
        </div>
      </div>
      <div className={classNames("col-span-1 h-10 md:h-80", secondColor)}>
        <div className="flex flex-col justify-center h-full px-8">
          <h3 className="font-bold text-white">{sText}</h3>
        </div>
      </div>
    </>
  );
};

export const colorBlockSchema: Template = {
  name: "ColorBlock",
  label: "Color block",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Sub Title",
      name: "subTitle",
    },
    {
      type: "object",
      label: "Color Row",
      name: "colorRow",
      ui: {
        itemProps(item) {
          return {
            label: `${item?.firstColor} - ${item?.secondColor ?? ""}`,
          };
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "First Color",
          name: "firstColor",
        },
        {
          type: "string",
          label: "First color Text",
          name: "fText",
        },

        {
          type: "string",
          label: "Second Color",
          name: "secondColor",
        },
        {
          type: "string",
          label: "Text",
          name: "sText",
        },
        {
          type: "rich-text",
          label: "Caption",
          name: "caption",
        },
      ],
    },
  ],
};
