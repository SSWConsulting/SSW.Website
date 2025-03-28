import { backgroundSchema } from "../../../components/layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../tina/collections/shared-fields";
import { mediaTypeField } from "../mediaType.schema";
export const ImageComponentLayoutSchema = [
  backgroundSchema,
  {
    type: "object",
    label: "Media",
    name: "mediaConfiguration",
    description: "Media configuration including layout and image/video upload.",
    ui: {
      defaultItem: {
        placement: "Right",
        mediaType: "image",
      },
    },
    fields: [
      mediaTypeField,
      {
        type: "string",
        label: "Media Placement",
        name: "placement",
        description:
          "Choose the desktop (columned) layout for the media text block.",
        default: "Right",
        ui: {
          component: "select",
          options: ["Left", "Right"],
        },
      },
      {
        type: "string",
        label: "Media placement (vertical)",
        name: "verticalPlacement",
        description: "Where the media sits vertically in desktop view",
        ui: {
          component: "select",
          options: ["Centered", "Top", "Bottom"],
        },
      },
      {
        type: "string",
        label: "Media Placement (mobile)",
        name: "mobilePlacement",
        description:
          "Choose the mobile (stacked) layout for the media text block.",
        default: "Above Text",
        ui: {
          component: "select",
          options: [
            {
              label: "Above Text",
              value: "Above",
            },
            {
              label: "Below Text",
              value: "Below",
            },
          ],
        },
      },
      ...optimizedImageSchema(
        "Upload an image or other media to display in the media text block. 4/3 aspect ratio recommended."
      ),
      {
        type: "string",
        label: "YouTube URL",
        name: "youtubeUrl",
        description:
          "Enter the YouTube video URL (only used if Media Type is set to youtube)",
      },
      {
        type: "string",
        label: "Alt Text",
        name: "altText",
        description: "Add alt text for the image.",
      },
    ],
  },
];
