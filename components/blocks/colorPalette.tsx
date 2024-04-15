import classNames from "classnames";
import { Template } from "tinacms";
import { productColors } from "../util/constants";

const colors = require("plugins/platform-color-palette/colors")

export type ColorPaletteProps = {
  colorBlocks: Block[];
};

type Block = {
  color: keyof typeof productColors;
  text: string;
};

export const ColorPalette = (props: ColorPaletteProps) => {
  return (
    <div className="flex min-h-24 w-full flex-wrap">
      {Object.entries<{ text: string, color: string }>(colors ?? {}).map(([k, v], i) => (
        <div
          className={classNames(
            `bg-platform-${k}`,
            "flex flex-grow flex-col items-center justify-center text-white"
          )}
          key={i}
        >
          <div>{v.text}</div>
          <div>{v.color}</div>
        </div>
      ))}
    </div>
  );
};

export const colorPaletteSchema: Template = {
  name: "ColorPalette",
  label: "Color Palette",
  fields: [
    {
      type: "object",
      label: "Color Blocks",
      name: "colorBlocks",
      list: true,
      ui: {
        itemProps: (props) => ({ label: props?.text }),
      },
      fields: [
        {
          type: "string",
          label: "Color",
          name: "color",
          options: Object.keys(productColors).map((color) => color),
          // options: productColors.map((color) => color),
        },
        {
          type: "string",
          label: "Text",
          name: "text",
        },
      ],
    },
  ],
};
