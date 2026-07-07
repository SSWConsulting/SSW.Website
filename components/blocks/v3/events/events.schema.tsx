import type { Template, TinaField } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";

const imageObject = (
  name: string,
  label: string,
  description: string
): TinaField => ({
  type: "object",
  label,
  name,
  fields: [
    { type: "string", label: "Alt Text", name: "altText" },
    // @ts-expect-error – optimizedImageSchema's field types aren't recognised
    ...optimizedImageSchema(description),
  ],
});

export const V3EventsSchema: Template = {
  name: "v3Events",
  label: "<V3> Events",
  ui: {
    defaultItem: {
      heading: "Upcoming Events",
      subtitle: "We run webinars, live events, in-house and online courses.",
      buttons: [{ buttonText: "Explore Events & Training", colour: 0 }],
      featuredEvent: {
        title: "Angular Workshop",
        description:
          "In this 2-day Angular Workshop, you will get hands on experience building applications from scratch with guidance from Angular experts.",
        registerText: "Register Now",
        registerLink: "/events",
      },
      eventCards: [
        {
          title: ".NET Developer Workshop",
          description:
            "Join our .NET developer workshop to master the latest open-source, cross-platform framework and elevate your coding skills.",
          time: "6:00pm AEST",
        },
        {
          title: "Clean Architecture Workshop",
          description:
            "Join our workshop to master clean architecture and elevate your full-stack development and consulting skills.",
          time: "6:00pm AEST",
        },
        {
          title: "Artificial Intelligence Workshop",
          description:
            "Join us for an exciting AI workshop where you'll explore the latest advancements in artificial intelligence.",
          time: "6:00pm AEST",
        },
      ],
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
      type: "object",
      label: "Featured Event",
      name: "featuredEvent",
      description: "The large highlighted event with a countdown and sign-up.",
      fields: [
        { type: "string", label: "Title", name: "title" },
        {
          type: "string",
          label: "Location",
          name: "location",
          description: "Optional event location shown under the title.",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: { component: "textarea" },
        },
        imageObject(
          "image",
          "Background Image",
          "Background image for the featured event card."
        ),
        {
          type: "datetime",
          label: "Event Date",
          name: "eventDate",
          description: "Drives the countdown and the displayed date.",
        },
        {
          type: "string",
          label: "Time",
          name: "time",
          description: "Start time of the event. e.g. '6:00pm AEST'.",
        },
        {
          type: "object",
          label: "Presenters",
          name: "presenters",
          list: true,
          description: "Presenter links shown under the event time.",
          ui: {
            itemProps: (item) => ({ label: item?.name ?? "Presenter" }),
            defaultItem: { name: "Presenter name" },
          },
          fields: [
            { type: "string", label: "Name", name: "name" },
            {
              type: "string",
              label: "Link",
              name: "link",
              description: "Presenter profile URL.",
            },
          ],
        },
        {
          type: "string",
          label: "Register Button Text",
          name: "registerText",
          description: "Label for the register button. e.g. 'Register Now'.",
        },
        {
          type: "string",
          label: "Register Button Link",
          name: "registerLink",
          description:
            "Destination for the register button. Leave blank to hide it.",
        },
      ],
    },
    {
      type: "object",
      label: "Event Cards",
      name: "eventCards",
      list: true,
      description: "Event list shown beneath the featured event.",
      ui: {
        itemProps: (item) => ({ label: item?.title ?? "Event" }),
        defaultItem: {
          title: "New Workshop",
          description: "A short blurb about this workshop.",
          time: "6:00pm AEST",
        },
      },
      fields: [
        { type: "string", label: "Title", name: "title" },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Time",
          name: "time",
          description: "Start time of the event. e.g. '6:00pm AEST'.",
        },
        {
          type: "datetime",
          label: "Date",
          name: "date",
          description: "Optional event date shown on the card.",
        },
        {
          type: "string",
          label: "Location",
          name: "location",
          description: "Optional event location shown on the card.",
        },
        imageObject("image", "Thumbnail", "Thumbnail / video poster image."),
        {
          type: "string",
          label: "Video URL",
          name: "videoUrl",
          description:
            "YouTube or Vimeo URL. Adds a play button over the image.",
        },
        {
          type: "object",
          label: "Presenters",
          name: "presenters",
          list: true,
          description: "Presenter links shown under the event time.",
          ui: {
            itemProps: (item) => ({ label: item?.name ?? "Presenter" }),
            defaultItem: { name: "Presenter name" },
          },
          fields: [
            { type: "string", label: "Name", name: "name" },
            {
              type: "string",
              label: "Link",
              name: "link",
              description: "Presenter profile URL.",
            },
          ],
        },
        {
          type: "string",
          label: "Register Link",
          name: "registerLink",
        },
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
