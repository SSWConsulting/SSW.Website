import classNames from "classnames";
import { useEffect, useState } from "react";
import { Template } from "tinacms";

async function getColors(paletteName: string) {
  try {
    const res = await fetch("/api/get-colors?" + new URLSearchParams({ paletteName }));
    if (!res.ok) {
      return {};
    }
    const json = await res.json();
    return json;
  } catch (e) {
    alert(e);
  }
}

interface Palette {
  colors: {
    name: string
    text: string
    hex: string
  }[] | undefined
}

export const ColorPalette = () => {
  const [palette, setPalette] = useState<Palette>();

  const init = async () => {
    const colors = await getColors("platform");
    setPalette(colors);
  }

  useEffect(() => {
    init();
    return () => { };
  }, [])

  return (
    <div className="flex min-h-24 w-full flex-wrap">
      {palette?.colors && palette.colors.map(({ name, text, hex }) => (
        <div
          key={name}
          className={classNames(
            `bg-platform-${name}`,
            "flex flex-grow flex-col items-center justify-center text-white"
          )}
        >
          <div>{text}</div>
          <div>{hex}</div>
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
