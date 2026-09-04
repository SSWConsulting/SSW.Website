import React from "react";
import type { Template, TinaField } from "tinacms";
import { TinaInfo } from "../../../tina/tina-info";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";

// Dark low-poly artwork used as the default banner backdrop.
const DEFAULT_BACKGROUND_MEDIA = {
  altText: "Polygon background",
  imageSource: "/images/background/polygonBackground.png",
  imageWidth: 1728,
  imageHeight: 724,
};

// Display-only guidance shown above the speaker photo override.
const headshotGuideField: TinaField = {
  type: "string",
  name: "headshotGuide",
  label: "Headshot Guide",
  ui: {
    component: () => (
      <TinaInfo>
        💡 Transparent PNG cut-out, shoulders-up — an opaque photo hides the red
        circle behind it.
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/thumbs/tina/hero-speaker-headshot-example.png"
          alt="Example headshot"
          className="my-3 block size-24 object-contain"
        />
      </TinaInfo>
    ),
  },
};

// Display-only guidance shown above the background image picker.
const backgroundGuideField: TinaField = {
  type: "string",
  name: "backgroundGuide",
  label: "Background Guide",
  ui: {
    component: () => (
      <TinaInfo>
        💡 Wide, dark landscape image — text sits over the left half. Clear it
        to go back to the polygons.
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/background/polygonBackground.png"
          alt="Example background"
          className="my-3 block max-h-40 w-full rounded object-cover"
        />
      </TinaInfo>
    ),
  },
};

// Shared by the primary slide (the block's own fields) and each extra slide.
// Only on event slides: the date and the speakers shown to the right.
const eventFields: TinaField[] = [
  {
    type: "string",
    label: "Event Date",
    name: "eventDate",
    description: "Optional. Shown under the heading, e.g. 31 Aug - 1 Sep 2026.",
  },
  {
    type: "object",
    label: "Speakers",
    name: "speakers",
    list: true,
    description:
      "Optional. Speakers shown on the right of the banner. Max 2. Name and role come from the presenter.",
    ui: {
      max: 2,
      itemProps: (item) => ({
        label:
          item?.presenter
            ?.split("/")
            .pop()
            ?.replace(".mdx", "")
            .replace(/-/g, " ") ?? "Speaker",
      }),
    },
    fields: [
      {
        type: "reference",
        label: "Presenter",
        name: "presenter",
        collections: ["presenter"],
      },
      headshotGuideField,
      {
        type: "string",
        label: "Role Override",
        name: "role",
        description:
          "Optional. Leave blank to use the presenter's position, e.g. SSW Chief Architect.",
      },
      {
        type: "object",
        label: "Image Override",
        name: "image",
        description:
          "Optional. Leave blank to use the presenter's profile photo.",
        fields: [
          { type: "string", label: "Alt Text", name: "altText" },
          // @ts-expect-error – optimizedImageSchema's field types aren't recognised
          ...optimizedImageSchema("Override photo for this speaker."),
        ],
      },
    ],
  },
];

const commonSlideFields: TinaField[] = [
  alternatingHeadingSchema,
  {
    type: "rich-text",
    label: "Description",
    name: "description",
    description: "Supporting text shown beneath the heading.",
    toolbarOverride: ["bold", "italic", "link"],
  },
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
  {
    type: "object",
    label: "Background Image",
    name: "backgroundMedia",
    description:
      "The full-bleed image that fills the rounded hero box. A landscape image works best.",
    fields: [
      backgroundGuideField,
      {
        type: "string",
        label: "Alt Text",
        name: "altText",
        description: "Alt text for the background image.",
      },
      // @ts-expect-error – optimizedImageSchema's field types aren't recognised
      ...optimizedImageSchema("Upload the background image for the hero box."),
    ],
  },
];

// The event fields sit between the description and the buttons.
const slideFields = (event: boolean): TinaField[] => [
  ...commonSlideFields.slice(0, 2),
  ...(event ? eventFields : []),
  ...commonSlideFields.slice(2),
];

export const V3HeroBoxSchema: Template = {
  name: "v3HeroBox",
  label: "<V3> Hero Box",
  ui: {
    defaultItem: {
      background: {
        backgroundColour: 8,
        bleed: false,
      },
      heading: "Three decades of enterprise solutions",
      description:
        "We find the best way to build software and make that knowledge available to everyone.",
      buttons: [{ buttonText: "Schedule a Free Discovery Call", colour: 0 }],
      backgroundMedia: DEFAULT_BACKGROUND_MEDIA,
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    ...slideFields(true),
    {
      type: "object",
      label: "Extra Slides",
      name: "slides",
      list: true,
      description:
        "Optional extra slides for the hero carousel. The fields above form the first slide; navigation arrows appear once a slide is added here. Pick Event Slide for a date and speakers.",
      templates: [
        {
          name: "standardSlide",
          label: "Standard Slide",
          ui: {
            itemProps: (item) => ({ label: item?.heading ?? "Standard Slide" }),
            defaultItem: {
              heading: "New slide",
              backgroundMedia: DEFAULT_BACKGROUND_MEDIA,
            },
          },
          fields: slideFields(false),
        },
        {
          name: "eventSlide",
          label: "Event Slide",
          ui: {
            itemProps: (item) => ({ label: item?.heading ?? "Event Slide" }),
            defaultItem: {
              heading: "Join us at ...",
              backgroundMedia: DEFAULT_BACKGROUND_MEDIA,
            },
          },
          fields: slideFields(true),
        },
      ],
    },
  ],
};
