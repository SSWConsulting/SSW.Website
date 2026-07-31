import classNames from "classnames";
import type { Template } from "tinacms";
import { platform } from "../../lib/platform";

export const ColorPalette = () => {
  return (
    <div className="flex min-h-24 w-full flex-wrap">
      {platform.map((block) => (
        <div
          className={classNames(
            `bg-platform-${block.name}`,
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
  ui: {
    previewSrc: "/images/thumbs/tina/color-palette.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};
