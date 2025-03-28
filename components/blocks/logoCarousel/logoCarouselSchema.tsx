import React from "react";
import { Button, Template, TinaField, wrapFieldsWithMeta } from "tinacms";
import alternatingHeadingSchema from "../../../components/blocksSubtemplates/alternatingHeading.schema";
import tabletTextAlignmentField from "../../../components/blocksSubtemplates/tabletTextAlignment.schema";
import { backgroundSchema } from "../../../components/layout/v2ComponentWrapper.schema";
const RangeInput = wrapFieldsWithMeta((props) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex">
        <input
          step={5}
          onChange={(value) => {
            props.input.onChange(parseInt(value.target.value));
          }}
          value={props.input.value || 100}
          min={0}
          className="w-full"
          max={200}
          type="range"
        />
        <label className="whitespace-normal font-sans text-xs font-semibold text-gray-700">
          {props.input.value || 100}%
        </label>
      </div>
      <Button
        className="w-fit"
        onClick={() => props.input.onChange(100)}
        variant="secondary"
      >
        Reset
      </Button>
    </div>
  );
});

export const LogoCarouselSchema: Template = {
  name: "logoCarousel",
  label: "<V2> Logo Carousel",
  ui: {
    previewSrc: "/images/thumbs/tina/logo-carousel.png",
    defaultItem: {
      heading: "Lorem Ipsum",
      logos: [
        {
          logo: "",
          altText: "Logo",
        },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    tabletTextAlignmentField as TinaField,
    {
      type: "boolean",
      name: "paused",
      label: "Paused",
      description: "Remember to enable this before deploying to production",
    },
    {
      type: "boolean",
      label: "Mask Images and Whiten",
      name: "isWhiteImages",
      description: "Completely saturates images so they appear white.",
      //TODO – account for dark mode.
    },
    {
      type: "object",
      label: "Logos",
      name: "logos",
      description: "Individual logos in the carousel.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.altText ?? "Logo" };
        },
      },
      fields: [
        {
          type: "image",
          label: "Logo Source",
          name: "logo",
          description: "The image to display in the carousel.",
        },
        {
          type: "number",
          label: "Scale",
          name: "scale",
          ui: {
            component: (props) => RangeInput(props),
          },
        },

        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description:
            "Alt text for the logo image. Deafults to 'Logo' under the hood.",
        },
      ],
    },
  ],
};
