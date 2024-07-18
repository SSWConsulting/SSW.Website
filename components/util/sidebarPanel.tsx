import { TextInputWithCount } from "../textInputWithCount/textInputWithCount";

export const sidebarPanelSchema = {
  type: "object",
  label: "Sidebar Panel Values",
  name: "sidebarPanel",
  required: false,
  fields: [
    {
      type: "string",
      label: "Title (70 characters)",
      name: "title",
      ui: {
        validate: (value) => {
          if (value && value.length > 70) {
            return "Title should be 70 characters or less";
          }
        },
        component: TextInputWithCount(70),
      },
    },
    {
      type: "string",
      label: "Description (500 characters)",
      name: "description",
      component: "textarea",
      ui: {
        validate: (value) => {
          if (value && value.length > 500) {
            return "Description should be 500 characters or less";
          }
        },
        component: TextInputWithCount(500, true),
      },
    },
    {
      type: "string",
      label: "Action URL",
      name: "actionUrl",
    },
    {
      type: "string",
      label: "Action text",
      name: "actionText",
    },
  ],
};
