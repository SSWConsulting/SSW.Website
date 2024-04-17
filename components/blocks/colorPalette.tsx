import classNames from "classnames";
import { Template } from "tinacms";
import platformColors from "../util/preval/get-tailwind-platform-colors.preval";

export const ColorPalette = () => {

  return (
    <div className="flex min-h-24 w-full flex-wrap">
      {platformColors?.map((block) => (
        <div
          className={classNames(
            block.className,
            "flex flex-grow flex-col items-center justify-center text-white"
          )}
          key={block.name}
        >
          <div>{block.text}</div>
          <div>{block.color}</div>
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
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};
