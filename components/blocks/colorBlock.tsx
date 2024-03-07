import classNames from "classnames";
import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Container } from "../util/container";

export type ColorBlockProps = {
  title?: string;
  subTitle?: string;
  colorRow: ColorRow[];
};

export type ColorRow = {
  firstColor: keyof typeof sswColors;
  fText: string;
  secondColor: keyof typeof sswColors;
  sText: string;
  caption?: TinaMarkdownContent;
};

const sswColors = {
  "#CC4141": "bg-sswRed",
  "#333333": "bg-sswBlack",
  "#AAAAAA": "bg-ssw-gray-light",
  "#797979": "bg-ssw-gray",
};

export const ColorBlock = ({ title, subTitle, colorRow }: ColorBlockProps) => {
  return (
    <Container className="">
      <div className="prose max-w-full prose-p:my-0.75">
        <div className="container mx-auto py-12">
          <h2>{title}</h2>
          <p className="mb-0.5">{subTitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {colorRow.map((row, index) => (
              <>
                <ColorRow key={index} {...row} />
                <div className="col-span-2">
                  <TinaMarkdown content={row.caption} />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

const ColorRow = ({ firstColor, fText, secondColor, sText }: ColorRow) => {
  return (
    <>
      <ColorColumn bg={sswColors[`${firstColor}`]} text={fText} />
      <ColorColumn bg={sswColors[`${secondColor}`]} text={sText} />
    </>
  );
};

const ColorColumn = ({ bg, text }) => {
  return (
    <div
      className={classNames(
        "col-span-1 flex flex-col justify-center h-10 items-center my-0",
        bg
      )}
    >
      <p className="text-white">{text}</p>
    </div>
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
          options: Object.keys(sswColors),
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
          options: Object.keys(sswColors),
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
