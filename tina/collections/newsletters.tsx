import type { Collection } from "tinacms";
import { transformIntToMonth } from "../../services/client/date.service";
import { tipField } from "./shared-fields";

export const newsletterSchema: Collection = {
  label: "Newsletters",
  name: "newsletters",
  path: "content/newsletters",
  format: "json",
  fields: [
    tipField,
    {
      type: "string",
      label: "Year",
      name: "newsletters_year",
    },
    {
      type: "object",
      label: "Newsletters",
      name: "newsletters",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label:
              item?.month && item?.description
                ? `${item?.month} - ${transformIntToMonth(
                    item?.month
                  )} - ${item?.description}`
                : "New newsletter",
          };
        },
      },
      fields: [
        {
          type: "number",
          name: "month",
          label: "Month",
          required: true,
        },
        {
          type: "image",
          name: "file",
          label: "HTML File",
          required: true,
          // @ts-ignore
          uploadDir: (formValues) => {
            return `newsletter-uploads/${formValues.newsletters_year}`;
          },
        },
        {
          type: "image",
          name: "images",
          label: "Images (optional)",
          list: true,
          description:
            "Must be saved in images/Newsletters. Only add images that have not been used before. There is no need to add images to the /images/newsletters directory if they have already been used in a previous newsletter",
          // @ts-ignore
          uploadDir: () => "Newsletters",
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          required: true,
        },
      ],
    },
  ],
};
