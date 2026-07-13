import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";

export const V3VideoHeroSchema: Template = {
  name: "v3VideoHero",
  label: "<V3> Video Hero",
  ui: {
    defaultItem: {
      heading: "AI solutions that deliver, the first time.",
      buttons: [{ buttonText: "Schedule a Free Discovery Call", colour: 0 }],
    },
  },
  fields: [
    {
      type: "image",
      label: "Background Video",
      name: "videoBackground",
      description:
        "An MP4 that autoplays muted on loop behind the text. Users can't pause or unmute it.",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "videos",
    },
    alternatingHeadingSchema,
    {
      type: "object",
      label: "Buttons",
      name: "buttons",
      list: true,
      description: "A row of buttons. Max 2.",
      ui: {
        defaultItem: { buttonText: "Schedule a Free Discovery Call" },
        max: 2,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
  ],
};
