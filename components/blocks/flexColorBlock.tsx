import { Template } from "tinacms";
import { productColors } from "../util/constants";
import classNames from "classnames";

export type FlexColorBlockProps = {
  colorBlocks: Block[];
};

type Block = {
  color: keyof typeof productColors;
  text: string;
};

export const FlexColorBlock = (props: FlexColorBlockProps) => {
  const { colorBlocks } = props;
  return (
    <div className="flex h-24 w-full">
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

export const flexColorBlockSchema: Template = {
  name: "FlexColorBlock",
  label: "Flex Color Block",
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
