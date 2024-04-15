import classNames from "classnames";
import { Template } from "tinacms";

const colors = require("plugins/platform-color-palette/colors")

export const ColorPalette = () => {
  return (
    <div className="flex min-h-24 w-full flex-wrap">
      {Object.entries<{ text: string, color: string }>(colors ?? {}).map(([platformName, { text, color }], i) => (
        <div
          className={classNames(
            `bg-platform-${platformName}`,
            "flex flex-grow flex-col items-center justify-center text-white"
          )}
          key={i}
        >
          <div>{text}</div>
          <div>{color}</div>
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
      name: "dummy",
      label: "Dummy",
      required: false
    }
  ],
};
