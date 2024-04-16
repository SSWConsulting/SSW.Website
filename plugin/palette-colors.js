const plugin = require("tailwindcss/plugin");

const { globSync } = require("glob");
const fs = require("fs");
const path = require("path");

function getPaletteColors() {
  const palettes = globSync('content/palette/*.json');

  const tailwindConfig = {
    safelist: [],
    theme: {
      extend: {
        colors: {
        }
      }
    }
  };

  for (p of palettes) {
    const filename = path.parse(p).name;
    const content = fs.readFileSync(path.join(process.cwd(), p));
    const paletteJson = JSON.parse(content.toString());

    const colors = paletteJson?.colors;

    if (colors && colors.length) {
      const colorConfig = {};
      for (c of paletteJson.colors) {
        colorConfig[c.name] = c.hex;
        tailwindConfig.safelist.push(`bg-${filename}-${c.name}`);
      }
      tailwindConfig.theme.extend.colors[filename] = colorConfig;
    } else {
      continue;
    }
  }

  return tailwindConfig;
}

module.exports = plugin(() => { }, getPaletteColors());