import classNames from "classnames";
import React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { sswColors } from "../util/constants";
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

export const ColorBlock = (data: ColorBlockProps) => {
  const { title, subTitle, colorRow } = data;
  return (
    <Container padding="md:px-8 px-0">
      <div className="prose max-w-full prose-p:my-0.75">
        <div className="container mx-auto py-4">
          <h2 data-tina-field={tinaField(data, "title")}>{title}</h2>
          <p data-tina-field={tinaField(data, "subTitle")} className="mb-0.5">
            {subTitle}
          </p>
          <div className="block grid-cols-1 md:grid md:grid-cols-2">
            {colorRow?.map((row, index) => (
              <React.Fragment key={index}>
                <ColorRow {...row} />
                <div className="col-span-2">
                  <TinaMarkdown content={row.caption} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

const ColorRow = (props: ColorRow) => {
  const { firstColor, fText, secondColor, sText } = props;
  return (
    <>
      <div
        className={classNames(
          "col-span-1 my-0 flex flex-col items-center justify-center px-4",
          sswColors[`${firstColor}`]
        )}
      >
        <p className="text-white" data-tina-field={tinaField(props, "fText")}>
          {fText}
        </p>
      </div>
      <div
        className={classNames(
          "col-span-1 my-0 flex flex-col items-center justify-center px-4",
          sswColors[`${secondColor}`]
        )}
      >
        <p className="text-white" data-tina-field={tinaField(props, "sText")}>
          {sText}
        </p>{" "}
      </div>
    </>
  );
};

export const colorBlockSchema: Template = {
  name: "ColorBlock",
  label: "Color block",
  ui: {
    previewSrc: "/images/thumbs/tina/color-block.jpg",
  },
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
