export const mediaTypeField = {
  type: "string",
  label: "Media Type",
  name: "mediaType",
  description: "Choose between image or YouTube video",
  default: "image",
  optional: true,
  ui: {
    component: "select",
    options: ["image", "youtube"],
  },
};
