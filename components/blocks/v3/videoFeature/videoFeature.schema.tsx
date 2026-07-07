import type { Template, TinaField } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { IconPickerInput } from "../../../blocksSubtemplates/tinaFormElements/iconSelector";
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
    // @ts-expect-error - optimizedImageSchema's field types aren't recognised
    ...optimizedImageSchema(description),
  ],
});

export const V3VideoFeatureSchema: Template = {
  name: "v3VideoFeature",
  label: "<V3> Video Feature",
  ui: {
    defaultItem: {
      heading: "Why choose **SSW**?",
      introText:
        "SSW's consulting services have delivered best-in-class React solutions for thousands of clients in 15 countries over more than 30 years.",
      buttons: [
        {
          buttonText: "Schedule a Free Discovery Call",
          leadCaptureFormOption: "projectFormModal",
          colour: 0,
        },
      ],
      videoCaption:
        "Video: The people behind SSW - Australia's leading software consultancy (3 min)",
      highlights: [
        {
          title: "Deep expertise",
          highlightBody:
            "We go deep on every technology we touch, building with it, codifying best practices, and making that knowledge freely available.",
        },
        {
          title: "Results over rhetoric",
          highlightBody:
            "Mainstream tech, real ROI, and clear action items. Every decision is measured by one question: does it actually work?",
        },
      ],
      recognitionHeading: "Trusted & Recognised",
      recognitionBadges: [
        { label: "We love Microsoft - Cloud Partner", icon: "SiMicrosoft" },
        { label: "MAPA Learning Excellence", icon: "BiAward" },
      ],
    },
  },
  fields: [
    //@ts-expect-error - custom component typing won't be pinned down
    backgroundSchema,
    {
      type: "string",
      label: "Video URL",
      name: "videoUrl",
      description: "YouTube or Vimeo URL shown on the left.",
    },
    {
      type: "image",
      label: "Thumbnail Override",
      name: "thumbnail",
      description:
        "Optional. Overrides the video's poster image; falls back to the video's own thumbnail when empty.",
    },
    {
      type: "boolean",
      label: "Greyscale Thumbnail",
      name: "greyscaleThumbnail",
      description:
        "Show the thumbnail in greyscale. The video plays in full colour.",
    },
    {
      type: "string",
      label: "Video Caption",
      name: "videoCaption",
      description: "Optional caption shown beneath the video.",
    },
    {
      type: "string",
      label: "Brow",
      name: "brow",
      description: "Optional small eyebrow text above the title.",
    },
    alternatingHeadingSchema,
    {
      type: "string",
      label: "Description",
      name: "introText",
      description: "Intro body text shown in the right card.",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      label: "CTA Button",
      name: "buttons",
      list: true,
      description: "Call-to-action shown inside the right card. Max 1.",
      ui: {
        max: 1,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
        defaultItem: { buttonText: "Schedule a Free Discovery Call" },
      },
      //@ts-expect-error - fields are not being recognized
      fields: buttonSchema,
    },
    {
      type: "object",
      label: "Highlights",
      name: "highlights",
      list: true,
      description: "Value points shown beneath the video.",
      ui: {
        itemProps: (item) => ({ label: item?.title ?? "Highlight" }),
        defaultItem: {
          title: "Highlight title",
          description: "Short supporting copy.",
        },
      },
      fields: [
        { type: "string", label: "Title", name: "title" },
        {
          type: "string",
          label: "Description",
          name: "highlightBody",
          ui: { component: "textarea" },
        },
      ],
    },
    {
      type: "string",
      label: "Recognition Heading",
      name: "recognitionHeading",
    },
    {
      type: "object",
      label: "Badges",
      name: "recognitionBadges",
      list: true,
      description: "Small badges shown beneath the right card.",
      ui: {
        itemProps: (item) => ({ label: item?.label ?? "Badge" }),
        defaultItem: { label: "Recognition badge" },
      },
      fields: [
        { type: "string", label: "Label", name: "label" },
        // @ts-expect-error - Tina 3.8.x: custom ui.component type no longer matches Field
        {
          type: "string",
          label: "Icon",
          name: "icon",
          description: "Optional icon name from the shared icon picker.",
          ui: {
            component: IconPickerInput,
          },
        },
        imageObject(
          "customImage",
          "Custom Image",
          "Optional badge image shown instead of an icon."
        ),
      ],
    },
  ],
};
