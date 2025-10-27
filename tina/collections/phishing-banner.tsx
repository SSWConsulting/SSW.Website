import type { Collection } from "tinacms";

export const phishingBannerSchema: Collection = {
  label: "Global - Phishing Warning Banner",
  name: "phishingBanner",
  path: "content/phishing-banner",
  format: "json",
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  match: {
    include: "banner",
  },
  fields: [
    {
      type: "boolean",
      name: "enabled",
      label: "Enable Banner",
      description: "Toggle to show or hide the banner on the employment page",
      required: true,
    },
    {
      type: "string",
      name: "message",
      label: "Banner Message",
      description: "The text to display in the banner",
      required: true,
      ui: {
        component: "textarea",
      },
    },
  ],
};
