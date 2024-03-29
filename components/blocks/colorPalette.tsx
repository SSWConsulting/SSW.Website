import { Template } from "tinacms";
import { productColors } from "../util/constants";
import classNames from "classnames";

export type ColorPaletteProps = {
  colorBlocks: Block[];
};

type Block = {
  color: keyof typeof productColors;
  text: string;
};

export const ColorPalette = (props: ColorPaletteProps) => {
  const { colorBlocks } = props;
  return (
    <div className="flex min-h-24 w-full flex-wrap">
      {colorBlocks?.map((block, i) => (
        <div
          className={classNames(
            block.color,
            "flex flex-grow flex-col items-center justify-center text-white"
          )}
          key={i}
        >
          <div>{block.text}</div>
          <div>{productColors[block.color]}</div>
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
