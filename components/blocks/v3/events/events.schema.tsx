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
        spotsText: "10 Spots left!",
        registerText: "Register Now",
        registerLink: "/events",
      },
      eventCards: [
        {
          title: ".NET Developer Workshop",
          description:
            "Join our .NET developer workshop to master the latest open-source, cross-platform framework and elevate your coding skills.",
          duration: "45 minutes",
        },
        {
          title: "Clean Architecture Workshop",
          description:
            "Join our workshop to master clean architecture and elevate your full-stack development and consulting skills.",
          duration: "45 minutes",
        },
        {
          title: "Artificial Intelligence Workshop",
          description:
            "Join us for an exciting AI workshop where you'll explore the latest advancements in artificial intelligence.",
          duration: "45 minutes",
        },
      ],
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
      type: "string",
      label: "Mobile + more Link",
      name: "mobilePlusMore",
      description:
        "Destination for the + more card at the end of the mobile carousel. Leave blank to hide it.",
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
          label: "Spots Text",
          name: "spotsText",
          description: "e.g. '10 Spots left!'. Leave blank to hide.",
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
      description:
        "Up to 3 event/video cards shown beneath the featured event.",
      ui: {
        max: 3,
        itemProps: (item) => ({ label: item?.title ?? "Event" }),
        defaultItem: {
          title: "New Workshop",
          description: "A short blurb about this workshop.",
          duration: "45 minutes",
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
          label: "Duration",
          name: "duration",
          description: "e.g. '45 minutes'.",
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
        imageObject(
          "presenterImage",
          "Presenter Avatar",
          "Optional round presenter avatar shown over the image."
        ),
        {
          type: "string",
          label: "Register Link",
          name: "registerLink",
        },
      ],
    },
  ],
};
