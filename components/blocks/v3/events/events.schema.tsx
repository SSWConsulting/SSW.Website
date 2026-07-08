import type { Template, TinaField } from "tinacms";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

const hiddenFieldUi = { component: () => null };

const hiddenStringField = (label: string, name: string): TinaField => ({
  type: "string",
  label,
  name,
  ui: hiddenFieldUi,
});

const hiddenImageObject = (
  name: string,
  label: string,
  description: string
): TinaField => ({
  type: "object",
  label,
  name,
  ui: hiddenFieldUi,
  fields: [
    { type: "string", label: "Alt Text", name: "altText" },
    // @ts-expect-error – optimizedImageSchema's field types aren't recognised
    ...optimizedImageSchema(description),
  ],
});

const hiddenPresentersField: TinaField = {
  type: "object",
  label: "Presenters",
  name: "presenters",
  list: true,
  ui: hiddenFieldUi,
  fields: [
    { type: "string", label: "Name", name: "name" },
    { type: "string", label: "Link", name: "link" },
  ],
};

export const V3EventsSchema: Template = {
  name: "v3Events",
  label: "<V3> Events",
  ui: {
    defaultItem: {
      heading: "Upcoming Events",
      subtitle: "We run webinars, live events, in-house and online courses.",
      buttons: [{ buttonText: "Explore Events & Training", colour: 0 }],
      numberOfEvents: 3,
      featuredEvent: {
        registerText: "Register Now",
        buttons: [{ buttonText: "Register Now", colour: 0 }],
      },
      seeMoreButton: [{ buttonText: "See More Events", buttonLink: "/events" }],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    {
      type: "string",
      label: "Subtitle",
      name: "subtitle",
      description: "Paragraph shown on the right of the header.",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      label: "Header Button",
      name: "buttons",
      list: true,
      description: "Header call-to-action. Max 1.",
      ui: {
        max: 1,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
        defaultItem: { buttonText: "Explore Events & Training" },
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
    {
      type: "number",
      label: "Number of Events",
      name: "numberOfEvents",
      description:
        "Number of upcoming events to pull from the Events Calendar collection. The first event is featured.",
    },
    {
      type: "object",
      label: "Featured Event Display",
      name: "featuredEvent",
      description:
        "Event details are pulled from the Events Calendar collection. These fields only control display labels.",
      fields: [
        hiddenStringField("Title", "title"),
        hiddenStringField("Location", "location"),
        hiddenStringField("Description", "description"),
        {
          type: "object",
          label: "Background Image Override",
          name: "image",
          description:
            "Optional. Leave blank to use the image from the Events Calendar collection.",
          fields: [
            { type: "string", label: "Alt Text", name: "altText" },
            // @ts-expect-error – optimizedImageSchema's field types aren't recognised
            ...optimizedImageSchema(
              "Override image for the featured event card."
            ),
          ],
        },
        {
          type: "datetime",
          label: "Event Date",
          name: "eventDate",
          ui: hiddenFieldUi,
        },
        hiddenStringField("Time", "time"),
        hiddenPresentersField,
        {
          type: "string",
          label: "Register Button Text",
          name: "registerText",
          description:
            "Legacy fallback. Prefer the Featured Button field below.",
          ui: hiddenFieldUi,
        },
        {
          type: "object",
          label: "Featured Button",
          name: "buttons",
          list: true,
          description:
            "Optional. Leave Button Link blank to use the featured event page URL.",
          ui: {
            max: 1,
            itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
            defaultItem: { buttonText: "Register Now", colour: 0 },
          },
          //@ts-expect-error – fields are not being recognized
          fields: buttonSchema,
        },
        hiddenStringField("Register Button Link", "registerLink"),
      ],
    },
    {
      type: "object",
      label: "Event Cards",
      name: "eventCards",
      list: true,
      ui: hiddenFieldUi,
      fields: [
        hiddenStringField("Title", "title"),
        hiddenStringField("Description", "description"),
        hiddenStringField("Time", "time"),
        {
          type: "datetime",
          label: "Date",
          name: "date",
          ui: hiddenFieldUi,
        },
        hiddenStringField("Location", "location"),
        hiddenImageObject(
          "image",
          "Thumbnail",
          "Thumbnail / video poster image."
        ),
        hiddenStringField("Video URL", "videoUrl"),
        hiddenPresentersField,
        hiddenStringField("Register Link", "registerLink"),
      ],
    },
    {
      type: "object",
      label: "See More Button",
      name: "seeMoreButton",
      list: true,
      description: "Call-to-action shown under the event cards. Max 1.",
      ui: {
        max: 1,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
        defaultItem: { buttonText: "See More Events", buttonLink: "/events" },
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
  ],
};
